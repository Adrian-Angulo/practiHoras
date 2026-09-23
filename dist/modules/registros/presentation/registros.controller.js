"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrosController = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
const create_registro_use_case_js_1 = require("../application/create-registro.use-case.js");
const list_registros_use_case_js_1 = require("../application/list-registros.use-case.js");
const get_registro_by_id_use_case_js_1 = require("../application/get-registro-by-id.use-case.js");
const update_registro_use_case_js_1 = require("../application/update-registro.use-case.js");
const delete_registro_use_case_js_1 = require("../application/delete-registro.use-case.js");
const export_csv_use_case_js_1 = require("../application/export-csv.use-case.js");
class RegistrosController {
    registrosRepo;
    profileRepo;
    createUseCase;
    listUseCase;
    getByIdUseCase;
    updateUseCase;
    deleteUseCase;
    exportCsvUseCase;
    constructor(registrosRepo, profileRepo) {
        this.registrosRepo = registrosRepo;
        this.profileRepo = profileRepo;
        this.createUseCase = new create_registro_use_case_js_1.CreateRegistroUseCase(registrosRepo);
        this.listUseCase = new list_registros_use_case_js_1.ListRegistrosUseCase(registrosRepo);
        this.getByIdUseCase = new get_registro_by_id_use_case_js_1.GetRegistroByIdUseCase(registrosRepo);
        this.updateUseCase = new update_registro_use_case_js_1.UpdateRegistroUseCase(registrosRepo);
        this.deleteUseCase = new delete_registro_use_case_js_1.DeleteRegistroUseCase(registrosRepo);
        this.exportCsvUseCase = new export_csv_use_case_js_1.ExportCsvUseCase(registrosRepo, profileRepo);
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
            const registro = await this.createUseCase.execute(userId, input);
            res.status(201).json(registro);
        }
        catch (err) {
            next(err);
        }
    };
    listar = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const query = req.query;
            const registros = await this.listUseCase.execute(userId, query);
            res.status(200).json(registros);
        }
        catch (err) {
            next(err);
        }
    };
    obtenerPorId = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const { id } = req.params;
            const registro = await this.getByIdUseCase.execute(userId, id);
            res.status(200).json(registro);
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
            const actualizado = await this.updateUseCase.execute(userId, id, input);
            res.status(200).json(actualizado);
        }
        catch (err) {
            next(err);
        }
    };
    eliminar = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const { id } = req.params;
            await this.deleteUseCase.execute(userId, id);
            res.status(200).json({
                message: 'Registro eliminado con éxito',
            });
        }
        catch (err) {
            next(err);
        }
    };
    exportarCsv = async (req, res, next) => {
        try {
            const userId = this.getUserId(req);
            const csvContent = await this.exportCsvUseCase.execute(userId);
            const filename = `practihoras-reporte-${new Date().toISOString().split('T')[0]}.csv`;
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.status(200).send(csvContent);
        }
        catch (err) {
            next(err);
        }
    };
}
exports.RegistrosController = RegistrosController;
//# sourceMappingURL=registros.controller.js.map