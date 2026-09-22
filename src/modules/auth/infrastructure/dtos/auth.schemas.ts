import { z } from 'zod';

export const DiaHorarioSchema = z.object({
  activo: z.boolean().default(true),
  horaInicio: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, 'Formato de hora inválido (HH:mm)')
    .default('08:00'),
  horaFin: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, 'Formato de hora inválido (HH:mm)')
    .default('17:00'),
  descuentoAlmuerzoMinutos: z
    .number()
    .int()
    .min(0)
    .max(180)
    .default(0),
  modalidad: z
    .enum(['Presencial', 'Remoto', 'Híbrido'])
    .default('Presencial'),
});

export const HorarioSemanalSchema = z.object({
  lunes: DiaHorarioSchema,
  martes: DiaHorarioSchema,
  miercoles: DiaHorarioSchema,
  jueves: DiaHorarioSchema,
  viernes: DiaHorarioSchema,
  sabado: DiaHorarioSchema.optional(),
  domingo: DiaHorarioSchema.optional(),
});

export const RegisterSchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es requerido' })
    .email('El correo debe ser una dirección de email válida')
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  nombreCompleto: z
    .string({ required_error: 'El nombre completo es requerido' })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  carrera: z.string().optional().default('Ingeniería de Software'),
  semestre: z.string().optional().default('Semestre 2025-1'),
  fechaInicio: z
    .string({ required_error: 'La fecha de inicio es requerida' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  fechaFin: z
    .string({ required_error: 'La fecha de fin es requerida' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  metaHoras: z
    .number({ required_error: 'La meta de horas es requerida' })
    .int('La meta debe ser un número entero')
    .min(100, 'La meta mínima es de 100 horas')
    .max(1200, 'La meta máxima es de 1200 horas')
    .default(360),
  horarioSemanal: HorarioSemanalSchema.optional(),
  horaInicioHabitual: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, 'Formato de hora inválido (HH:mm)')
    .optional(),
  horaFinHabitual: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, 'Formato de hora inválido (HH:mm)')
    .optional(),
  descuentoAlmuerzoHabitual: z
    .number()
    .int()
    .min(0, 'El descuento no puede ser negativo')
    .max(180, 'El descuento máximo es de 180 min')
    .optional(),
  modalidadHabitual: z
    .enum(['Presencial', 'Remoto', 'Híbrido'])
    .optional(),
});

export const LoginSchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es requerido' })
    .email('Formato de correo inválido')
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(1, 'La contraseña no puede estar vacía'),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es requerido' })
    .email('Formato de correo inválido')
    .trim()
    .toLowerCase(),
});

export const ResetPasswordSchema = z.object({
  token: z.string({ required_error: 'El token de recuperación es requerido' }).min(10, 'Token inválido'),
  newPassword: z
    .string({ required_error: 'La nueva contraseña es requerida' })
    .min(8, 'La nueva contraseña debe tener al menos 8 caracteres'),
});

export const UpdateProfileSchema = z.object({
  nombreCompleto: z.string().min(3).max(100).optional(),
  carrera: z.string().optional(),
  semestre: z.string().optional(),
  fechaInicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  fechaFin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  metaHoras: z.number().int().min(100).max(1200).optional(),
  horarioSemanal: HorarioSemanalSchema.optional(),
  horaInicioHabitual: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).optional(),
  horaFinHabitual: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).optional(),
  descuentoAlmuerzoHabitual: z.number().int().min(0).max(180).optional(),
  modalidadHabitual: z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
  avatarUrl: z.string().url().optional(),
});
