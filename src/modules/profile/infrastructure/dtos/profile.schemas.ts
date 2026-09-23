import { z } from 'zod';

export const HorarioDiaSchema = z.object({
  diaSemana: z.string().optional(),
  activo: z.boolean(),
  horaInicio: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inicio inválido (HH:mm)'),
  horaFin: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora fin inválido (HH:mm)'),
  refrigerioMinutos: z.number().min(0).max(180).default(0),
  modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).default('Presencial'),
});

export const HorarioSemanalSchema = z.record(HorarioDiaSchema);

export const UpdateProfileSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  nombreCompleto: z.string().min(2).optional(),
  carrera: z.string().optional(),
  semestre: z.string().optional(),
  metaHorasTotal: z.number().positive('La meta debe ser positiva').max(1200).optional(),
  metaHoras: z.number().positive().max(1200).optional(),
  horasInicialesPrevias: z.number().min(0, 'Las horas previas no pueden ser negativas').optional(),
  horasMinimasSemanales: z.number().min(0).optional(),
  perfilCompletado: z.boolean().optional(),
  fechaInicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato YYYY-MM-DD').nullable().optional(),
  fechaFin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato YYYY-MM-DD').nullable().optional(),
  horarioSemanal: HorarioSemanalSchema.optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
