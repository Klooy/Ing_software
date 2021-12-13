"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productsRouters_1 = __importDefault(require("./routes/productsRouters"));
const carritoRouters_1 = __importDefault(require("./routes/carritoRouters"));
const categoriaRouters_1 = __importDefault(require("./routes/categoriaRouters"));
const ciudadRouters_1 = __importDefault(require("./routes/ciudadRouters"));
const clientesRouters_1 = __importDefault(require("./routes/clientesRouters"));
const detallePedidoRouters_1 = __importDefault(require("./routes/detallePedidoRouters"));
const empresaTransporteRouters_1 = __importDefault(require("./routes/empresaTransporteRouters"));
const paisRouters_1 = __importDefault(require("./routes/paisRouters"));
const pedidoRouters_1 = __importDefault(require("./routes/pedidoRouters"));
const personaRouters_1 = __importDefault(require("./routes/personaRouters"));
const proveedorArticuloRouters_1 = __importDefault(require("./routes/proveedorArticuloRouters"));
const proveedorRouters_1 = __importDefault(require("./routes/proveedorRouters"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.router();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    router() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/productos', productsRouters_1.default);
        this.app.use('/api/carrito', carritoRouters_1.default);
        this.app.use('/api/categoria', categoriaRouters_1.default);
        this.app.use('/api/ciudad', ciudadRouters_1.default);
        this.app.use('/api/detallePedido', detallePedidoRouters_1.default);
        this.app.use('/api/empresaTransporte', empresaTransporteRouters_1.default);
        this.app.use('/api/pais', paisRouters_1.default);
        this.app.use('/api/pedido', pedidoRouters_1.default);
        this.app.use('/api/persona', personaRouters_1.default);
        this.app.use('/api/clientes', clientesRouters_1.default);
        this.app.use('/api/proveedorArticulo', proveedorArticuloRouters_1.default);
        this.app.use('/api/proveedor', proveedorRouters_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
