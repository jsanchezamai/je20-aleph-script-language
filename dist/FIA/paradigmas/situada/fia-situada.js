"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIASituada = void 0;
const genesis_block_1 = require("../../genesis-block");
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const agentMessage_1 = require("../../agentMessage");
const automata_1 = require("./automata");
const tabla_estado_1 = require("./tabla-estado");
class FIASituada extends genesis_block_1.GenesisBlock {
    constructor() {
        super(...arguments);
        this.runAsync = true;
        this.tabla = new tabla_estado_1.TablaEstado();
        this.automata = new automata_1.Automata();
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(aleph_script_i18_1.i18.FIA_SITUADA_LABEL, aleph_script_i18_1.i18.SITUADA.SIMULATION_START));
        this.automata.configurar();
        const modelo = await this.automata.mundo.instanciar();
        console.log((0, agentMessage_1.agentMessage)(aleph_script_i18_1.i18.FIA_SITUADA_LABEL, `${aleph_script_i18_1.i18.SITUADA.SIMULATION_BODY}:${modelo.imprimir()}`));
        return `${aleph_script_i18_1.i18.SITUADA.SIMULATION_END}`;
    }
    razona(m, i) {
        const accion = this.tabla.procesarAferencia(i);
        if (accion) {
            m.modelo = accion.comoModelo();
        }
        return accion;
    }
}
exports.FIASituada = FIASituada;
