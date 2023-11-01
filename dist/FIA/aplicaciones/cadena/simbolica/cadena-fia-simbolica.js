"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaFIASimbolica = exports.TOPE_POSICION = void 0;
const genesis_block_1 = require("../../../genesis-block");
const labels_1 = require("../../../i18/labels");
const thread_1 = require("../../../thread");
// export namespace IASituada {
exports.TOPE_POSICION = 9;
class CadenaFIASimbolica extends genesis_block_1.GenesisBlock {
    constructor() {
        super(...arguments);
        this.runAsync = true;
        this.nombre = labels_1.i18.APPS.CADENA.SIMBOLICA.NOMBRE;
    }
    async instanciar() {
        console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.APPS.CADENA.SIMBOLICA.SIMULATION_START));
        console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMULATION_BODY}:${this.modelo}`));
        return `${labels_1.i18.APPS.CADENA.SIMBOLICA.SIMULATION_END}`;
    }
}
exports.CadenaFIASimbolica = CadenaFIASimbolica;
// }
