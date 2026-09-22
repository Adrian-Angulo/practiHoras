import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env.config.js';
import { errorHandler } from './core/middlewares/error.middleware.js';
import authRoutes from './modules/auth/presentation/auth.routes.js';
import registrosRoutes from './modules/registros/presentation/registros.routes.js';

export const createApp = (): Express => {
  const app = express();

  // 1. Middlewares de Seguridad & Parsing
  app.use(helmet());
  app.use(
    cors({
      origin: [ENV.CLIENT_ORIGIN, 'http://localhost:4200', 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 2. Root & Health check endpoints
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      name: 'PractiHoras Backend API',
      status: 'ONLINE',
      frontendUrl: 'http://localhost:4200',
      description: 'API REST conectada con Supabase para la gestión de prácticas pre-profesionales.',
      endpoints: {
        health: '/api/health',
        auth: '/api/v1/auth',
        registros: '/api/v1/registros',
      },
    });
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      environment: ENV.NODE_ENV,
      version: '1.0.0',
    });
  });

  // 3. Montar Módulos
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/registros', registrosRoutes);

  // 4. Fallback 404
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'La ruta solicitada no existe en este servidor API.',
      },
    });
  });

  // 5. Middleware centralizado de errores
  app.use(errorHandler);

  return app;
};
