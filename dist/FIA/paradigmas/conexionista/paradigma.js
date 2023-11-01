"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAConexionista = exports.ClasificadorNumericoParametrizado = exports.RedNeuronalArtificial = exports.Canalizacion = void 0;
const genesis_block_1 = require("../../genesis-block");
const labels_1 = require("../../i18/labels");
const ort = __importStar(require("onnxruntime-node"));
const paradigma_1 = require("../simbolica/modelos/formal/paradigma");
const thread_1 = require("../../thread");
class Canalizacion {
    canalizar() {
        throw new Error("Method not implemented.");
    }
    /**
     *
     * @param inferencia.modelo: './model.onnx'
     *                  .dato_a: Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
     * *                .dato_b: Float32Array([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
     */
    async canalizarDe2Parametros(inferencia) {
        return new Promise(async (resolve, reject) => {
            const dominio = labels_1.i18.CONEXIONISTA.NEURONAL;
            try {
                console.log((0, thread_1.agentMessage)(dominio.NOMBRE, `${dominio.CREANDO_SESION_INFERENCIA_LABEL}:${inferencia.modelo}`));
                // create a new session and load the specific model.
                //
                // the model in this example contains a single MatMul node
                // it has 2 inputs: 'a'(float32, 3x4) and 'b'(float32, 4x3)
                // it has 1 output: 'c'(float32, 3x3)
                const session = await ort.InferenceSession.create(inferencia.modelo);
                console.log((0, thread_1.agentMessage)(dominio.NOMBRE, `${dominio.CARGANDO_PARAMETROS_LABEL}:${inferencia.dato_a}, ${inferencia.dato_b}`));
                const tensorA = new ort.Tensor('float32', inferencia.dato_a, [3, 4]);
                const tensorB = new ort.Tensor('float32', inferencia.dato_b, [4, 3]);
                // prepare feeds. use model input names as keys.
                const feeds = { a: tensorA, b: tensorB };
                // feed inputs and run
                const results = await session.run(feeds);
                // read from results
                const dataC = results.c.data;
                console.log((0, thread_1.agentMessage)(dominio.NOMBRE, `${dominio.RESPUESTA_INFERENCIA_LABEL}:${dataC}`));
                resolve("");
            }
            catch (e) {
                console.log((0, thread_1.agentMessage)(dominio.NOMBRE, `${dominio.RESPUESTA_INFERENCIA_LABEL}:${e}`));
                reject((0, thread_1.agentMessage)(dominio.NOMBRE, `${dominio.RESPUESTA_INFERENCIA_LABEL}:${e}`));
            }
        });
    }
}
exports.Canalizacion = Canalizacion;
class RedNeuronalArtificial extends paradigma_1.Formal {
    constructor() {
        super(...arguments);
        this.clasificador = new ClasificadorNumericoParametrizado();
    }
}
exports.RedNeuronalArtificial = RedNeuronalArtificial;
class ClasificadorNumericoParametrizado {
    constructor() {
        this.canalizacion = new Canalizacion();
    }
}
exports.ClasificadorNumericoParametrizado = ClasificadorNumericoParametrizado;
class IAConexionista extends genesis_block_1.GenesisBlock {
    constructor() {
        super(...arguments);
        this.modelo = new RedNeuronalArtificial();
    }
    async inferencia(c) {
        this.modelo.clasificador.canalizacion = c;
        const solucion = await this.modelo.clasificador.canalizacion.canalizar();
        return solucion;
    }
    imprimir() {
        return `${labels_1.i18.CONEXIONISTA.NEURONAL.IDLE}`;
    }
}
exports.IAConexionista = IAConexionista;
(function (IAConexionista) {
    IAConexionista.fiaConexionista = new IAConexionista();
    IAConexionista.fiaConexionista.nombre = labels_1.i18.FIA_CONEXIONISTA_LABEL;
    IAConexionista.fiaConexionista.razona =
        (m, i) => {
            return "No";
        };
})(IAConexionista || (exports.IAConexionista = IAConexionista = {}));
