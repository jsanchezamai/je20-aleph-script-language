"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaMundo = void 0;
const aleph_script_i18_1 = require("../../../i18/aleph-script-i18");
const mundo_1 = require("../../../mundos/mundo");
const agentMessage_1 = require("../../../agentMessage");
class CadenaMundo extends mundo_1.Mundo {
    agregarAferencia(o) {
        const s = o.subscribe(m => {
            console.log("Imprimir the cadena mundo");
            this.modelo = m.modelo;
            console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.MUNDO.AFERENCIA.RECEPCION_LABEL), this.modelo.imprimir());
        });
        this.aferencias.push(s);
    }
}
exports.CadenaMundo = CadenaMundo;
