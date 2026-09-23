export declare class RegistroCalculoService {
    /**
     * Convierte "HH:mm" a minutos desde medianoche
     */
    static horaAMinutos(horaStr: string): number;
    /**
     * Calcula las horas netas computables según la regla de negocio del proyecto
     * 1. minIni = h * 60 + m
     * 2. minFin = h * 60 + m
     * 3. minBrutos = minFin - minIni
     * 4. minNetos = Math.max(0, minBrutos - descuentoMinutos)
     * 5. horas = Math.round((minNetos / 60) * 100) / 100
     */
    static calcularHorasComputables(horaInicio: string, horaFin: string, descuentoMinutos?: number): number;
}
