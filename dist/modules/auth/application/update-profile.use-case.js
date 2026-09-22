"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileUseCase = void 0;
const business_rules_js_1 = require("../domain/business-rules.js");
class UpdateProfileUseCase {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(userId, dto) {
        if (dto.fechaInicio && dto.fechaFin) {
            business_rules_js_1.AuthBusinessRules.validateConvenioDates(dto.fechaInicio, dto.fechaFin);
        }
        if (dto.metaHoras !== undefined) {
            business_rules_js_1.AuthBusinessRules.validateMetaHoras(dto.metaHoras);
        }
        if (dto.horaInicioHabitual && dto.horaFinHabitual) {
            business_rules_js_1.AuthBusinessRules.validateHabitualSchedule(dto.horaInicioHabitual, dto.horaFinHabitual, dto.descuentoAlmuerzoHabitual ?? 60);
        }
        return await this.authRepository.updateProfile(userId, dto);
    }
}
exports.UpdateProfileUseCase = UpdateProfileUseCase;
//# sourceMappingURL=update-profile.use-case.js.map