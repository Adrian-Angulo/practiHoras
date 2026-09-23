"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseProfileRepository = void 0;
const supabase_config_js_1 = require("../../../config/supabase.config.js");
const app_error_js_1 = require("../../../core/errors/app-error.js");
const profile_entity_js_1 = require("../domain/entities/profile.entity.js");
class SupabaseProfileRepository {
    get client() {
        return (0, supabase_config_js_1.getSupabaseAdmin)();
    }
    mapRowToEntity(row) {
        const parseNum = (val, fallback) => {
            if (val === null || val === undefined)
                return fallback;
            const parsed = typeof val === 'string' ? parseFloat(val) : Number(val);
            return isNaN(parsed) ? fallback : parsed;
        };
        const horarioRaw = row.horario_semanal || profile_entity_js_1.defaultHorarioSemanal;
        const horario = {};
        const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
        for (const d of dias) {
            const dayData = horarioRaw[d] || profile_entity_js_1.defaultHorarioSemanal[d];
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
    async getProfile(userId) {
        const { data, error } = await this.client
            .from('perfiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();
        if (error) {
            throw new app_error_js_1.BadRequestError(`Error al consultar perfil: ${error.message}`);
        }
        return data ? this.mapRowToEntity(data) : null;
    }
    async updateProfile(userId, data) {
        const existing = await this.getProfile(userId);
        if (!existing) {
            throw new app_error_js_1.NotFoundError('Perfil no encontrado para actualizar.');
        }
        const nombreVal = data.nombre || data.nombreCompleto || existing.nombre;
        const metaVal = data.metaHorasTotal ?? data.metaHoras ?? existing.metaHorasTotal;
        const payload = {
            updated_at: new Date().toISOString(),
        };
        if (nombreVal !== undefined) {
            payload.nombre = nombreVal;
            payload.nombre_completo = nombreVal;
        }
        if (data.carrera !== undefined)
            payload.carrera = data.carrera;
        if (data.semestre !== undefined)
            payload.semestre = data.semestre;
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
            throw new app_error_js_1.BadRequestError(`Error al guardar cambios de perfil: ${error?.message}`);
        }
        return this.mapRowToEntity(updatedRow);
    }
}
exports.SupabaseProfileRepository = SupabaseProfileRepository;
//# sourceMappingURL=supabase-profile.repository.js.map