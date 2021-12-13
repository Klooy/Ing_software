"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paisController_1 = __importDefault(require("../controller/paisController"));
class PaisRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', paisController_1.default.listar);
        this.router.get('/:id', paisController_1.default.obtener);
        this.router.post('/', paisController_1.default.create);
        this.router.put('/:id', paisController_1.default.update);
        this.router.delete('/:id', paisController_1.default.delete);
    }
}
const paisRoutes = new PaisRoutes();
exports.default = paisRoutes.router;
