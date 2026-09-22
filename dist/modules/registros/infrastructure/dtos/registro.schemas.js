"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarRegistroSchema = exports.CrearRegistroSchema = void 0;
const zod_1 = require("zod");
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
exports.CrearRegistroSchema = zod_1.z
    .object({
    fecha: zod_1.z.string().regex(dateRegex, 'Formato de fecha inválido (YYYY-MM-DD)'),
    horaInicio: zod_1.z.string().regex(timeRegex, 'Formato de hora de inicio inválido (HH:mm)'),
    horaFin: zod_1.z.string().regex(timeRegex, 'Formato de hora de fin inválido (HH:mm)'),
    descuentoAlmuerzoMinutos: zod_1.z.number().int().min(0).max(180).default(0),
    modalidad: zod_1.z.enum(['Presencial', 'Remoto', 'Híbrido']),
    actividades: zod_1.z.string().min(5, 'Las actividades deben contener al menos 5 caracteres').max(2000),
    supervisorNombre: zod_1.z.string().max(100).optional().nullable().or(zod_1.z.literal('')),
})
    .refine((data) => {
    const [hIni, mIni] = data.horaInicio.split(':').map(Number);
    const [hFin, mFin] = data.horaFin.split(':').map(Number);
    const minutosTotales = hFin * 60 + mFin - (hIni * 60 + mIni);
    return minutosTotales > data.descuentoAlmuerzoMinutos;
}, {
    message: 'La hora de fin debe ser posterior a la de inicio considerando el tiempo de almuerzo',
    path: ['horaFin'],
});
exports.ActualizarRegistroSchema = zod_1.z.object({
    fecha: zod_1.z.string().regex(dateRegex).optional(),
    horaInicio: zod_1.z.string().regex(timeRegex).optional(),
    horaFin: zod_1.z.string().regex(timeRegex).optional(),
    descuentoAlmuerzoMinutos: zod_1.z.number().int().min(0).max(180).optional(),
    modalidad: zod_1.z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
    actividades: zod_1.z.string().min(5).max(2000).optional(),
    supervisorNombre: zod_1.z.string().max(100).optional(),
});
//# sourceMappingURL=registro.schemas.js.map