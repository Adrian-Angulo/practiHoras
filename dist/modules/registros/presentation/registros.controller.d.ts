import { Request, Response, NextFunction } from 'express';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';
export declare class RegistrosController {
    private readonly registrosRepo;
    private readonly profileRepo;
    private readonly createUseCase;
    private readonly listUseCase;
    private readonly getByIdUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    private readonly exportCsvUseCase;
    constructor(registrosRepo: IRegistrosRepository, profileRepo: IProfileRepository);
    private getUserId;
    crear: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    listar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    obtenerPorId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    actualizar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    eliminar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    exportarCsv: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
