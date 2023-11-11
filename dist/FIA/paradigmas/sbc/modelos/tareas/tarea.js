"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const modelo_1 = require("../../../../mundos/modelo");
const formulario_1 = require("../../implementaciones/common-kads/nivel/formulario");
class Tarea extends modelo_1.Modelo {
    constructor() {
        super();
        this.formularios = [
            new formulario_1.Formulario("TM-1"),
            new formulario_1.Formulario("TM-2"),
        ];
    }
}
exports.Tarea = Tarea;
