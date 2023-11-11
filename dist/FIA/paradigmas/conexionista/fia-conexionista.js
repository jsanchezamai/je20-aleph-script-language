"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIAConexionista = void 0;
const genesis_block_1 = require("../../genesis-block");
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const agentMessage_1 = require("../../agentMessage");
const red_neuronal_1 = require("./red-neuronal");
class FIAConexionista extends genesis_block_1.GenesisBlock {
    constructor() {
        super(...arguments);
        this.runAsync = true;
        this.modelo = new red_neuronal_1.RedNeuronalArtificial();
        this.i18 = aleph_script_i18_1.i18.CONEXIONISTA.NEURONAL;
    }
    async inferencia(c) {
        this.modelo.clasificador.canalizacion = c;
        const solucion = await this.modelo.clasificador.canalizacion.canalizar();
        return solucion;
    }
    imprimir() {
        return `${this.i18.IDLE}`;
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, this.i18.SIMULATION_START));
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.SIMULATION_BODY}:${this.imprimir()}`));
        await this.probar();
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.SIMULATION_END}`));
        return "";
    }
    async probar() {
        const dato_a = Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        const dato_b = Float32Array.from([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]);
        console.log("T012");
        await this.modelo.clasificador.canalizacion.canalizarDe2Parametros({
            modelo: "/Users/morente/Desktop/DRIVE/taller_tc/JE20/je20/fia/dist/FIA/aplicaciones/cadena/conexionista/model.onnx",
            dato_a,
            dato_b
        });
    }
}
exports.FIAConexionista = FIAConexionista;
(function (FIAConexionista) {
    FIAConexionista.fiaConexionista = new FIAConexionista();
    FIAConexionista.fiaConexionista.nombre = aleph_script_i18_1.i18.FIA_CONEXIONISTA_LABEL;
    FIAConexionista.fiaConexionista.razona =
        (m, i) => {
            return "No";
        };
})(FIAConexionista || (exports.FIAConexionista = FIAConexionista = {}));
