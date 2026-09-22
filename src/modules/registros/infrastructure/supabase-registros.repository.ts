import { getSupabaseAdmin } from '../../../config/supabase.config.js';
import { BadRequestError, NotFoundError } from '../../../core/errors/app-error.js';
import {
  ActualizarRegistroDTO,
  CrearRegistroDTO,
  DiaRendimiento,
  RegistroHora,
  RendimientoSemanal,
  ResumenKpis,
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
  created_at: string;
  updated_at: string;
}

export class SupabaseRegistrosRepository implements IRegistrosRepository {
  private get client() {
    return getSupabaseAdmin();
  }

  private calcularHorasComputables(horaInicio: string, horaFin: string, descuentoMinutos: number): number {
    const [hIni, mIni] = horaInicio.split(':').map(Number);
    const [hFin, mFin] = horaFin.split(':').map(Number);
    const minutosTotales = hFin * 60 + mFin - (hIni * 60 + mIni) - (descuentoMinutos || 0);
    return Math.max(0, Math.round((minutosTotales / 60) * 100) / 100);
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
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async crear(userId: string, data: CrearRegistroDTO): Promise<RegistroHora> {
    const horasComputables = this.calcularHorasComputables(
      data.horaInicio,
      data.horaFin,
      data.descuentoAlmuerzoMinutos
    );

    const { data: row, error } = await this.client
      .from('registros_horas')
      .insert({
        user_id: userId,
        fecha: data.fecha,
        hora_inicio: data.horaInicio,
        hora_fin: data.horaFin,
        descuento_almuerzo_min: data.descuentoAlmuerzoMinutos,
        horas_computables: horasComputables,
        modalidad: data.modalidad,
        actividades: data.actividades,
        supervisor_nombre: data.supervisorNombre || null,
        estado: 'Aprobado',
      })
      .select('*')
      .single();

    if (error || !row) {
      throw new BadRequestError(`Error al registrar jornada en base de datos: ${error?.message}`);
    }

    return this.mapRowToEntity(row as RegistroRow);
  }

  async listar(userId: string, limite?: number): Promise<RegistroHora[]> {
    let query = this.client
      .from('registros_horas')
      .select('*')
      .eq('user_id', userId)
      .order('fecha', { ascending: false })
      .order('created_at', { ascending: false });

    if (limite && limite > 0) {
      query = query.limit(limite);
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
      .maybeSingle();

    if (error) {
      throw new BadRequestError(`Error al buscar jornada: ${error.message}`);
    }

    return data ? this.mapRowToEntity(data as RegistroRow) : null;
  }

  async actualizar(userId: string, id: string, data: ActualizarRegistroDTO): Promise<RegistroHora> {
    const actual = await this.obtenerPorId(userId, id);
    if (!actual) {
      throw new NotFoundError('El registro de jornada no existe');
    }

    const horaInicio = data.horaInicio || actual.horaInicio;
    const horaFin = data.horaFin || actual.horaFin;
    const descuentoAlmuerzo = data.descuentoAlmuerzoMinutos !== undefined ? data.descuentoAlmuerzoMinutos : actual.descuentoAlmuerzoMinutos;

    const horasComputables = this.calcularHorasComputables(horaInicio, horaFin, descuentoAlmuerzo);

    const updatePayload: Record<string, unknown> = {
      ...(data.fecha && { fecha: data.fecha }),
      ...(data.horaInicio && { hora_inicio: data.horaInicio }),
      ...(data.horaFin && { hora_fin: data.horaFin }),
      ...(data.descuentoAlmuerzoMinutos !== undefined && { descuento_almuerzo_min: data.descuentoAlmuerzoMinutos }),
      horas_computables: horasComputables,
      ...(data.modalidad && { modalidad: data.modalidad }),
      ...(data.actividades && { actividades: data.actividades }),
      ...(data.supervisorNombre !== undefined && { supervisor_nombre: data.supervisorNombre }),
      updated_at: new Date().toISOString(),
    };

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

  async obtenerKpis(userId: string): Promise<ResumenKpis> {
    // 1. Obtener meta de horas del perfil
    const { data: perfil } = await this.client
      .from('perfiles')
      .select('meta_horas')
      .eq('id', userId)
      .single();

    const horasObjetivo = perfil?.meta_horas || 360;

    // 2. Obtener todas las jornadas del usuario
    const { data: registros, error } = await this.client
      .from('registros_horas')
      .select('horas_computables')
      .eq('user_id', userId);

    if (error) {
      throw new BadRequestError(`Error al calcular KPIs: ${error.message}`);
    }

    const rows = (registros || []) as Array<{ horas_computables: number | string }>;
    const jornadasCompletadas = rows.length;

    let horasAcumuladas = 0;
    for (const r of rows) {
      const val = typeof r.horas_computables === 'string' ? parseFloat(r.horas_computables) : r.horas_computables;
      horasAcumuladas += val || 0;
    }

    horasAcumuladas = Math.round(horasAcumuladas * 100) / 100;
    const porcentajeAvance = horasObjetivo > 0
      ? Math.min(100, Math.round((horasAcumuladas / horasObjetivo) * 1000) / 10)
      : 0;

    const promedioHorasDiarias = jornadasCompletadas > 0
      ? Math.round((horasAcumuladas / jornadasCompletadas) * 10) / 10
      : 0;

    const horasFaltantes = Math.max(0, horasObjetivo - horasAcumuladas);
    const diasRestantesEstimados = promedioHorasDiarias > 0
      ? Math.ceil(horasFaltantes / promedioHorasDiarias)
      : (horasObjetivo > 0 ? Math.ceil(horasObjetivo / 6) : 0);

    return {
      horasAcumuladas,
      horasObjetivo,
      porcentajeAvance,
      jornadasCompletadas,
      promedioHorasDiarias,
      diasRestantesEstimados,
    };
  }

  async obtenerRendimientoSemanal(userId: string): Promise<RendimientoSemanal> {
    // Obtener los últimos 7 días con fecha
    const hoy = new Date();
    const lunes = new Date(hoy);
    const day = hoy.getDay();
    const diff = (day === 0 ? -6 : 1) - day; // Lunes como inicio
    lunes.setDate(hoy.getDate() + diff);

    const diasSemana: DiaRendimiento[] = [];
    const nombresDias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const inicioIso = lunes.toISOString().split('T')[0];
    const finSemana = new Date(lunes);
    finSemana.setDate(lunes.getDate() + 6);
    const finIso = finSemana.toISOString().split('T')[0];

    const { data: registros } = await this.client
      .from('registros_horas')
      .select('fecha, horas_computables, modalidad')
      .eq('user_id', userId)
      .gte('fecha', inicioIso)
      .lte('fecha', finIso);

    const rows = (registros || []) as Array<{
      fecha: string;
      horas_computables: number | string;
      modalidad: 'Presencial' | 'Remoto' | 'Híbrido';
    }>;

    let totalHorasSemana = 0;

    for (let i = 0; i < 7; i++) {
      const d = new Date(lunes);
      d.setDate(lunes.getDate() + i);
      const fechaStr = d.toISOString().split('T')[0];
      const match = rows.find((r) => r.fecha === fechaStr);

      const horas = match
        ? (typeof match.horas_computables === 'string' ? parseFloat(match.horas_computables) : match.horas_computables)
        : 0;

      totalHorasSemana += horas;

      diasSemana.push({
        fecha: fechaStr,
        diaNombre: nombresDias[i],
        horasRegistradas: Math.round(horas * 10) / 10,
        modalidad: match?.modalidad || 'Presencial',
        horasMetaDia: 6,
      });
    }

    return {
      semanaEtiqueta: `Semana del ${lunes.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })} al ${finSemana.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })}`,
      totalHorasSemana: Math.round(totalHorasSemana * 10) / 10,
      dias: diasSemana,
    };
  }
}
