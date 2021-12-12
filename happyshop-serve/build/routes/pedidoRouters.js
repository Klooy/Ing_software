"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoController_1 = __importDefault(require("../controller/pedidoController"));
class PedidoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pedidoController_1.default.listar);
        this.router.get('/:id', pedidoController_1.default.obtener);
        this.router.post('/', pedidoController_1.default.create);
        this.router.put('/:id', pedidoController_1.default.update);
        this.router.delete('/:id', pedidoController_1.default.delete);
    }
}
const pedidoRoutes = new PedidoRoutes();
exports.default = pedidoRoutes.router;
