"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaFIASimbolica = exports.TOPE_POSICION = void 0;
const aleph_script_i18_1 = require("../../../i18/aleph-script-i18");
const agentMessage_1 = require("../../../agentMessage");
const fia_simbolica_1 = require("../../../paradigmas/simbolica/fia-simbolica");
// export namespace IASituada {
exports.TOPE_POSICION = 9;
class CadenaFIASimbolica extends fia_simbolica_1.FIASimbolica {
    constructor() {
        super(...arguments);
        this.runAsync = true;
        this.nombre = aleph_script_i18_1.i18.APPS.CADENA.SIMBOLICA.NOMBRE;
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.APPS.CADENA.SIMBOLICA.SIMULATION_START));
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.APPS.CADENA.SIMULATION_BODY}:${this.modelo}`));
        return `${aleph_script_i18_1.i18.APPS.CADENA.SIMBOLICA.SIMULATION_END}`;
    }
}
exports.CadenaFIASimbolica = CadenaFIASimbolica;
// }
