export declare class TimeUtil {
    /**
     * Convierte cadena HH:mm o HH:mm:ss a minutos desde las 00:00
     */
    static timeToMinutes(timeStr: string): number;
    /**
     * Calcula las horas netas trabajadas descontando el almuerzo/refrigerio
     */
    static calculateNetHours(horaInicio: string, horaFin: string, descuentoAlmuerzoMin?: number): number;
}
