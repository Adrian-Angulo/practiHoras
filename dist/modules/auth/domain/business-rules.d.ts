export declare class AuthBusinessRules {
    /**
     * REGLA 1: Fortaleza de Contraseña
     * Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un dígito y un carácter especial.
     */
    static validatePassword(password: string): void;
    /**
     * REGLA 2: Validación de Fechas del Convenio de Prácticas
     * - fechaInicio debe ser anterior a fechaFin
     * - Duración mínima: 30 días
     * - Duración máxima: 730 días (2 años)
     */
    static validateConvenioDates(fechaInicio: string, fechaFin: string): void;
    /**
     * REGLA 3: Meta de Horas Académicas
     * Límite razonable entre 100 y 1200 horas totales (estándar 360 - 480 horas).
     */
    static validateMetaHoras(metaHoras: number): void;
    /**
     * REGLA 4: Horario y Jornada Laboral Habitual
     * - Hora de inicio anterior a la de fin.
     * - Descuento de almuerzo entre 0 y 180 min.
     * - Límite legal de jornada para practicantes: Máximo 8.0 horas netas diarias (o 30h/48h semanales).
     */
    static validateHabitualSchedule(horaInicio: string, horaFin: string, descuentoAlmuerzoMin?: number): void;
}
