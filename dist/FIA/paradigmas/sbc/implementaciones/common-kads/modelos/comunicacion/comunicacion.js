"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comunicacion = void 0;
const estudio_1 = require("../../../../estudio");
const formulario_1 = require("../../nivel/formulario");
const ck_modelo_1 = require("../ck-modelo");
class Comunicacion extends ck_modelo_1.CKModelo {
    constructor() {
        super();
        this.formularios = [
            new formulario_1.Formulario("CM-1"),
            new formulario_1.Formulario("CM-2")
        ];
    }
    planificar(mc) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo = mc;
        this.formularios
            .forEach(formulario => estudio.estudiar(formulario));
        return this;
    }
    transacciones(mc) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo = mc;
        this.formularios
            .forEach(formulario => estudio.estudiar(formulario));
        return [this];
    }
    intercambioInformacion(mc) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo = mc;
        this.formularios
            .forEach(formulario => estudio.estudiar(formulario));
        return [this];
    }
}
exports.Comunicacion = Comunicacion;
