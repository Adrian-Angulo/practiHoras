import { getSupabaseAdmin } from '../../../config/supabase.config.js';
import { BadRequestError, NotFoundError } from '../../../core/errors/app-error.js';
import {
  ActualizarRegistroDTO,
  CrearRegistroDTO,
  FiltrosRegistrosDTO,
  RegistroHora,
} from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';

interface RegistroRow {
  id: string;
  user_id: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  descuento_almuerzo_min: number;
  horas_computables: number | string;
  modalidad: 'Presencial' | 'Remoto' | 'Híbrido';
  actividades: string;
  supervisor_nombre: string | null;
  estado: 'Borrador' | 'Pendiente' | 'Aprobado' | 'Observado';
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export class SupabaseRegistrosRepository implements IRegistrosRepository {
  private get client() {
    return getSupabaseAdmin();
  }

  private mapRowToEntity(row: RegistroRow): RegistroHora {
    return {
      id: row.id,
      userId: row.user_id,
      fecha: row.fecha,
      horaInicio: row.hora_inicio.slice(0, 5),
      horaFin: row.hora_fin.slice(0, 5),
      descuentoAlmuerzoMinutos: row.descuento_almuerzo_min,
      horasComputables: typeof row.horas_computables === 'string' ? parseFloat(row.horas_computables) : row.horas_computables,
      modalidad: row.modalidad,
      actividades: row.actividades,
      supervisorNombre: row.supervisor_nombre || undefined,
      estado: row.estado,
      deletedAt: row.deleted_at || undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async crear(userId: string, data: CrearRegistroDTO): Promise<RegistroHora> {
    const payload: Record<string, any> = {
      user_id: userId,
      fecha: data.fecha,
      hora_inicio: data.horaInicio,
      hora_fin: data.horaFin,
      descuento_almuerzo_min: data.descuentoAlmuerzoMinutos ?? data.refrigerioMinutos ?? 0,
      horas_computables: data.horasComputables ?? 0,
      modalidad: data.modalidad || 'Presencial',
      actividades: data.actividades,
      supervisor_nombre: data.supervisorNombre || null,
      estado: data.estado || 'Aprobado',
    };

    // Si el cliente móvil envió su propio UUID v4 (generado offline), respetarlo
    if (data.id) {
      payload.id = data.id;
    }

    const { data: row, error } = await this.client
      .from('registros_horas')
      .insert(payload)
      .select('*')
      .single();

    if (error || !row) {
      throw new BadRequestError(`Error al registrar jornada en base de datos: ${error?.message}`);
    }

    return this.mapRowToEntity(row as RegistroRow);
  }

  async listar(userId: string, filtros?: FiltrosRegistrosDTO): Promise<RegistroHora[]> {
    let query = this.client
      .from('registros_horas')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('fecha', { ascending: false })
      .order('created_at', { ascending: false });

    if (filtros) {
      if (filtros.modalidad) {
        query = query.eq('modalidad', filtros.modalidad);
      }
      if (filtros.desde) {
        query = query.gte('fecha', filtros.desde);
      }
      if (filtros.hasta) {
        query = query.lte('fecha', filtros.hasta);
      }
      if (filtros.mes && filtros.anio) {
        const mesStr = filtros.mes.toString().padStart(2, '0');
        const start = `${filtros.anio}-${mesStr}-01`;
        // Último día del mes
        const lastDay = new Date(filtros.anio, filtros.mes, 0).getDate();
        const end = `${filtros.anio}-${mesStr}-${lastDay.toString().padStart(2, '0')}`;
        query = query.gte('fecha', start).lte('fecha', end);
      } else if (filtros.mes) {
        const currentYear = new Date().getFullYear();
        const mesStr = filtros.mes.toString().padStart(2, '0');
        const start = `${currentYear}-${mesStr}-01`;
        const lastDay = new Date(currentYear, filtros.mes, 0).getDate();
        const end = `${currentYear}-${mesStr}-${lastDay.toString().padStart(2, '0')}`;
        query = query.gte('fecha', start).lte('fecha', end);
      } else if (filtros.anio) {
        const start = `${filtros.anio}-01-01`;
        const end = `${filtros.anio}-12-31`;
        query = query.gte('fecha', start).lte('fecha', end);
      }

      if (filtros.limite && filtros.limite > 0) {
        query = query.limit(filtros.limite);
      }
    }

    const { data, error } = await query;

    if (error) {
      throw new BadRequestError(`Error al consultar historial de jornadas: ${error.message}`);
    }

    return (data as RegistroRow[] || []).map((r) => this.mapRowToEntity(r));
  }

  async obtenerPorId(userId: string, id: string): Promise<RegistroHora | null> {
    const { data, error } = await this.client
      .from('registros_horas')
      .select('*')
      .eq('user_id', userId)
      .eq('id', id)
      .is('deleted_at', null)
      .maybeSingle();

    if (error) {
      throw new BadRequestError(`Error al buscar jornada: ${error.message}`);
    }

    return data ? this.mapRowToEntity(data as RegistroRow) : null;
  }

  async actualizar(userId: string, id: string, data: ActualizarRegistroDTO): Promise<RegistroHora> {
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (data.fecha) updatePayload.fecha = data.fecha;
    if (data.horaInicio) updatePayload.hora_inicio = data.horaInicio;
    if (data.horaFin) updatePayload.hora_fin = data.horaFin;
    if (data.descuentoAlmuerzoMinutos !== undefined || data.refrigerioMinutos !== undefined) {
      updatePayload.descuento_almuerzo_min = data.descuentoAlmuerzoMinutos ?? data.refrigerioMinutos;
    }
    if (data.horasComputables !== undefined) {
      updatePayload.horas_computables = data.horasComputables;
    }
    if (data.modalidad) updatePayload.modalidad = data.modalidad;
    if (data.actividades) updatePayload.actividades = data.actividades;
    if (data.supervisorNombre !== undefined) updatePayload.supervisor_nombre = data.supervisorNombre;
    if (data.estado) updatePayload.estado = data.estado;

    const { data: row, error } = await this.client
      .from('registros_horas')
      .update(updatePayload)
      .eq('user_id', userId)
      .eq('id', id)
      .select('*')
      .single();

    if (error || !row) {
      throw new BadRequestError(`Error al actualizar jornada: ${error?.message}`);
    }

    return this.mapRowToEntity(row as RegistroRow);
  }

  async eliminar(userId: string, id: string): Promise<boolean> {
    const { error } = await this.client
      .from('registros_horas')
      .delete()
      .eq('user_id', userId)
      .eq('id', id);

    if (error) {
      throw new BadRequestError(`Error al eliminar jornada: ${error.message}`);
    }

    return true;
  }
}
