"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emtrasnporController_1 = __importDefault(require("../controller/emtrasnporController"));
class EmpresaTransporteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', emtrasnporController_1.default.listar);
        this.router.get('/:id', emtrasnporController_1.default.obtener);
        this.router.post('/', emtrasnporController_1.default.create);
        this.router.put('/:id', emtrasnporController_1.default.update);
        this.router.delete('/:id', emtrasnporController_1.default.delete);
    }
}
const empresaTransporteRoutes = new EmpresaTransporteRoutes();
exports.default = empresaTransporteRoutes.router;
