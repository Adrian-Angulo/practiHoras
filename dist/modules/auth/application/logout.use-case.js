"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUseCase = void 0;
class LogoutUseCase {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(token) {
        await this.authRepository.logout(token);
    }
}
exports.LogoutUseCase = LogoutUseCase;
//# sourceMappingURL=logout.use-case.js.map