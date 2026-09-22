"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserUseCase = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
class GetCurrentUserUseCase {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(userId) {
        const profile = await this.authRepository.getProfileById(userId);
        if (!profile) {
            throw new app_error_js_1.NotFoundError('Perfil de usuario no encontrado');
        }
        return profile;
    }
}
exports.GetCurrentUserUseCase = GetCurrentUserUseCase;
//# sourceMappingURL=get-current-user.use-case.js.map