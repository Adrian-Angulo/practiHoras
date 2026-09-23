"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroCalculoService = void 0;
const app_error_js_1 = require("../../../../core/errors/app-error.js");
class RegistroCalculoService {
    /**
     * Convierte "HH:mm" a minutos desde medianoche
     */
    static horaAMinutos(horaStr) {
        const parts = horaStr.split(':').map(Number);
        if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) {
            throw new app_error_js_1.BadRequestError(`Formato de hora inválido: "${horaStr}". Debe ser HH:mm`);
        }
        return parts[0] * 60 + parts[1];
    }
    /**
     * Calcula las horas netas computables según la regla de negocio del proyecto
     * 1. minIni = h * 60 + m
     * 2. minFin = h * 60 + m
     * 3. minBrutos = minFin - minIni
     * 4. minNetos = Math.max(0, minBrutos - descuentoMinutos)
     * 5. horas = Math.round((minNetos / 60) * 100) / 100
     */
    static calcularHorasComputables(horaInicio, horaFin, descuentoMinutos = 0) {
        const minIni = this.horaAMinutos(horaInicio);
        const minFin = this.horaAMinutos(horaFin);
        if (minIni >= minFin) {
            throw new app_error_js_1.BadRequestError(`La hora de inicio (${horaInicio}) debe ser cronológicamente anterior a la hora de fin (${horaFin}).`);
        }
        const minBrutos = minFin - minIni;
        const minNetos = Math.max(0, minBrutos - (descuentoMinutos || 0));
        const horas = Math.round((minNetos / 60) * 100) / 100;
        if (horas > 24) {
            throw new app_error_js_1.BadRequestError('Las horas computables de una jornada no pueden exceder las 24 horas.');
        }
        return horas;
    }
}
exports.RegistroCalculoService = RegistroCalculoService;
//# sourceMappingURL=registro-calculo.service.js.map