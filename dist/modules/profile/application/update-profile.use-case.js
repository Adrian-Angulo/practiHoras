"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileUseCase = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
class UpdateProfileUseCase {
    profileRepository;
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async execute(userId, data) {
        // Validar fechas de convenio si ambas están presentes
        if (data.fechaInicio && data.fechaFin) {
            const inicio = new Date(data.fechaInicio);
            const fin = new Date(data.fechaFin);
            if (inicio > fin) {
                throw new app_error_js_1.BadRequestError('La fecha de inicio no puede ser posterior a la fecha de culminación.');
            }
        }
        if (data.metaHorasTotal !== undefined && data.metaHorasTotal <= 0) {
            throw new app_error_js_1.BadRequestError('La meta total de horas debe ser un valor positivo mayor a 0.');
        }
        return await this.profileRepository.updateProfile(userId, data);
    }
}
exports.UpdateProfileUseCase = UpdateProfileUseCase;
//# sourceMappingURL=update-profile.use-case.js.map