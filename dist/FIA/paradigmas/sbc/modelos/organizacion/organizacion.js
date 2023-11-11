"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organizacion = void 0;
const modelo_1 = require("../../../../mundos/modelo");
const formulario_1 = require("../../implementaciones/common-kads/nivel/formulario");
class Organizacion extends modelo_1.Modelo {
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
