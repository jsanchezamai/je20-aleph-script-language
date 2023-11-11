"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formulario = void 0;
const dominio_1 = require("../../../../../mundos/dominio");
const estudio_1 = require("../../../estudio");
class Formulario {
    constructor(nombre = "F-01") {
        this.nombre = nombre;
        this.dominio = new dominio_1.Dominio({});
    }
    ;
    rellenar(d) {
        this.dominio = d;
    }
    imprimir() {
        const estado = this.dominio
            .base[estudio_1.Estudio.claveDominio]
            .map(m => m.nombre)
            .join(" - ");
        return `${this.nombre}:[${estado}]`;
    }
}
exports.Formulario = Formulario;
