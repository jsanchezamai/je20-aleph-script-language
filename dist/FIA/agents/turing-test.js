"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuringTester = void 0;
const thread_1 = require("../thread");
const labels_1 = require("../i18/labels");
class TuringTester {
    constructor() {
        this.test = (tested) => {
            console.log((0, thread_1.agentMessage)(tested.nombre, labels_1.i18.TURING.TEST_START_LABEL));
            console.log((0, thread_1.agentMessage)(labels_1.i18.TURING.AGENT, labels_1.i18.TURING.TEST_LABEL));
            const accion = tested
                .razona(labels_1.i18.TURING.TEST_LABEL, "Test");
            const veredicto = accion == "Sí" ? accion : "No";
            console.log((0, thread_1.agentMessage)(tested.nombre, veredicto));
            console.log((0, thread_1.agentMessage)(labels_1.i18.TURING.AGENT, labels_1.i18.TURING.TEST_STOP_LABEL));
            return "";
        };
    }
}
exports.TuringTester = TuringTester;
