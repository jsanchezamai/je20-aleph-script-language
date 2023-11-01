"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaFIAConexionista = exports.TOPE_POSICION = void 0;
const labels_1 = require("../../../i18/labels");
const thread_1 = require("../../../thread");
const paradigma_1 = require("../../../paradigmas/conexionista/paradigma");
// export namespace IASituada {
exports.TOPE_POSICION = 9;
class CadenaFIAConexionista extends paradigma_1.IAConexionista {
    constructor() {
        super(...arguments);
        this.modelo = new paradigma_1.RedNeuronalArtificial();
        this.runAsync = true;
        this.nombre = labels_1.i18.APPS.CADENA.CONEXIONISTA.NOMBRE;
    }
    async instanciar() {
        console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.APPS.CADENA.CONEXIONISTA.SIMULATION_START));
        console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMULATION_BODY}:${this.modelo}`));
        return `${labels_1.i18.APPS.CADENA.CONEXIONISTA.SIMULATION_END}`;
    }
}
exports.CadenaFIAConexionista = CadenaFIAConexionista;
// }
