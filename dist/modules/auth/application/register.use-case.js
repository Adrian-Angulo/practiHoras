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
        // 1. Aplicar reglas de negocio
        business_rules_js_1.AuthBusinessRules.validatePassword(dto.password);
        if (dto.fechaInicio && dto.fechaFin) {
            business_rules_js_1.AuthBusinessRules.validateConvenioDates(dto.fechaInicio, dto.fechaFin);
        }
        const meta = dto.metaHorasTotal ?? dto.metaHoras ?? 360;
        business_rules_js_1.AuthBusinessRules.validateMetaHoras(meta);
        // 2. Persistir en el repositorio
        return await this.authRepository.register({
            ...dto,
            metaHorasTotal: meta,
            metaHoras: meta,
        });
    }
}
exports.RegisterUseCase = RegisterUseCase;
//# sourceMappingURL=register.use-case.js.map