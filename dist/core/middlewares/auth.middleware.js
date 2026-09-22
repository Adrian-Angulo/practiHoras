"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const app_error_js_1 = require("../errors/app-error.js");
const supabase_config_js_1 = require("../../config/supabase.config.js");
const requireAuth = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new app_error_js_1.UnauthorizedError('Token de autorización no proporcionado o formato inválido');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new app_error_js_1.UnauthorizedError('Token no encontrado en la cabecera');
        }
        const supabase = (0, supabase_config_js_1.getSupabaseAdmin)();
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) {
            throw new app_error_js_1.UnauthorizedError('Token inválido o expirado. Por favor inicia sesión nuevamente');
        }
        req.user = {
            id: data.user.id,
            email: data.user.email || '',
            role: data.user.role,
        };
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.middleware.js.map