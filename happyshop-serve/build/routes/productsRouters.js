"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsCotroller_1 = __importDefault(require("../controller/productsCotroller"));
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productsCotroller_1.default.listar);
        this.router.get('/:id', productsCotroller_1.default.obtener);
        this.router.post('/', productsCotroller_1.default.create);
        this.router.put('/:id', productsCotroller_1.default.update);
        this.router.delete('/:id', productsCotroller_1.default.delete);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
