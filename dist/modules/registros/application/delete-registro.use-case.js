"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRegistroUseCase = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
class DeleteRegistroUseCase {
    registrosRepo;
    constructor(registrosRepo) {
        this.registrosRepo = registrosRepo;
    }
    async execute(userId, id) {
        const existing = await this.registrosRepo.obtenerPorId(userId, id);
        if (!existing) {
            throw new app_error_js_1.NotFoundError('El registro de jornada a eliminar no existe.');
        }
        return await this.registrosRepo.eliminar(userId, id);
    }
}
exports.DeleteRegistroUseCase = DeleteRegistroUseCase;
//# sourceMappingURL=delete-registro.use-case.js.map