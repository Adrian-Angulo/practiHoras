import { createApp } from './app.js';
import { ENV } from './config/env.config.js';

const startServer = () => {
  const app = createApp();

  const server = app.listen(ENV.PORT, () => {
    console.log('====================================================');
    console.log(`🚀 [PractiHoras Backend] Servidor activo`);
    console.log(`📍 URL: http://localhost:${ENV.PORT}`);
    console.log(`🏥 Health Check: http://localhost:${ENV.PORT}/api/health`);
    console.log(`🔐 Auth API: http://localhost:${ENV.PORT}/api/v1/auth`);
    console.log(`🌍 Entorno: ${ENV.NODE_ENV}`);
    console.log('====================================================');
  });

  const handleShutdown = (signal: string) => {
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
