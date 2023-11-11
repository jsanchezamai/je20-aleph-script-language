"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agente = void 0;
const modelo_1 = require("../../../../mundos/modelo");
const formulario_1 = require("../../implementaciones/common-kads/nivel/formulario");
class Agente extends modelo_1.Modelo {
    constructor() {
        super();
        this.formularios = [
            new formulario_1.Formulario("AM-1"),
        ];
    }
}
exports.Agente = Agente;
