"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const formulario_1 = require("../../nivel/formulario");
const ck_modelo_1 = require("../ck-modelo");
class Tarea extends ck_modelo_1.CKModelo {
    constructor() {
        super();
        this.formularios = [
            new formulario_1.Formulario("TM-1"),
            new formulario_1.Formulario("TM-2"),
        ];
    }
}
exports.Tarea = Tarea;
