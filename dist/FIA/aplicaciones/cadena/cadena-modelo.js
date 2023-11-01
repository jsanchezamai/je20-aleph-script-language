"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaModelo = void 0;
const paradigma_1 = require("../../mundos/paradigma");
class CadenaModelo extends paradigma_1.Modelo {
    constructor() {
        super(...arguments);
        this.nombre = "Cadena de producción";
        this.posicion = 0;
    }
}
exports.CadenaModelo = CadenaModelo;
