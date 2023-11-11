"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inferencia = void 0;
const dominio_1 = require("../../mundos/dominio");
;
;
;
class Inferencia {
    constructor() {
        this.dominio = new dominio_1.Dominio({});
        this.claveDominio = "inferencias";
        this.claveContexto = "contexto";
        this.claveEntrada = "parametros";
        this.claveSalida = "evaluacion";
    }
    configurar(b, d) {
        this.dominio = d;
    }
    async evaluar() {
        return this;
    }
    imprimir() {
        return " \n export class Inferencia implements IInferencia: \n" + JSON.stringify(this) + "\n";
    }
}
exports.Inferencia = Inferencia;
