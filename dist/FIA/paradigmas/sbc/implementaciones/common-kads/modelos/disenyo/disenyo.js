"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disenyo = void 0;
const estudio_1 = require("../../../../estudio");
const formulario_1 = require("../../nivel/formulario");
const ck_modelo_1 = require("../ck-modelo");
const aplicacion_1 = require("./aplicacion");
class Disenyo extends ck_modelo_1.CKModelo {
    constructor() {
        super();
        this.formularios = [
            new formulario_1.Formulario("DM-1"),
            new formulario_1.Formulario("DM-2"),
            new formulario_1.Formulario("DM-3"),
            new formulario_1.Formulario("DM-4"),
        ];
    }
    arquitectura(e) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo = e;
        this.formularios
            .forEach(formulario => estudio.estudiar(formulario));
        return this;
    }
    plataforma(e) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo = e;
        this.formularios
            .forEach(formulario => estudio.estudiar(formulario));
        return this;
    }
    componentes(e) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo = e;
        this.formularios
            .forEach(formulario => estudio.estudiar(formulario));
        return this;
    }
    aplicacion(e) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo = e;
        this.formularios
            .forEach(formulario => estudio.estudiar(formulario));
        const a = new aplicacion_1.Aplicacion();
        return a;
    }
}
exports.Disenyo = Disenyo;
