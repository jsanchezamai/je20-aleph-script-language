"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedNeuronalArtificial = void 0;
const paradigma_1 = require("../simbolica/modelos/formal/paradigma");
const clasificador_1 = require("./clasificador");
class RedNeuronalArtificial extends paradigma_1.Formal {
    constructor() {
        super(...arguments);
        this.clasificador = new clasificador_1.ClasificadorNumericoParametrizado();
    }
}
exports.RedNeuronalArtificial = RedNeuronalArtificial;
