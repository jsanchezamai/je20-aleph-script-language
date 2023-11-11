"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conocimiento = void 0;
const cml_1 = require("../../nivel/cml");
const formulario_1 = require("../../nivel/formulario");
const ck_modelo_1 = require("../ck-modelo");
const uml_1 = require("./uml");
class Conocimiento extends ck_modelo_1.CKModelo {
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
