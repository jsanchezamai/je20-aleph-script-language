"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organizacion = void 0;
const formulario_1 = require("../../nivel/formulario");
const ck_modelo_1 = require("../ck-modelo");
class Organizacion extends ck_modelo_1.CKModelo {
    constructor() {
        super();
        this.formularios = [
            new formulario_1.Formulario("OM-1"),
            new formulario_1.Formulario("OM-2"),
            new formulario_1.Formulario("OM-3"),
            new formulario_1.Formulario("OM-4"),
            new formulario_1.Formulario("OM-5"),
        ];
    }
}
exports.Organizacion = Organizacion;
