"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IASituadaCadenaProduccion = exports.CadenaFIASituada = exports.TOPE_POSICION = void 0;
const genesis_block_1 = require("../../../genesis-block");
const labels_1 = require("../../../i18/labels");
const thread_1 = require("../../../thread");
const cadena_automata_1 = require("./cadena-automata");
// export namespace IASituada {
exports.TOPE_POSICION = 6;
class CadenaFIASituada extends genesis_block_1.GenesisBlock {
    constructor() {
        super(...arguments);
        this.nombre = labels_1.i18.APPS.CADENA.SITUADA.NOMBRE;
        this.runAsync = true;
        this.automata = new cadena_automata_1.CadenaAutomata();
    }
    async instanciar() {
        console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.SITUADA.SIMULATION_START));
        /**
         *
         */
        this.automata.configurar();
        await this.automata.inicializar();
        console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.SITUADA.SIMULATION_BODY}:${this.automata.mundo.modelo.imprimir()}`));
        console.log(labels_1.i18.SISTEMA.ENTER_PARA_SEGUIR);
        return `${labels_1.i18.SITUADA.SIMULATION_END}`;
    }
}
exports.CadenaFIASituada = CadenaFIASituada;
// }
var IASituadaCadenaProduccion;
(function (IASituadaCadenaProduccion) {
    IASituadaCadenaProduccion.fiaCadena = new CadenaFIASituada();
    IASituadaCadenaProduccion.fiaCadena.nombre = labels_1.i18.SITUADA.CADENA.NOMBRE;
})(IASituadaCadenaProduccion || (exports.IASituadaCadenaProduccion = IASituadaCadenaProduccion = {}));
