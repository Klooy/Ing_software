"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ciudadController_1 = __importDefault(require("../controller/ciudadController"));
class CiudadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ciudadController_1.default.listar);
        this.router.get('/:id', ciudadController_1.default.obtener);
        this.router.post('/', ciudadController_1.default.create);
        this.router.put('/:id', ciudadController_1.default.update);
        this.router.delete('/:id', ciudadController_1.default.delete);
    }
}
const ciudadRoutes = new CiudadRoutes();
exports.default = ciudadRoutes.router;
