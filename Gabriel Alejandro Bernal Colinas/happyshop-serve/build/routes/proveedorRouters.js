"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedorControler_1 = __importDefault(require("../controller/proveedorControler"));
class ProveedorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', proveedorControler_1.default.listar);
        this.router.get('/:id', proveedorControler_1.default.obtener);
        this.router.post('/', proveedorControler_1.default.create);
        this.router.put('/:id', proveedorControler_1.default.update);
        this.router.delete('/:id', proveedorControler_1.default.delete);
    }
}
const proveedorRoutes = new ProveedorRoutes();
exports.default = proveedorRoutes.router;
