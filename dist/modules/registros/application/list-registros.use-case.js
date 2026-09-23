"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRegistrosUseCase = void 0;
class ListRegistrosUseCase {
    registrosRepo;
    constructor(registrosRepo) {
        this.registrosRepo = registrosRepo;
    }
    async execute(userId, filtros) {
        return await this.registrosRepo.listar(userId, filtros);
    }
}
exports.ListRegistrosUseCase = ListRegistrosUseCase;
//# sourceMappingURL=list-registros.use-case.js.map