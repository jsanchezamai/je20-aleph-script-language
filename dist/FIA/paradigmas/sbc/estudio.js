"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estudio = void 0;
const modelo_1 = require("../../mundos/modelo");
class Estudio {
    constructor() {
        this.claveDominio = Estudio.claveDominio;
        this.modelo = new modelo_1.Modelo();
    }
    estudiar(f) {
        if (!Array.isArray(f.dominio.base[this.claveDominio])) {
            f.dominio.base[this.claveDominio] = [];
        }
        f.dominio.base[this.claveDominio].push(this.modelo);
        return this;
    }
}
exports.Estudio = Estudio;
Estudio.claveDominio = "sbc.estudio";
