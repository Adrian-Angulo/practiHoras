"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
const get_profile_use_case_js_1 = require("../application/get-profile.use-case.js");
const update_profile_use_case_js_1 = require("../application/update-profile.use-case.js");
class ProfileController {
    getProfileUseCase;
    updateProfileUseCase;
    constructor(profileRepo) {
        this.getProfileUseCase = new get_profile_use_case_js_1.GetProfileUseCase(profileRepo);
        this.updateProfileUseCase = new update_profile_use_case_js_1.UpdateProfileUseCase(profileRepo);
    }
    getUserId(req) {
        if (!req.user?.id) {
            throw new app_error_js_1.UnauthorizedError('Usuario no autenticado.');
        }
        return req.user.id;
    }
    getProfile = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const profile = await this.getProfileUseCase.execute(userId);
            // Retornar entidad directa conforme a la especificación FrontendMovil
            res.status(200).json(profile);
        }
        catch (error) {
            next(error);
        }
    };
    updateProfile = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const input = req.body;
            const updated = await this.updateProfileUseCase.execute(userId, input);
            res.status(200).json(updated);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map