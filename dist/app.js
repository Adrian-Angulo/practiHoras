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
const registros_routes_js_1 = __importDefault(require("./modules/registros/presentation/registros.routes.js"));
const createApp = () => {
    const app = (0, express_1.default)();
    // 1. Middlewares de Seguridad & Parsing
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: [env_config_js_1.ENV.CLIENT_ORIGIN, 'http://localhost:4200', 'http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // 2. Health check endpoint
    app.get('/api/health', (_req, res) => {
        res.status(200).json({
            status: 'UP',
            timestamp: new Date().toISOString(),
            environment: env_config_js_1.ENV.NODE_ENV,
            version: '1.0.0',
        });
    });
    // 3. Montar Módulos
    app.use('/api/v1/auth', auth_routes_js_1.default);
    app.use('/api/v1/registros', registros_routes_js_1.default);
    // 4. Fallback 404
    app.use((_req, res) => {
        res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'La ruta solicitada no existe en este servidor API.',
            },
        });
    });
    // 5. Middleware centralizado de errores
    app.use(error_middleware_js_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map