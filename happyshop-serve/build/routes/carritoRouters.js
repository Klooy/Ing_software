"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoController_1 = __importDefault(require("../controller/carritoController"));
class ArticuloPedidoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', carritoController_1.default.listar);
        this.router.get('/:id', carritoController_1.default.obtener);
        this.router.get('/count/:id', carritoController_1.default.contador);
        this.router.post('/', carritoController_1.default.create);
        this.router.put('/:id', carritoController_1.default.update);
        this.router.delete('/:id', carritoController_1.default.delete);
        this.router.delete('/dtc/:id', carritoController_1.default.deleteTodoCarrito);
    }
}
const articuloPedidoRoutes = new ArticuloPedidoRoutes();
exports.default = articuloPedidoRoutes.router;
