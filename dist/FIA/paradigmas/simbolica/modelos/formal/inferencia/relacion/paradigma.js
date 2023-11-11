"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InferenciaRelacion = void 0;
const dominio_1 = require("../../../../../../mundos/dominio");
const inferencia_1 = require("../../../../inferencia");
const regla_1 = require("../../sistema/semantica/regla");
class InferenciaRelacion extends inferencia_1.Inferencia {
    constructor() {
        super();
        this.claveDominio = "inferencias_relacion";
        this.dominio = new dominio_1.Dominio({});
        this.dominio.base[this.claveDominio] = {};
    }
    configurar(g, parametros) {
        this.configurarV2([], regla_1.TecnicasInferenciaRed.equiparacion, g, parametros);
    }
    configurarV2(entidades, tipo, raiz, parametros) {
        this.tipo = tipo;
        this.dominio.base[this.claveDominio][this.claveEntrada] = parametros;
        this.dominio.base[this.claveDominio][this.claveContexto] = {
            entidades,
            raiz
        };
    }
    activar() {
        return {
            parametros: this.dominio.base[this.claveDominio][this.claveEntrada].base,
            contexto: this.dominio.base[this.claveDominio][this.claveContexto]
        };
    }
    async evaluar() {
        return this;
    }
    imprimir() {
        return JSON.stringify(Object.keys(this.dominio.base[this.claveDominio][this.claveEntrada].base).join(" - "), null, "\t");
    }
}
exports.InferenciaRelacion = InferenciaRelacion;
