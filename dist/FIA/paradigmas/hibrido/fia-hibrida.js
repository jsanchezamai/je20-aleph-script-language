"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIAHibrida = void 0;
const genesis_block_1 = require("../../genesis-block");
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const agentMessage_1 = require("../../agentMessage");
class FIAHibrida extends genesis_block_1.GenesisBlock {
    constructor() {
        super(...arguments);
        this.runAsync = true;
        this.fias = [];
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(aleph_script_i18_1.i18.FIA_HIBRIDA_LABEL, aleph_script_i18_1.i18.HIBRIDA.SIMULATION_START));
        console.log((0, agentMessage_1.agentMessage)(aleph_script_i18_1.i18.FIA_HIBRIDA_LABEL, `${aleph_script_i18_1.i18.HIBRIDA.SIMULATION_BODY}:${this.fias.length}`));
        return `${aleph_script_i18_1.i18.HIBRIDA.SIMULATION_END}`;
    }
    razona(m, i) {
        return null;
    }
}
exports.FIAHibrida = FIAHibrida;
