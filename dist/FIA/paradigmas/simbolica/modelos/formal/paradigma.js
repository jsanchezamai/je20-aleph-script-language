"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formal = void 0;
const paradigma_1 = require("../../paradigma");
const paradigma_2 = require("../conceptual/paradigma");
class Formal extends paradigma_2.Conceptual {
    constructor() {
        super(...arguments);
        this.motor = new paradigma_1.MotorInferencia();
    }
}
exports.Formal = Formal;
