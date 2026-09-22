"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const business_rules_js_1 = require("../domain/business-rules.js");
class RegisterUseCase {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(dto) {
        // 1. Aplicar reglas de negocio obligatorias
        business_rules_js_1.AuthBusinessRules.validatePassword(dto.password);
        business_rules_js_1.AuthBusinessRules.validateConvenioDates(dto.fechaInicio, dto.fechaFin);
        business_rules_js_1.AuthBusinessRules.validateMetaHoras(dto.metaHoras);
        const horaInicio = dto.horaInicioHabitual || '08:00';
        const horaFin = dto.horaFinHabitual || '17:00';
        const descuento = dto.descuentoAlmuerzoHabitual ?? 60;
        business_rules_js_1.AuthBusinessRules.validateHabitualSchedule(horaInicio, horaFin, descuento);
        // 2. Persistir en el repositorio
        return await this.authRepository.register(dto);
    }
}
exports.RegisterUseCase = RegisterUseCase;
//# sourceMappingURL=register.use-case.js.map