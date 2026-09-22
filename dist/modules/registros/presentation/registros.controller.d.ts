import { Request, Response, NextFunction } from 'express';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
export declare class RegistrosController {
    private readonly registrosRepo;
    constructor(registrosRepo: IRegistrosRepository);
    private getUserId;
    crear: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    listar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    obtenerPorId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    actualizar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    eliminar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    obtenerKpis: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    obtenerRendimientoSemanal: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
