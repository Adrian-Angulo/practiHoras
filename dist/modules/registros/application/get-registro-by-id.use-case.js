"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRegistroByIdUseCase = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
class GetRegistroByIdUseCase {
    registrosRepo;
    constructor(registrosRepo) {
        this.registrosRepo = registrosRepo;
    }
    async execute(userId, id) {
        const registro = await this.registrosRepo.obtenerPorId(userId, id);
        if (!registro) {
            throw new app_error_js_1.NotFoundError('El registro de jornada solicitado no existe.');
        }
        return registro;
    }
}
exports.GetRegistroByIdUseCase = GetRegistroByIdUseCase;
//# sourceMappingURL=get-registro-by-id.use-case.js.map