"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaFiaRedNeuronal = exports.CadenaRedNeuronal = void 0;
const labels_1 = require("../../../i18/labels");
const paradigma_1 = require("../../../paradigmas/conexionista/paradigma");
const thread_1 = require("../../../thread");
const cadena_fia_conexionista_1 = require("./cadena-fia-conexionista");
class CadenaRedNeuronal extends paradigma_1.RedNeuronalArtificial {
}
exports.CadenaRedNeuronal = CadenaRedNeuronal;
class CadenaFiaRedNeuronal extends cadena_fia_conexionista_1.CadenaFIAConexionista {
    constructor() {
        super();
        this.modelo = new CadenaRedNeuronal();
        this.nombre = labels_1.i18.APPS.CADENA.CONEXIONISTA.RED.NOMBRE;
        this.modelo.nombre = labels_1.i18.APPS.CADENA.CONEXIONISTA.NEURONAL.NOMBRE;
    }
    async instanciar() {
        console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.APPS.CADENA.CONEXIONISTA.SIMULATION_START));
        await this.cargaRed();
        console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMULATION_BODY}:${this.imprimir()}`));
        await this.probar();
        console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.CONEXIONISTA.SIMULATION_END}`));
        return "";
    }
    async cargaRed() { }
    async probar() {
        const dato_a = Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        const dato_b = Float32Array.from([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]);
        await this.modelo.clasificador.canalizacion.canalizarDe2Parametros({
            modelo: "/Users/morente/Desktop/DRIVE/taller_tc/JE20/je20/fia/dist/FIA/aplicaciones/cadena/conexionista/model.onnx",
            dato_a,
            dato_b
        });
    }
}
exports.CadenaFiaRedNeuronal = CadenaFiaRedNeuronal;
