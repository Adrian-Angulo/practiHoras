"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUseCase = void 0;
const business_rules_js_1 = require("../domain/business-rules.js");
class ResetPasswordUseCase {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(dto) {
        // 1. Validar fortaleza de la nueva contraseña
        business_rules_js_1.AuthBusinessRules.validatePassword(dto.newPassword);
        // 2. Ejecutar restablecimiento en el repositorio
        await this.authRepository.resetPassword(dto);
    }
}
exports.ResetPasswordUseCase = ResetPasswordUseCase;
//# sourceMappingURL=reset-password.use-case.js.map