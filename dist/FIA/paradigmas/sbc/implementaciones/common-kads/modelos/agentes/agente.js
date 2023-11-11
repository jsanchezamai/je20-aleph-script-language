"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agente = void 0;
const formulario_1 = require("../../nivel/formulario");
const ck_modelo_1 = require("../ck-modelo");
class Agente extends ck_modelo_1.CKModelo {
    constructor() {
        super();
        this.formularios = [
            new formulario_1.Formulario("AM-1"),
        ];
    }
}
exports.Agente = Agente;
