"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileSchema = exports.ResetPasswordSchema = exports.ForgotPasswordSchema = exports.LoginSchema = exports.RegisterSchema = exports.HorarioSemanalSchema = exports.DiaHorarioSchema = void 0;
const zod_1 = require("zod");
exports.DiaHorarioSchema = zod_1.z.object({
    activo: zod_1.z.boolean().default(true),
    horaInicio: zod_1.z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, 'Formato de hora inválido (HH:mm)')
        .default('08:00'),
    horaFin: zod_1.z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, 'Formato de hora inválido (HH:mm)')
        .default('17:00'),
    descuentoAlmuerzoMinutos: zod_1.z
        .number()
        .int()
        .min(0)
        .max(180)
        .default(0),
    modalidad: zod_1.z
        .enum(['Presencial', 'Remoto', 'Híbrido'])
        .default('Presencial'),
});
exports.HorarioSemanalSchema = zod_1.z.object({
    lunes: exports.DiaHorarioSchema,
    martes: exports.DiaHorarioSchema,
    miercoles: exports.DiaHorarioSchema,
    jueves: exports.DiaHorarioSchema,
    viernes: exports.DiaHorarioSchema,
    sabado: exports.DiaHorarioSchema.optional(),
    domingo: exports.DiaHorarioSchema.optional(),
});
exports.RegisterSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'El correo electrónico es requerido' })
        .email('El correo debe ser una dirección de email válida')
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string({ required_error: 'La contraseña es requerida' })
        .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    nombreCompleto: zod_1.z
        .string({ required_error: 'El nombre completo es requerido' })
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres')
        .trim(),
    carrera: zod_1.z.string().optional().default('Ingeniería de Software'),
    semestre: zod_1.z.string().optional().default('Semestre 2025-1'),
    fechaInicio: zod_1.z
        .string({ required_error: 'La fecha de inicio es requerida' })
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
    fechaFin: zod_1.z
        .string({ required_error: 'La fecha de fin es requerida' })
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
    metaHoras: zod_1.z
        .number({ required_error: 'La meta de horas es requerida' })
        .int('La meta debe ser un número entero')
        .min(100, 'La meta mínima es de 100 horas')
        .max(1200, 'La meta máxima es de 1200 horas')
        .default(360),
    horarioSemanal: exports.HorarioSemanalSchema.optional(),
    horaInicioHabitual: zod_1.z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, 'Formato de hora inválido (HH:mm)')
        .optional(),
    horaFinHabitual: zod_1.z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, 'Formato de hora inválido (HH:mm)')
        .optional(),
    descuentoAlmuerzoHabitual: zod_1.z
        .number()
        .int()
        .min(0, 'El descuento no puede ser negativo')
        .max(180, 'El descuento máximo es de 180 min')
        .optional(),
    modalidadHabitual: zod_1.z
        .enum(['Presencial', 'Remoto', 'Híbrido'])
        .optional(),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'El correo electrónico es requerido' })
        .email('Formato de correo inválido')
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string({ required_error: 'La contraseña es requerida' })
        .min(1, 'La contraseña no puede estar vacía'),
});
exports.ForgotPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'El correo electrónico es requerido' })
        .email('Formato de correo inválido')
        .trim()
        .toLowerCase(),
});
exports.ResetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string({ required_error: 'El token de recuperación es requerido' }).min(10, 'Token inválido'),
    newPassword: zod_1.z
        .string({ required_error: 'La nueva contraseña es requerida' })
        .min(8, 'La nueva contraseña debe tener al menos 8 caracteres'),
});
exports.UpdateProfileSchema = zod_1.z.object({
    nombreCompleto: zod_1.z.string().min(3).max(100).optional(),
    carrera: zod_1.z.string().optional(),
    semestre: zod_1.z.string().optional(),
    fechaInicio: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    fechaFin: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    metaHoras: zod_1.z.number().int().min(100).max(1200).optional(),
    horarioSemanal: exports.HorarioSemanalSchema.optional(),
    horaInicioHabitual: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).optional(),
    horaFinHabitual: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).optional(),
    descuentoAlmuerzoHabitual: zod_1.z.number().int().min(0).max(180).optional(),
    modalidadHabitual: zod_1.z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
    avatarUrl: zod_1.z.string().url().optional(),
});
//# sourceMappingURL=auth.schemas.js.map