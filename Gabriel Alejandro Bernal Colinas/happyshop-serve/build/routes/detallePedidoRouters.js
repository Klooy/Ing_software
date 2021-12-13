"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallePedidoController_1 = __importDefault(require("../controller/detallePedidoController"));
class DetallePedidoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', detallePedidoController_1.default.listar);
        this.router.get('/:id', detallePedidoController_1.default.obtener);
        this.router.post('/', detallePedidoController_1.default.create);
        this.router.put('/:id', detallePedidoController_1.default.update);
        this.router.delete('/:id', detallePedidoController_1.default.delete);
    }
}
const detallePedidoRoutes = new DetallePedidoRoutes();
exports.default = detallePedidoRoutes.router;
