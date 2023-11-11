"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuringTester = void 0;
const agentMessage_1 = require("../agentMessage");
const aleph_script_i18_1 = require("../i18/aleph-script-i18");
class TuringTester {
    constructor() {
        this.test = (tested) => {
            console.log((0, agentMessage_1.agentMessage)(tested.nombre, aleph_script_i18_1.i18.TURING.TEST_START_LABEL));
            console.log((0, agentMessage_1.agentMessage)(aleph_script_i18_1.i18.TURING.AGENT, aleph_script_i18_1.i18.TURING.TEST_LABEL));
            const accion = tested
                .razona(aleph_script_i18_1.i18.TURING.TEST_LABEL, "Test");
            const veredicto = accion == "Sí" ? accion : "No";
            console.log((0, agentMessage_1.agentMessage)(tested.nombre, veredicto));
            console.log((0, agentMessage_1.agentMessage)(aleph_script_i18_1.i18.TURING.AGENT, aleph_script_i18_1.i18.TURING.TEST_STOP_LABEL));
            return "";
        };
    }
}
exports.TuringTester = TuringTester;
