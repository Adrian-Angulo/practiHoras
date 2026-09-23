"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricasController = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
const get_dashboard_metrics_use_case_js_1 = require("../application/get-dashboard-metrics.use-case.js");
class MetricasController {
    getDashboardMetricsUseCase;
    constructor(profileRepo, registrosRepo) {
        this.getDashboardMetricsUseCase = new get_dashboard_metrics_use_case_js_1.GetDashboardMetricsUseCase(profileRepo, registrosRepo);
    }
    getUserId(req) {
        if (!req.user?.id) {
            throw new app_error_js_1.UnauthorizedError('Usuario no autenticado');
        }
        return req.user.id;
    }
    getDashboardMetrics = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const metrics = await this.getDashboardMetricsUseCase.execute(userId);
            res.status(200).json(metrics);
        }
        catch (err) {
            next(err);
        }
    };
}
exports.MetricasController = MetricasController;
//# sourceMappingURL=metricas.controller.js.map