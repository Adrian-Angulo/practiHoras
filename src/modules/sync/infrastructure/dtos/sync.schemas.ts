import { z } from 'zod';
import { UpdateProfileSchema } from '../../../profile/infrastructure/dtos/profile.schemas.js';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const SyncRegistroItemSchema = z.object({
  id: z.string().uuid().optional(),
  fecha: z.string().regex(dateRegex),
  horaInicio: z.string().regex(timeRegex),
  horaFin: z.string().regex(timeRegex),
  descuentoAlmuerzoMinutos: z.number().int().min(0).max(180).optional(),
  refrigerioMinutos: z.number().int().min(0).max(180).optional(),
  horasComputables: z.number().min(0).max(24).optional(),
  modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).default('Presencial'),
  actividades: z.string().min(1).max(3000),
  supervisorNombre: z.string().max(100).optional().nullable(),
  estado: z.enum(['Borrador', 'Pendiente', 'Aprobado', 'Observado']).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const SyncRegistroUpdateItemSchema = z.object({
  id: z.string().uuid(),
  fecha: z.string().regex(dateRegex).optional(),
  horaInicio: z.string().regex(timeRegex).optional(),
  horaFin: z.string().regex(timeRegex).optional(),
  descuentoAlmuerzoMinutos: z.number().int().min(0).max(180).optional(),
  refrigerioMinutos: z.number().int().min(0).max(180).optional(),
  horasComputables: z.number().min(0).max(24).optional(),
  modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
  actividades: z.string().min(1).max(3000).optional(),
  supervisorNombre: z.string().max(100).optional().nullable(),
  estado: z.enum(['Borrador', 'Pendiente', 'Aprobado', 'Observado']).optional(),
  updatedAt: z.string().optional(),
});

export const SyncBatchSchema = z.object({
  perfil: UpdateProfileSchema.optional(),
  registros: z
    .object({
      creados: z.array(SyncRegistroItemSchema).optional().default([]),
      actualizados: z.array(SyncRegistroUpdateItemSchema).optional().default([]),
      eliminadosIds: z.array(z.string().uuid()).optional().default([]),
    })
    .optional(),
});

export type SyncBatchInput = z.infer<typeof SyncBatchSchema>;
