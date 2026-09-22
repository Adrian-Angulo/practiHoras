"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeUtil = void 0;
class TimeUtil {
    /**
     * Convierte cadena HH:mm o HH:mm:ss a minutos desde las 00:00
     */
    static timeToMinutes(timeStr) {
        const parts = timeStr.split(':').map((p) => parseInt(p, 10));
        const hours = parts[0] || 0;
        const minutes = parts[1] || 0;
        return hours * 60 + minutes;
    }
    /**
     * Calcula las horas netas trabajadas descontando el almuerzo/refrigerio
     */
    static calculateNetHours(horaInicio, horaFin, descuentoAlmuerzoMin = 0) {
        const startMin = this.timeToMinutes(horaInicio);
        const endMin = this.timeToMinutes(horaFin);
        if (endMin <= startMin) {
            return 0;
        }
        const totalMin = endMin - startMin;
        const netMin = Math.max(0, totalMin - descuentoAlmuerzoMin);
        return Math.round((netMin / 60) * 100) / 100;
    }
}
exports.TimeUtil = TimeUtil;
//# sourceMappingURL=time.util.js.map