"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Valoracion = exports.CKNivelConceptual = void 0;
const comunicacion_1 = require("../modelos/comunicacion/comunicacion");
const conocimiento_1 = require("../modelos/conocimiento/conocimiento");
const estudio_1 = require("../../../estudio");
class CKNivelConceptual {
    constructor() {
        this.conocimiento = new conocimiento_1.Conocimiento();
        this.comunicacion = new comunicacion_1.Comunicacion();
    }
    formularios() {
        return [
            ...this.conocimiento.formularios,
            ...this.comunicacion.formularios
        ];
    }
    modeloConocimiento(ota1) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo.dominio.base = {
            uml: this.conocimiento.uml.modelar(ota1),
            cml: this.conocimiento.cml.modelar(ota1)
        };
        this.conocimiento
            .formularios
            .forEach(formulario => estudio.estudiar(formulario));
        return {
            conocimiento: this.conocimiento,
            ...estudio.modelo.dominio.base
        };
    }
    modeloComunicaciones(mc) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo.dominio.base = {
            plan: this.comunicacion.planificar(mc),
            transacciones: this.comunicacion.transacciones(mc),
            intercambio: this.comunicacion.intercambioInformacion(mc)
        };
        this.comunicacion
            .formularios
            .forEach(formulario => estudio.estudiar(formulario));
        return {
            comunicacion: this.comunicacion,
            ...estudio.modelo.dominio.base
        };
    }
}
exports.CKNivelConceptual = CKNivelConceptual;
class Valoracion {
}
exports.Valoracion = Valoracion;
