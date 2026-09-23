"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltrosRegistrosSchema = exports.ActualizarRegistroSchema = exports.CrearRegistroSchema = void 0;
const zod_1 = require("zod");
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
exports.CrearRegistroSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid().optional(),
    fecha: zod_1.z.string().regex(dateRegex, 'Formato de fecha inválido (YYYY-MM-DD)'),
    horaInicio: zod_1.z.string().regex(timeRegex, 'Formato de hora de inicio inválido (HH:mm)'),
    horaFin: zod_1.z.string().regex(timeRegex, 'Formato de hora de fin inválido (HH:mm)'),
    descuentoAlmuerzoMinutos: zod_1.z.number().int().min(0).max(180).optional(),
    refrigerioMinutos: zod_1.z.number().int().min(0).max(180).optional(),
    horasComputables: zod_1.z.number().min(0).max(24).optional(),
    modalidad: zod_1.z.enum(['Presencial', 'Remoto', 'Híbrido']).default('Presencial'),
    actividades: zod_1.z.string().min(2, 'Las actividades deben contener al menos 2 caracteres').max(3000),
    supervisorNombre: zod_1.z.string().max(100).optional().nullable().or(zod_1.z.literal('')),
    estado: zod_1.z.enum(['Borrador', 'Pendiente', 'Aprobado', 'Observado']).optional(),
})
    .refine((data) => {
    const [hIni, mIni] = data.horaInicio.split(':').map(Number);
    const [hFin, mFin] = data.horaFin.split(':').map(Number);
    const minTotales = hFin * 60 + mFin - (hIni * 60 + mIni);
    const desc = data.descuentoAlmuerzoMinutos ?? data.refrigerioMinutos ?? 0;
    return minTotales > desc;
}, {
    message: 'La hora de fin debe ser posterior a la de inicio considerando el refrigerio.',
    path: ['horaFin'],
});
exports.ActualizarRegistroSchema = zod_1.z.object({
    fecha: zod_1.z.string().regex(dateRegex).optional(),
    horaInicio: zod_1.z.string().regex(timeRegex).optional(),
    horaFin: zod_1.z.string().regex(timeRegex).optional(),
    descuentoAlmuerzoMinutos: zod_1.z.number().int().min(0).max(180).optional(),
    refrigerioMinutos: zod_1.z.number().int().min(0).max(180).optional(),
    horasComputables: zod_1.z.number().min(0).max(24).optional(),
    modalidad: zod_1.z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
    actividades: zod_1.z.string().min(2).max(3000).optional(),
    supervisorNombre: zod_1.z.string().max(100).optional().nullable().or(zod_1.z.literal('')),
    estado: zod_1.z.enum(['Borrador', 'Pendiente', 'Aprobado', 'Observado']).optional(),
});
exports.FiltrosRegistrosSchema = zod_1.z.object({
    mes: zod_1.z.coerce.number().int().min(1).max(12).optional(),
    anio: zod_1.z.coerce.number().int().min(2000).max(2100).optional(),
    modalidad: zod_1.z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
    desde: zod_1.z.string().regex(dateRegex).optional(),
    hasta: zod_1.z.string().regex(dateRegex).optional(),
    limite: zod_1.z.coerce.number().int().positive().optional(),
});
//# sourceMappingURL=registro.schemas.js.map