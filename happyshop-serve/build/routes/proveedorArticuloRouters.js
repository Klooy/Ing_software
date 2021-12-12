"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveArtiController_1 = __importDefault(require("../controller/proveArtiController"));
class ProveedorArticuloRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', proveArtiController_1.default.listar);
        this.router.get('/:id', proveArtiController_1.default.obtener);
        this.router.post('/', proveArtiController_1.default.create);
        this.router.put('/:id', proveArtiController_1.default.update);
        this.router.delete('/:id', proveArtiController_1.default.delete);
    }
}
const proveedorArticuloRoutes = new ProveedorArticuloRoutes();
exports.default = proveedorArticuloRoutes.router;
