"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRegistroUseCase = void 0;
const registro_calculo_service_js_1 = require("../domain/services/registro-calculo.service.js");
class CreateRegistroUseCase {
    registrosRepo;
    constructor(registrosRepo) {
        this.registrosRepo = registrosRepo;
    }
    async execute(userId, data) {
        const descuento = data.descuentoAlmuerzoMinutos ?? data.refrigerioMinutos ?? 0;
        const horasComputables = registro_calculo_service_js_1.RegistroCalculoService.calcularHorasComputables(data.horaInicio, data.horaFin, descuento);
        return await this.registrosRepo.crear(userId, {
            ...data,
            descuentoAlmuerzoMinutos: descuento,
            horasComputables,
        });
    }
}
exports.CreateRegistroUseCase = CreateRegistroUseCase;
//# sourceMappingURL=create-registro.use-case.js.map