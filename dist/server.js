"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const env_config_js_1 = require("./config/env.config.js");
const startServer = () => {
    const app = (0, app_js_1.createApp)();
    const server = app.listen(env_config_js_1.ENV.PORT, () => {
        console.log('====================================================');
        console.log(`🚀 [PractiHoras Backend] Servidor activo`);
        console.log(`📍 URL: http://localhost:${env_config_js_1.ENV.PORT}`);
        console.log(`🏥 Health Check: http://localhost:${env_config_js_1.ENV.PORT}/api/health`);
        console.log(`🔐 Auth API: http://localhost:${env_config_js_1.ENV.PORT}/api/v1/auth`);
        console.log(`🌍 Entorno: ${env_config_js_1.ENV.NODE_ENV}`);
        console.log('====================================================');
    });
    const handleShutdown = (signal) => {
        console.log(`\n🛑 Recibida señal ${signal}. Cerrando servidor graceful...`);
        server.close(() => {
            console.log('✅ Servidor cerrado correctamente.');
            process.exit(0);
        });
    };
    process.on('SIGINT', () => handleShutdown('SIGINT'));
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
};
startServer();
//# sourceMappingURL=server.js.map