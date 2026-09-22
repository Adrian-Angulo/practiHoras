"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const app_error_js_1 = require("../errors/app-error.js");
const zod_1 = require("zod");
const env_config_js_1 = require("../../config/env.config.js");
const errorHandler = (err, _req, res, _next) => {
    // Manejo de errores de validación de Zod
    if (err instanceof zod_1.ZodError) {
        const formattedErrors = err.errors.map((e) => ({
            campo: e.path.join('.'),
            mensaje: e.message,
        }));
        res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Los datos enviados no cumplen con el formato requerido.',
                detalles: formattedErrors,
            },
        });
        return;
    }
    // Manejo de errores controlados de la aplicación (AppError)
    if (err instanceof app_error_js_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
            },
        });
        return;
    }
    // Error 500 no controlado
    console.error('🔥 [Unhandled Server Error]:', err);
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Ocurrió un error inesperado en el servidor.',
            ...(env_config_js_1.ENV.isDev ? { stack: err.stack } : {}),
        },
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map