"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personaController_1 = __importDefault(require("../controller/personaController"));
class PersonaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', personaController_1.default.listar);
        this.router.get('/:id', personaController_1.default.obtener);
        this.router.get('/ut/:id', personaController_1.default.obtenerTodoPersona);
        this.router.post('/', personaController_1.default.create);
        this.router.put('/:id', personaController_1.default.update);
        this.router.delete('/:id', personaController_1.default.delete);
    }
}
const personaRoutes = new PersonaRoutes();
exports.default = personaRoutes.router;
