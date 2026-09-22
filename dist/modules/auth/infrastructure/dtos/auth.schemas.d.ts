import { z } from 'zod';
export declare const DiaHorarioSchema: z.ZodObject<{
    activo: z.ZodDefault<z.ZodBoolean>;
    horaInicio: z.ZodDefault<z.ZodString>;
    horaFin: z.ZodDefault<z.ZodString>;
    descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
    modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
}, "strip", z.ZodTypeAny, {
    activo: boolean;
    horaInicio: string;
    horaFin: string;
    descuentoAlmuerzoMinutos: number;
    modalidad: "Presencial" | "Remoto" | "Híbrido";
}, {
    activo?: boolean | undefined;
    horaInicio?: string | undefined;
    horaFin?: string | undefined;
    descuentoAlmuerzoMinutos?: number | undefined;
    modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
}>;
export declare const HorarioSemanalSchema: z.ZodObject<{
    lunes: z.ZodObject<{
        activo: z.ZodDefault<z.ZodBoolean>;
        horaInicio: z.ZodDefault<z.ZodString>;
        horaFin: z.ZodDefault<z.ZodString>;
        descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
        modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
    }, "strip", z.ZodTypeAny, {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    }, {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    }>;
    martes: z.ZodObject<{
        activo: z.ZodDefault<z.ZodBoolean>;
        horaInicio: z.ZodDefault<z.ZodString>;
        horaFin: z.ZodDefault<z.ZodString>;
        descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
        modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
    }, "strip", z.ZodTypeAny, {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    }, {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    }>;
    miercoles: z.ZodObject<{
        activo: z.ZodDefault<z.ZodBoolean>;
        horaInicio: z.ZodDefault<z.ZodString>;
        horaFin: z.ZodDefault<z.ZodString>;
        descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
        modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
    }, "strip", z.ZodTypeAny, {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    }, {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    }>;
    jueves: z.ZodObject<{
        activo: z.ZodDefault<z.ZodBoolean>;
        horaInicio: z.ZodDefault<z.ZodString>;
        horaFin: z.ZodDefault<z.ZodString>;
        descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
        modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
    }, "strip", z.ZodTypeAny, {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    }, {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    }>;
    viernes: z.ZodObject<{
        activo: z.ZodDefault<z.ZodBoolean>;
        horaInicio: z.ZodDefault<z.ZodString>;
        horaFin: z.ZodDefault<z.ZodString>;
        descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
        modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
    }, "strip", z.ZodTypeAny, {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    }, {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    }>;
    sabado: z.ZodOptional<z.ZodObject<{
        activo: z.ZodDefault<z.ZodBoolean>;
        horaInicio: z.ZodDefault<z.ZodString>;
        horaFin: z.ZodDefault<z.ZodString>;
        descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
        modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
    }, "strip", z.ZodTypeAny, {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    }, {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    }>>;
    domingo: z.ZodOptional<z.ZodObject<{
        activo: z.ZodDefault<z.ZodBoolean>;
        horaInicio: z.ZodDefault<z.ZodString>;
        horaFin: z.ZodDefault<z.ZodString>;
        descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
        modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
    }, "strip", z.ZodTypeAny, {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    }, {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    lunes: {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    };
    martes: {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    };
    miercoles: {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    };
    jueves: {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    };
    viernes: {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    };
    sabado?: {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    } | undefined;
    domingo?: {
        activo: boolean;
        horaInicio: string;
        horaFin: string;
        descuentoAlmuerzoMinutos: number;
        modalidad: "Presencial" | "Remoto" | "Híbrido";
    } | undefined;
}, {
    lunes: {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    };
    martes: {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    };
    miercoles: {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    };
    jueves: {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    };
    viernes: {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    };
    sabado?: {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    } | undefined;
    domingo?: {
        activo?: boolean | undefined;
        horaInicio?: string | undefined;
        horaFin?: string | undefined;
        descuentoAlmuerzoMinutos?: number | undefined;
        modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    } | undefined;
}>;
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    nombreCompleto: z.ZodString;
    carrera: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    semestre: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    fechaInicio: z.ZodString;
    fechaFin: z.ZodString;
    metaHoras: z.ZodDefault<z.ZodNumber>;
    horarioSemanal: z.ZodOptional<z.ZodObject<{
        lunes: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        martes: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        miercoles: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        jueves: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        viernes: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        sabado: z.ZodOptional<z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>>;
        domingo: z.ZodOptional<z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        lunes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        martes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        miercoles: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        jueves: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        viernes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        sabado?: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        } | undefined;
        domingo?: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        } | undefined;
    }, {
        lunes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        martes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        miercoles: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        jueves: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        viernes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        sabado?: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        } | undefined;
        domingo?: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        } | undefined;
    }>>;
    horaInicioHabitual: z.ZodOptional<z.ZodString>;
    horaFinHabitual: z.ZodOptional<z.ZodString>;
    descuentoAlmuerzoHabitual: z.ZodOptional<z.ZodNumber>;
    modalidadHabitual: z.ZodOptional<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    nombreCompleto: string;
    fechaInicio: string;
    fechaFin: string;
    metaHoras: number;
    carrera: string;
    semestre: string;
    horarioSemanal?: {
        lunes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        martes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        miercoles: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        jueves: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        viernes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        sabado?: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        } | undefined;
        domingo?: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        } | undefined;
    } | undefined;
    horaInicioHabitual?: string | undefined;
    horaFinHabitual?: string | undefined;
    descuentoAlmuerzoHabitual?: number | undefined;
    modalidadHabitual?: "Presencial" | "Remoto" | "Híbrido" | undefined;
}, {
    email: string;
    password: string;
    nombreCompleto: string;
    fechaInicio: string;
    fechaFin: string;
    metaHoras?: number | undefined;
    horarioSemanal?: {
        lunes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        martes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        miercoles: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        jueves: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        viernes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        sabado?: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        } | undefined;
        domingo?: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        } | undefined;
    } | undefined;
    carrera?: string | undefined;
    semestre?: string | undefined;
    horaInicioHabitual?: string | undefined;
    horaFinHabitual?: string | undefined;
    descuentoAlmuerzoHabitual?: number | undefined;
    modalidadHabitual?: "Presencial" | "Remoto" | "Híbrido" | undefined;
}>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const ForgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const ResetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
    newPassword: string;
}, {
    token: string;
    newPassword: string;
}>;
export declare const UpdateProfileSchema: z.ZodObject<{
    nombreCompleto: z.ZodOptional<z.ZodString>;
    carrera: z.ZodOptional<z.ZodString>;
    semestre: z.ZodOptional<z.ZodString>;
    fechaInicio: z.ZodOptional<z.ZodString>;
    fechaFin: z.ZodOptional<z.ZodString>;
    metaHoras: z.ZodOptional<z.ZodNumber>;
    horarioSemanal: z.ZodOptional<z.ZodObject<{
        lunes: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        martes: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        miercoles: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        jueves: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        viernes: z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>;
        sabado: z.ZodOptional<z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>>;
        domingo: z.ZodOptional<z.ZodObject<{
            activo: z.ZodDefault<z.ZodBoolean>;
            horaInicio: z.ZodDefault<z.ZodString>;
            horaFin: z.ZodDefault<z.ZodString>;
            descuentoAlmuerzoMinutos: z.ZodDefault<z.ZodNumber>;
            modalidad: z.ZodDefault<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
        }, "strip", z.ZodTypeAny, {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        }, {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        lunes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        martes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        miercoles: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        jueves: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        viernes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        sabado?: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        } | undefined;
        domingo?: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        } | undefined;
    }, {
        lunes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        martes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        miercoles: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        jueves: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        viernes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        sabado?: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        } | undefined;
        domingo?: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        } | undefined;
    }>>;
    horaInicioHabitual: z.ZodOptional<z.ZodString>;
    horaFinHabitual: z.ZodOptional<z.ZodString>;
    descuentoAlmuerzoHabitual: z.ZodOptional<z.ZodNumber>;
    modalidadHabitual: z.ZodOptional<z.ZodEnum<["Presencial", "Remoto", "Híbrido"]>>;
    avatarUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    nombreCompleto?: string | undefined;
    fechaInicio?: string | undefined;
    fechaFin?: string | undefined;
    metaHoras?: number | undefined;
    horarioSemanal?: {
        lunes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        martes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        miercoles: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        jueves: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        viernes: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        };
        sabado?: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        } | undefined;
        domingo?: {
            activo: boolean;
            horaInicio: string;
            horaFin: string;
            descuentoAlmuerzoMinutos: number;
            modalidad: "Presencial" | "Remoto" | "Híbrido";
        } | undefined;
    } | undefined;
    carrera?: string | undefined;
    semestre?: string | undefined;
    horaInicioHabitual?: string | undefined;
    horaFinHabitual?: string | undefined;
    descuentoAlmuerzoHabitual?: number | undefined;
    modalidadHabitual?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    avatarUrl?: string | undefined;
}, {
    nombreCompleto?: string | undefined;
    fechaInicio?: string | undefined;
    fechaFin?: string | undefined;
    metaHoras?: number | undefined;
    horarioSemanal?: {
        lunes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        martes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        miercoles: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        jueves: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        viernes: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        };
        sabado?: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        } | undefined;
        domingo?: {
            activo?: boolean | undefined;
            horaInicio?: string | undefined;
            horaFin?: string | undefined;
            descuentoAlmuerzoMinutos?: number | undefined;
            modalidad?: "Presencial" | "Remoto" | "Híbrido" | undefined;
        } | undefined;
    } | undefined;
    carrera?: string | undefined;
    semestre?: string | undefined;
    horaInicioHabitual?: string | undefined;
    horaFinHabitual?: string | undefined;
    descuentoAlmuerzoHabitual?: number | undefined;
    modalidadHabitual?: "Presencial" | "Remoto" | "Híbrido" | undefined;
    avatarUrl?: string | undefined;
}>;
