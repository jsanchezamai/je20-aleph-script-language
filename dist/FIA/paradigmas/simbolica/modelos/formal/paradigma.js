"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formal = void 0;
const rxjs_1 = require("rxjs");
const paradigma_1 = require("../conceptual/paradigma");
const motor_inferencia_1 = require("./sistema/semantica/motor-inferencia");
class Formal extends paradigma_1.Conceptual {
    constructor() {
        super(...arguments);
        this.eventos = new rxjs_1.Subject();
        this.motor = new motor_inferencia_1.MotorInferencia();
    }
}
exports.Formal = Formal;
