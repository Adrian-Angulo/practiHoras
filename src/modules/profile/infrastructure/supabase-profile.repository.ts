import { getSupabaseAdmin } from '../../../config/supabase.config.js';
import { BadRequestError, NotFoundError } from '../../../core/errors/app-error.js';
import { Perfil, HorarioSemanal, defaultHorarioSemanal } from '../domain/entities/profile.entity.js';
import { IProfileRepository, UpdatePerfilDTO } from '../domain/repositories/profile.repository.js';

interface ProfileRow {
  id: string;
  email: string;
  nombre: string;
  nombre_completo?: string | null;
  carrera?: string | null;
  semestre?: string | null;
  meta_horas_total?: number | string | null;
  meta_horas?: number | null;
  horas_iniciales_previas?: number | string | null;
  horas_minimas_semanales?: number | string | null;
  perfil_completado?: boolean | null;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  horario_semanal?: Record<string, any> | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export class SupabaseProfileRepository implements IProfileRepository {
  private get client() {
    return getSupabaseAdmin();
  }

  private mapRowToEntity(row: ProfileRow): Perfil {
    const parseNum = (val: any, fallback: number): number => {
      if (val === null || val === undefined) return fallback;
      const parsed = typeof val === 'string' ? parseFloat(val) : Number(val);
      return isNaN(parsed) ? fallback : parsed;
    };

    const horarioRaw = row.horario_semanal || defaultHorarioSemanal;
    const horario: HorarioSemanal = {};

    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    for (const d of dias) {
      const dayData = horarioRaw[d] || (defaultHorarioSemanal as any)[d];
      horario[d] = {
        diaSemana: dayData.diaSemana || d,
        activo: Boolean(dayData.activo),
        horaInicio: (dayData.horaInicio || '08:00').slice(0, 5),
        horaFin: (dayData.horaFin || '13:00').slice(0, 5),
        refrigerioMinutos: Number(dayData.refrigerioMinutos ?? dayData.descuentoAlmuerzoMinutos ?? 0),
        modalidad: dayData.modalidad || 'Presencial',
      };
    }

    const nombreFinal = row.nombre || row.nombre_completo || row.email.split('@')[0] || 'Practicante';

    return {
      id: row.id,
      email: row.email,
      nombre: nombreFinal,
      nombreCompleto: row.nombre_completo || nombreFinal,
      carrera: row.carrera || 'Ingeniería de Software',
      semestre: row.semestre || 'Semestre 2025-1',
      metaHorasTotal: parseNum(row.meta_horas_total ?? row.meta_horas, 360),
      metaHoras: parseNum(row.meta_horas ?? row.meta_horas_total, 360),
      horasInicialesPrevias: parseNum(row.horas_iniciales_previas, 0),
      horasMinimasSemanales: parseNum(row.horas_minimas_semanales, 30),
      perfilCompletado: Boolean(row.perfil_completado),
      fechaInicio: row.fecha_inicio ? row.fecha_inicio.split('T')[0] : null,
      fechaFin: row.fecha_fin ? row.fecha_fin.split('T')[0] : null,
      horarioSemanal: horario,
      avatarUrl: row.avatar_url || undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async getProfile(userId: string): Promise<Perfil | null> {
    const { data, error } = await this.client
      .from('perfiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      throw new BadRequestError(`Error al consultar perfil: ${error.message}`);
    }

    return data ? this.mapRowToEntity(data as ProfileRow) : null;
  }

  async updateProfile(userId: string, data: UpdatePerfilDTO): Promise<Perfil> {
    const existing = await this.getProfile(userId);
    if (!existing) {
      throw new NotFoundError('Perfil no encontrado para actualizar.');
    }

    const nombreVal = data.nombre || data.nombreCompleto || existing.nombre;
    const metaVal = data.metaHorasTotal ?? data.metaHoras ?? existing.metaHorasTotal;

    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (nombreVal !== undefined) {
      payload.nombre = nombreVal;
      payload.nombre_completo = nombreVal;
    }
    if (data.carrera !== undefined) payload.carrera = data.carrera;
    if (data.semestre !== undefined) payload.semestre = data.semestre;
    if (metaVal !== undefined) {
      payload.meta_horas_total = metaVal;
      payload.meta_horas = Math.round(metaVal);
    }
    if (data.horasInicialesPrevias !== undefined) {
      payload.horas_iniciales_previas = data.horasInicialesPrevias;
    }
    if (data.horasMinimasSemanales !== undefined) {
      payload.horas_minimas_semanales = data.horasMinimasSemanales;
    }
    if (data.perfilCompletado !== undefined) {
      payload.perfil_completado = data.perfilCompletado;
    }
    if (data.fechaInicio !== undefined) {
      payload.fecha_inicio = data.fechaInicio;
    }
    if (data.fechaFin !== undefined) {
      payload.fecha_fin = data.fechaFin;
    }
    if (data.horarioSemanal !== undefined) {
      payload.horario_semanal = data.horarioSemanal;
    }
    if (data.avatarUrl !== undefined) {
      payload.avatar_url = data.avatarUrl;
    }

    const { data: updatedRow, error } = await this.client
      .from('perfiles')
      .update(payload)
      .eq('id', userId)
      .select('*')
      .single();

    if (error || !updatedRow) {
      throw new BadRequestError(`Error al guardar cambios de perfil: ${error?.message}`);
    }

    return this.mapRowToEntity(updatedRow as ProfileRow);
  }
}
