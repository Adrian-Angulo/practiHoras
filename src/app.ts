import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env.config.js';
import { errorHandler } from './core/middlewares/error.middleware.js';
import authRoutes from './modules/auth/presentation/auth.routes.js';
import profileRoutes from './modules/profile/presentation/profile.routes.js';
import registrosRoutes from './modules/registros/presentation/registros.routes.js';
import metricasRoutes from './modules/metricas/presentation/metricas.routes.js';
import syncRoutes from './modules/sync/presentation/sync.routes.js';

export const createApp = (): Express => {
  const app = express();

  // 1. Middlewares de Seguridad & Parsing
  app.use(helmet());
  app.use(
    cors({
      origin: (_origin, callback) => {
        // Permitir peticiones desde apps móviles (sin origin) y orígenes autorizados
        callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 2. Root & Health check endpoints
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      name: 'PractiHoras Backend API',
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

  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      environment: ENV.NODE_ENV,
      version: '1.1.0',
    });
  });

  // 3. Montar Módulos de la API
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/profile', profileRoutes);
  app.use('/api/v1/registros', registrosRoutes);
  app.use('/api/v1/metricas', metricasRoutes);
  app.use('/api/v1/sync', syncRoutes);

  // 4. Fallback 404
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      statusCode: 400,
      error: 'Not Found',
      message: 'La ruta solicitada no existe en este servidor API.',
      timestamp: new Date().toISOString(),
    });
  });

  // 5. Middleware centralizado de errores
  app.use(errorHandler);

  return app;
};
