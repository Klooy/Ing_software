"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = __importDefault(require("../controller/categoriaController"));
class CategoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', categoriaController_1.default.listar);
        this.router.get('/:id', categoriaController_1.default.obtener);
        this.router.post('/', categoriaController_1.default.create);
        this.router.put('/:id', categoriaController_1.default.update);
        this.router.delete('/:id', categoriaController_1.default.delete);
    }
}
const categoriaRoutes = new CategoriaRoutes();
exports.default = categoriaRoutes.router;
