import { z } from 'zod';
export declare const CrearRegistroSchema: z.ZodEffects<z.ZodObject<{
    fecha: z.ZodString;
    horaInicio: z.ZodString;
    horaFin: z.ZodString;
    descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
    modalidad: z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>;
    actividades: z.ZodString;
    supervisorNombre: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    horaInicio: string;
    horaFin: string;
    descuentoAlmuerzoMinutos: number;
    modalidad: "Presencial" | "Remoto" | "Híbrido";
    fecha: string;
    actividades: string;
    supervisorNombre?: string | null | undefined;
}, {
    horaInicio: string;
    horaFin: string;
    modalidad: "Presencial" | "Remoto" | "Híbrido";
    fecha: string;
    actividades: string;
    descuentoAlmuerzoMinutos?: number | undefined;
    supervisorNombre?: string | null | undefined;
}>, {
    horaInicio: string;
    horaFin: string;
    descuentoAlmuerzoMinutos: number;
    modalidad: "Presencial" | "Remoto" | "Híbrido";
    fecha: string;
    actividades: string;
    supervisorNombre?: string | null | undefined;
}, {
    horaInicio: string;
    horaFin: string;
    modalidad: "Presencial" | "Remoto" | "Híbrido";
    fecha: string;
    actividades: string;
    descuentoAlmuerzoMinutos?: number | undefined;
    supervisorNombre?: string | null | undefined;
}>;
export declare const ActualizarRegistroSchema: z.ZodObject<{
    fecha: z.ZodOptional<z.ZodString>;
    horaInicio: z.ZodOptional<z.ZodString>;
    horaFin: z.ZodOptional<z.ZodString>;
    descuentoAlmuerzoMinutos: z.ZodOptional<z.ZodNumber>;
    modalidad: z.ZodOptional<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
    actividades: z.ZodOptional<z.ZodString>;
    supervisorNombre: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    horaInicio?: string | undefined;
    horaFin?: string | undefined;
    descuentoAlmuerzoMinutos?: number | undefined;
    modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    fecha?: string | undefined;
    actividades?: string | undefined;
    supervisorNombre?: string | undefined;
}, {
    horaInicio?: string | undefined;
    horaFin?: string | undefined;
    descuentoAlmuerzoMinutos?: number | undefined;
    modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    fecha?: string | undefined;
    actividades?: string | undefined;
    supervisorNombre?: string | undefined;
}>;
export type CrearRegistroInput = z.infer<typeof CrearRegistroSchema>;
export type ActualizarRegistroInput = z.infer<typeof ActualizarRegistroSchema>;
