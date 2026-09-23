"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardMetricsUseCase = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
const pacing_engine_service_js_1 = require("../domain/services/pacing-engine.service.js");
class GetDashboardMetricsUseCase {
    profileRepo;
    registrosRepo;
    constructor(profileRepo, registrosRepo) {
        this.profileRepo = profileRepo;
        this.registrosRepo = registrosRepo;
    }
    async execute(userId) {
        const [perfil, registros] = await Promise.all([
            this.profileRepo.getProfile(userId),
            this.registrosRepo.listar(userId),
        ]);
        if (!perfil) {
            throw new app_error_js_1.NotFoundError('Perfil de practicante no encontrado.');
        }
        return pacing_engine_service_js_1.PacingEngineService.calcularMetricas(perfil, registros);
    }
}
exports.GetDashboardMetricsUseCase = GetDashboardMetricsUseCase;
//# sourceMappingURL=get-dashboard-metrics.use-case.js.map