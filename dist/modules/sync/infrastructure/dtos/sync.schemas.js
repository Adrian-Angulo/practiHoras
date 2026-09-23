"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncBatchSchema = void 0;
const zod_1 = require("zod");
const profile_schemas_js_1 = require("../../../profile/infrastructure/dtos/profile.schemas.js");
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const SyncRegistroItemSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    fecha: zod_1.z.string().regex(dateRegex),
    horaInicio: zod_1.z.string().regex(timeRegex),
    horaFin: zod_1.z.string().regex(timeRegex),
    descuentoAlmuerzoMinutos: zod_1.z.number().int().min(0).max(180).optional(),
    refrigerioMinutos: zod_1.z.number().int().min(0).max(180).optional(),
    horasComputables: zod_1.z.number().min(0).max(24).optional(),
    modalidad: zod_1.z.enum(['Presencial', 'Remoto', 'Híbrido']).default('Presencial'),
    actividades: zod_1.z.string().min(1).max(3000),
    supervisorNombre: zod_1.z.string().max(100).optional().nullable(),
    estado: zod_1.z.enum(['Borrador', 'Pendiente', 'Aprobado', 'Observado']).optional(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
const SyncRegistroUpdateItemSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    fecha: zod_1.z.string().regex(dateRegex).optional(),
    horaInicio: zod_1.z.string().regex(timeRegex).optional(),
    horaFin: zod_1.z.string().regex(timeRegex).optional(),
    descuentoAlmuerzoMinutos: zod_1.z.number().int().min(0).max(180).optional(),
    refrigerioMinutos: zod_1.z.number().int().min(0).max(180).optional(),
    horasComputables: zod_1.z.number().min(0).max(24).optional(),
    modalidad: zod_1.z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
    actividades: zod_1.z.string().min(1).max(3000).optional(),
    supervisorNombre: zod_1.z.string().max(100).optional().nullable(),
    estado: zod_1.z.enum(['Borrador', 'Pendiente', 'Aprobado', 'Observado']).optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.SyncBatchSchema = zod_1.z.object({
    perfil: profile_schemas_js_1.UpdateProfileSchema.optional(),
    registros: zod_1.z
        .object({
        creados: zod_1.z.array(SyncRegistroItemSchema).optional().default([]),
        actualizados: zod_1.z.array(SyncRegistroUpdateItemSchema).optional().default([]),
        eliminadosIds: zod_1.z.array(zod_1.z.string().uuid()).optional().default([]),
    })
        .optional(),
});
//# sourceMappingURL=sync.schemas.js.map