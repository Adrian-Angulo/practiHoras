import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
export declare const validateRequest: (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => Promise<void>;
