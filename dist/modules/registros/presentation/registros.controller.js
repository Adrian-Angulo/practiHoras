"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrosController = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
class RegistrosController {
    registrosRepo;
    constructor(registrosRepo) {
        this.registrosRepo = registrosRepo;
    }
    getUserId(req) {
        if (!req.user?.id) {
            throw new app_error_js_1.UnauthorizedError('Usuario no autenticado');
        }
        return req.user.id;
    }
    crear = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const input = req.body;
            const registro = await this.registrosRepo.crear(userId, input);
            res.status(201).json({
                success: true,
                message: 'Jornada registrada exitosamente en Supabase',
                data: registro,
            });
        }
        catch (err) {
            next(err);
        }
    };
    listar = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const limite = req.query.limite ? parseInt(req.query.limite, 10) : undefined;
            const registros = await this.registrosRepo.listar(userId, limite);
            res.status(200).json({
                success: true,
                data: registros,
            });
        }
        catch (err) {
            next(err);
        }
    };
    obtenerPorId = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const { id } = req.params;
            const registro = await this.registrosRepo.obtenerPorId(userId, id);
            if (!registro) {
                res.status(404).json({
                    success: false,
                    error: { code: 'NOT_FOUND', message: 'Registro no encontrado' },
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: registro,
            });
        }
        catch (err) {
            next(err);
        }
    };
    actualizar = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const { id } = req.params;
            const input = req.body;
            const actualizado = await this.registrosRepo.actualizar(userId, id, input);
            res.status(200).json({
                success: true,
                message: 'Jornada actualizada exitosamente',
                data: actualizado,
            });
        }
        catch (err) {
            next(err);
        }
    };
    eliminar = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const { id } = req.params;
            await this.registrosRepo.eliminar(userId, id);
            res.status(200).json({
                success: true,
                message: 'Jornada eliminada exitosamente',
            });
        }
        catch (err) {
            next(err);
        }
    };
    obtenerKpis = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const kpis = await this.registrosRepo.obtenerKpis(userId);
            res.status(200).json({
                success: true,
                data: kpis,
            });
        }
        catch (err) {
            next(err);
        }
    };
    obtenerRendimientoSemanal = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const rendimiento = await this.registrosRepo.obtenerRendimientoSemanal(userId);
            res.status(200).json({
                success: true,
                data: rendimiento,
            });
        }
        catch (err) {
            next(err);
        }
    };
}
exports.RegistrosController = RegistrosController;
//# sourceMappingURL=registros.controller.js.map