"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const app_error_js_1 = require("../errors/app-error.js");
const zod_1 = require("zod");
const env_config_js_1 = require("../../config/env.config.js");
const errorHandler = (err, _req, res, _next) => {
    const timestamp = new Date().toISOString();
    // 1. Errores de validación de Zod
    if (err instanceof zod_1.ZodError) {
        const formattedErrors = err.errors.map((e) => ({
            campo: e.path.join('.'),
            mensaje: e.message,
        }));
        const firstMsg = err.errors[0]?.message || 'Error de validación en los datos enviados';
        res.status(400).json({
            statusCode: 400,
            error: 'Bad Request',
            message: firstMsg,
            success: false,
            detalles: formattedErrors,
            timestamp,
        });
        return;
    }
    // 2. Errores controlados de dominio / aplicación (AppError)
    if (err instanceof app_error_js_1.AppError) {
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            error: err.code,
            message: err.message,
            success: false,
            timestamp,
        });
        return;
    }
    // 3. Error 500 no controlado
    console.error('🔥 [Unhandled Server Error]:', err);
    res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Ocurrió un error inesperado en el servidor.',
        success: false,
        timestamp,
        ...(env_config_js_1.ENV.isDev ? { stack: err.stack } : {}),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map