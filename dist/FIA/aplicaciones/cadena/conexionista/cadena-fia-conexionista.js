"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaFIAConexionista = exports.TOPE_POSICION = void 0;
const aleph_script_i18_1 = require("../../../i18/aleph-script-i18");
const agentMessage_1 = require("../../../agentMessage");
const red_neuronal_1 = require("../../../paradigmas/conexionista/red-neuronal");
const fia_conexionista_1 = require("../../../paradigmas/conexionista/fia-conexionista");
// export namespace IASituada {
exports.TOPE_POSICION = 9;
class CadenaFIAConexionista extends fia_conexionista_1.FIAConexionista {
    constructor() {
        super(...arguments);
        this.modelo = new red_neuronal_1.RedNeuronalArtificial();
        this.runAsync = true;
        this.nombre = aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.NOMBRE;
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.SIMULATION_START));
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.APPS.CADENA.SIMULATION_BODY}:${this.modelo}`));
        return `${aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.SIMULATION_END}`;
    }
}
exports.CadenaFIAConexionista = CadenaFIAConexionista;
// }
