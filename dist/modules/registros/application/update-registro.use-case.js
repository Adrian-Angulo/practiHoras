"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRegistroUseCase = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
const registro_calculo_service_js_1 = require("../domain/services/registro-calculo.service.js");
class UpdateRegistroUseCase {
    registrosRepo;
    constructor(registrosRepo) {
        this.registrosRepo = registrosRepo;
    }
    async execute(userId, id, data) {
        const existing = await this.registrosRepo.obtenerPorId(userId, id);
        if (!existing) {
            throw new app_error_js_1.NotFoundError('El registro de jornada a actualizar no existe.');
        }
        const horaInicio = data.horaInicio || existing.horaInicio;
        const horaFin = data.horaFin || existing.horaFin;
        const descuento = data.descuentoAlmuerzoMinutos ??
            data.refrigerioMinutos ??
            existing.descuentoAlmuerzoMinutos ??
            0;
        const horasComputables = registro_calculo_service_js_1.RegistroCalculoService.calcularHorasComputables(horaInicio, horaFin, descuento);
        return await this.registrosRepo.actualizar(userId, id, {
            ...data,
            descuentoAlmuerzoMinutos: descuento,
            horasComputables,
        });
    }
}
exports.UpdateRegistroUseCase = UpdateRegistroUseCase;
//# sourceMappingURL=update-registro.use-case.js.map