"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordResetUseCase = void 0;
class RequestPasswordResetUseCase {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(email, ipAddress) {
        return await this.authRepository.requestPasswordReset(email, ipAddress);
    }
}
exports.RequestPasswordResetUseCase = RequestPasswordResetUseCase;
//# sourceMappingURL=request-password-reset.use-case.js.map