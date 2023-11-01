"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IASimbolica = exports.MotorInferencia = exports.Inferencia = exports.Dominio = void 0;
const genesis_block_1 = require("../../genesis-block");
const labels_1 = require("../../i18/labels");
class Dominio {
    constructor(base) {
        this.base = base;
    }
}
exports.Dominio = Dominio;
;
;
;
class Inferencia {
    constructor() {
        this.dominio = new Dominio({});
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
}
exports.Inferencia = Inferencia;
class MotorInferencia {
    constructor() {
        this.reglas = [];
    }
    arrancar(log) {
        this.reglas.forEach(regla => {
            const inferencia = regla.evaluar();
            log(inferencia);
        });
    }
    trasDetenerse(log) {
        log("MotorInferencia.Detenido");
    }
}
exports.MotorInferencia = MotorInferencia;
class IASimbolica extends genesis_block_1.GenesisBlock {
}
exports.IASimbolica = IASimbolica;
(function (IASimbolica) {
    IASimbolica.fiaSimbolica = new IASimbolica();
    IASimbolica.fiaSimbolica.nombre = labels_1.i18.FIA_SIMBOLICA_LABEL;
    IASimbolica.fiaSimbolica.razona =
        (m, i) => {
            return "No";
        };
})(IASimbolica || (exports.IASimbolica = IASimbolica = {}));
