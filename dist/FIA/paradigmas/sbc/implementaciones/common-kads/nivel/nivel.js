"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vacio = void 0;
const modelo_1 = require("../../../../../mundos/modelo");
const cml_1 = require("./cml");
class Vacio extends modelo_1.Modelo {
    constructor() {
        super(...arguments);
        this.formularios = [];
        this.cml = new cml_1.CML();
    }
}
exports.Vacio = Vacio;
