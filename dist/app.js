"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const env_config_js_1 = require("./config/env.config.js");
const error_middleware_js_1 = require("./core/middlewares/error.middleware.js");
const auth_routes_js_1 = __importDefault(require("./modules/auth/presentation/auth.routes.js"));
const profile_routes_js_1 = __importDefault(require("./modules/profile/presentation/profile.routes.js"));
const registros_routes_js_1 = __importDefault(require("./modules/registros/presentation/registros.routes.js"));
const metricas_routes_js_1 = __importDefault(require("./modules/metricas/presentation/metricas.routes.js"));
const sync_routes_js_1 = __importDefault(require("./modules/sync/presentation/sync.routes.js"));
const createApp = () => {
    const app = (0, express_1.default)();
    // 1. Middlewares de Seguridad & Parsing
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: (_origin, callback) => {
            // Permitir peticiones desde apps móviles (sin origin) y orígenes autorizados
            callback(null, true);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    // 2. Root & Health check endpoints
    app.get('/', (_req, res) => {
        res.status(200).json({
            name: 'Horaly Backend API',
            status: 'ONLINE',
            architecture: 'Clean Architecture & SOLID',
            description: 'API REST compatible con Frontend Web y Frontend Móvil (Flutter)',
            endpoints: {
                health: '/api/health',
                auth: '/api/v1/auth',
                profile: '/api/v1/profile',
                registros: '/api/v1/registros',
                metricas: '/api/v1/metricas/dashboard',
                sync: '/api/v1/sync/batch',
                exportCsv: '/api/v1/registros/export/csv',
            },
        });
    });
    app.get('/api/health', (_req, res) => {
        res.status(200).json({
            status: 'UP',
            timestamp: new Date().toISOString(),
            environment: env_config_js_1.ENV.NODE_ENV,
            version: '1.1.0',
        });
    });
    // 3. Montar Módulos de la API
    app.use('/api/v1/auth', auth_routes_js_1.default);
    app.use('/api/v1/profile', profile_routes_js_1.default);
    app.use('/api/v1/registros', registros_routes_js_1.default);
    app.use('/api/v1/metricas', metricas_routes_js_1.default);
    app.use('/api/v1/sync', sync_routes_js_1.default);
    // 4. Fallback 404
    app.use((_req, res) => {
        res.status(404).json({
            statusCode: 400,
            error: 'Not Found',
            message: 'La ruta solicitada no existe en este servidor API.',
            timestamp: new Date().toISOString(),
        });
    });
    // 5. Middleware centralizado de errores
    app.use(error_middleware_js_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map