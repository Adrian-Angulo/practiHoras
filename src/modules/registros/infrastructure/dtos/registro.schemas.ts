import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const CrearRegistroSchema = z
  .object({
    id: z.string().uuid().optional(),
    fecha: z.string().regex(dateRegex, 'Formato de fecha inválido (YYYY-MM-DD)'),
    horaInicio: z.string().regex(timeRegex, 'Formato de hora de inicio inválido (HH:mm)'),
    horaFin: z.string().regex(timeRegex, 'Formato de hora de fin inválido (HH:mm)'),
    descuentoAlmuerzoMinutos: z.number().int().min(0).max(180).optional(),
    refrigerioMinutos: z.number().int().min(0).max(180).optional(),
    horasComputables: z.number().min(0).max(24).optional(),
    modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).default('Presencial'),
    actividades: z.string().min(2, 'Las actividades deben contener al menos 2 caracteres').max(3000),
    supervisorNombre: z.string().max(100).optional().nullable().or(z.literal('')),
    estado: z.enum(['Borrador', 'Pendiente', 'Aprobado', 'Observado']).optional(),
  })
  .refine(
    (data) => {
      const [hIni, mIni] = data.horaInicio.split(':').map(Number);
      const [hFin, mFin] = data.horaFin.split(':').map(Number);
      const minTotales = hFin! * 60 + mFin! - (hIni! * 60 + mIni!);
      const desc = data.descuentoAlmuerzoMinutos ?? data.refrigerioMinutos ?? 0;
      return minTotales > desc;
    },
    {
      message: 'La hora de fin debe ser posterior a la de inicio considerando el refrigerio.',
      path: ['horaFin'],
    }
  );

export const ActualizarRegistroSchema = z.object({
  fecha: z.string().regex(dateRegex).optional(),
  horaInicio: z.string().regex(timeRegex).optional(),
  horaFin: z.string().regex(timeRegex).optional(),
  descuentoAlmuerzoMinutos: z.number().int().min(0).max(180).optional(),
  refrigerioMinutos: z.number().int().min(0).max(180).optional(),
  horasComputables: z.number().min(0).max(24).optional(),
  modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
  actividades: z.string().min(2).max(3000).optional(),
  supervisorNombre: z.string().max(100).optional().nullable().or(z.literal('')),
  estado: z.enum(['Borrador', 'Pendiente', 'Aprobado', 'Observado']).optional(),
});

export const FiltrosRegistrosSchema = z.object({
  mes: z.coerce.number().int().min(1).max(12).optional(),
  anio: z.coerce.number().int().min(2000).max(2100).optional(),
  modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
  desde: z.string().regex(dateRegex).optional(),
  hasta: z.string().regex(dateRegex).optional(),
  limite: z.coerce.number().int().positive().optional(),
});

export type CrearRegistroInput = z.infer<typeof CrearRegistroSchema>;
export type ActualizarRegistroInput = z.infer<typeof ActualizarRegistroSchema>;
export type FiltrosRegistrosInput = z.infer<typeof FiltrosRegistrosSchema>;
