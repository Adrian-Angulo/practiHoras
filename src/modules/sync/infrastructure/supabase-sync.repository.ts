import { getSupabaseAdmin } from '../../../config/supabase.config.js';
import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';
import { IRegistrosRepository } from '../../registros/domain/repositories/registros.repository.js';
import { RegistroCalculoService } from '../../registros/domain/services/registro-calculo.service.js';
import { BatchSyncPayload, BatchSyncResult } from '../domain/entities/sync.entity.js';
import { ISyncRepository } from '../domain/repositories/sync.repository.js';

export class SupabaseSyncRepository implements ISyncRepository {
  constructor(
    private readonly profileRepo: IProfileRepository,
    private readonly registrosRepo: IRegistrosRepository
  ) {}

  private get client() {
    return getSupabaseAdmin();
  }

  async syncBatch(userId: string, payload: BatchSyncPayload): Promise<BatchSyncResult> {
    let perfilActualizado = false;

    // 1. Sincronizar Perfil si viene en el payload
    if (payload.perfil && Object.keys(payload.perfil).length > 0) {
      await this.profileRepo.updateProfile(userId, payload.perfil);
      perfilActualizado = true;
    }

    let insertados = 0;
    let actualizados = 0;
    let eliminados = 0;

    const regOps = payload.registros;

    if (regOps) {
      // 2. Procesar inserciones
      if (regOps.creados && regOps.creados.length > 0) {
        for (const reg of regOps.creados) {
          const desc = reg.descuentoAlmuerzoMinutos ?? reg.refrigerioMinutos ?? 0;
          const horas =
            reg.horasComputables ??
            RegistroCalculoService.calcularHorasComputables(reg.horaInicio, reg.horaFin, desc);

          await this.registrosRepo.crear(userId, {
            ...reg,
            descuentoAlmuerzoMinutos: desc,
            horasComputables: horas,
          });
          insertados++;
        }
      }

      // 3. Procesar actualizaciones (LWW)
      if (regOps.actualizados && regOps.actualizados.length > 0) {
        for (const reg of regOps.actualizados) {
          const existing = await this.registrosRepo.obtenerPorId(userId, reg.id);
          if (existing) {
            const hIni = reg.horaInicio || existing.horaInicio;
            const hFin = reg.horaFin || existing.horaFin;
            const desc =
              reg.descuentoAlmuerzoMinutos ??
              reg.refrigerioMinutos ??
              existing.descuentoAlmuerzoMinutos ??
              0;
            const horas = RegistroCalculoService.calcularHorasComputables(hIni, hFin, desc);

            await this.registrosRepo.actualizar(userId, reg.id, {
              ...reg,
              descuentoAlmuerzoMinutos: desc,
              horasComputables: horas,
            });
            actualizados++;
          }
        }
      }

      // 4. Procesar eliminaciones
      if (regOps.eliminadosIds && regOps.eliminadosIds.length > 0) {
        for (const id of regOps.eliminadosIds) {
          try {
            await this.registrosRepo.eliminar(userId, id);
            eliminados++;
          } catch {
            // Continuar con los demás si ya no existía
          }
        }
      }
    }

    // 5. Obtener estado final consolidado
    const [perfilFinal, registrosFinales] = await Promise.all([
      this.profileRepo.getProfile(userId),
      this.registrosRepo.listar(userId),
    ]);

    return {
      exito: true,
      registrosInsertados: insertados,
      registrosActualizados: actualizados,
      registrosEliminados: eliminados,
      perfilActualizado,
      perfil: perfilFinal!,
      registros: registrosFinales,
    };
  }
}
