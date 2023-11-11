"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disenyo = void 0;
const modelo_1 = require("../../../../mundos/modelo");
const estudio_1 = require("../../estudio");
const formulario_1 = require("../../implementaciones/common-kads/nivel/formulario");
const aplicacion_1 = require("./aplicacion");
class Disenyo extends modelo_1.Modelo {
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
        return Object.assign(new aplicacion_1.Aplicacion(), this);
    }
}
exports.Disenyo = Disenyo;
