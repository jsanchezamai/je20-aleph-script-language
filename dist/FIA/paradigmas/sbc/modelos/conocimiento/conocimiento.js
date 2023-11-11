"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conocimiento = void 0;
const modelo_1 = require("../../../../mundos/modelo");
const cml_1 = require("../../implementaciones/common-kads/nivel/cml");
const formulario_1 = require("../../implementaciones/common-kads/nivel/formulario");
const uml_1 = require("./uml");
class Conocimiento extends modelo_1.Modelo {
    constructor() {
        super();
        this.cml = new cml_1.CML();
        this.uml = new uml_1.UML();
        this.formularios = [
            new formulario_1.Formulario("KM-1")
        ];
    }
}
exports.Conocimiento = Conocimiento;
