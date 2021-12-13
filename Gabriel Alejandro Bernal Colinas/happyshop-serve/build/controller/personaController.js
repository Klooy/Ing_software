"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PersonaController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = yield database_1.default.query('SELECT * FROM Persona', (error, result) => {
                if (error)
                    throw error;
                if (result.length === 0) {
                    res.json({ message: "La Persona no existe" });
                }
                else {
                    res.json(result);
                }
            });
        });
    }
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resul = yield database_1.default.query('SELECT idPersona, email, contrasena, tipoCuenta FROM Persona WHERE email = ?', [id], (error, result) => {
                if (error)
                    throw error;
                if (result.length === 0) {
                    res.json({ message: "La Persona no existe" });
                }
                else {
                    res.json(result);
                }
            });
        });
    }
    obtenerTodoPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resul = yield database_1.default.query('SELECT * FROM Persona WHERE email = ?', [id], (error, result) => {
                if (error)
                    throw error;
                if (result.length === 0) {
                    res.json({ message: "La Persona no existe" });
                }
                else {
                    res.json(result);
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO Persona set ?', [req.body]);
            res.json({ message: 'datos guardados' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE Persona set ? WHERE idPersona = ?', [req.body, id]);
            res.json({ message: 'Actualizado con exito' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM Persona WHERE idPersona = ?', [id]);
            res.json({ menssage: 'Persona eliminada' });
        });
    }
}
const personaController = new PersonaController();
exports.default = personaController;
