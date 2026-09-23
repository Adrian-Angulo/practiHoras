"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileSchema = exports.HorarioSemanalSchema = exports.HorarioDiaSchema = void 0;
const zod_1 = require("zod");
exports.HorarioDiaSchema = zod_1.z.object({
    diaSemana: zod_1.z.string().optional(),
    activo: zod_1.z.boolean(),
    horaInicio: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inicio inválido (HH:mm)'),
    horaFin: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora fin inválido (HH:mm)'),
    refrigerioMinutos: zod_1.z.number().min(0).max(180).default(0),
    modalidad: zod_1.z.enum(['Presencial', 'Remoto', 'Híbrido']).default('Presencial'),
});
exports.HorarioSemanalSchema = zod_1.z.record(exports.HorarioDiaSchema);
exports.UpdateProfileSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
    nombreCompleto: zod_1.z.string().min(2).optional(),
    carrera: zod_1.z.string().optional(),
    semestre: zod_1.z.string().optional(),
    metaHorasTotal: zod_1.z.number().positive('La meta debe ser positiva').max(1200).optional(),
    metaHoras: zod_1.z.number().positive().max(1200).optional(),
    horasInicialesPrevias: zod_1.z.number().min(0, 'Las horas previas no pueden ser negativas').optional(),
    horasMinimasSemanales: zod_1.z.number().min(0).optional(),
    perfilCompletado: zod_1.z.boolean().optional(),
    fechaInicio: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato YYYY-MM-DD').nullable().optional(),
    fechaFin: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato YYYY-MM-DD').nullable().optional(),
    horarioSemanal: exports.HorarioSemanalSchema.optional(),
    avatarUrl: zod_1.z.string().url().optional().nullable(),
});
//# sourceMappingURL=profile.schemas.js.map