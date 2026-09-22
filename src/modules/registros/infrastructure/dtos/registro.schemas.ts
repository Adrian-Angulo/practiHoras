import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const CrearRegistroSchema = z
  .object({
    fecha: z.string().regex(dateRegex, 'Formato de fecha inválido (YYYY-MM-DD)'),
    horaInicio: z.string().regex(timeRegex, 'Formato de hora de inicio inválido (HH:mm)'),
    horaFin: z.string().regex(timeRegex, 'Formato de hora de fin inválido (HH:mm)'),
    descuentoAlmuerzoMinutos: z.number().int().min(0).max(180).default(0),
    modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']),
    actividades: z.string().min(5, 'Las actividades deben contener al menos 5 caracteres').max(2000),
    supervisorNombre: z.string().max(100).optional().nullable().or(z.literal('')),
  })
  .refine(
    (data) => {
      const [hIni, mIni] = data.horaInicio.split(':').map(Number);
      const [hFin, mFin] = data.horaFin.split(':').map(Number);
      const minutosTotales = hFin * 60 + mFin - (hIni * 60 + mIni);
      return minutosTotales > data.descuentoAlmuerzoMinutos;
    },
    {
      message: 'La hora de fin debe ser posterior a la de inicio considerando el tiempo de almuerzo',
      path: ['horaFin'],
    }
  );

export const ActualizarRegistroSchema = z.object({
  fecha: z.string().regex(dateRegex).optional(),
  horaInicio: z.string().regex(timeRegex).optional(),
  horaFin: z.string().regex(timeRegex).optional(),
  descuentoAlmuerzoMinutos: z.number().int().min(0).max(180).optional(),
  modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
  actividades: z.string().min(5).max(2000).optional(),
  supervisorNombre: z.string().max(100).optional(),
});

export type CrearRegistroInput = z.infer<typeof CrearRegistroSchema>;
export type ActualizarRegistroInput = z.infer<typeof ActualizarRegistroSchema>;
