"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileUseCase = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
class GetProfileUseCase {
    profileRepository;
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async execute(userId) {
        const profile = await this.profileRepository.getProfile(userId);
        if (!profile) {
            throw new app_error_js_1.NotFoundError('Perfil de usuario no encontrado.');
        }
        return profile;
    }
}
exports.GetProfileUseCase = GetProfileUseCase;
//# sourceMappingURL=get-profile.use-case.js.map