"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IASituadaCadenaProduccion = exports.CadenaFIASituada = exports.TOPE_POSICION = void 0;
const aleph_script_i18_1 = require("../../../i18/aleph-script-i18");
const agentMessage_1 = require("../../../agentMessage");
const cadena_automata_1 = require("./cadena-automata");
const fia_situada_1 = require("../../../paradigmas/situada/fia-situada");
// export namespace IASituada {
exports.TOPE_POSICION = 10;
class CadenaFIASituada extends fia_situada_1.FIASituada {
    constructor() {
        super(...arguments);
        this.nombre = aleph_script_i18_1.i18.APPS.CADENA.SITUADA.NOMBRE;
        this.runAsync = true;
        this.automata = new cadena_automata_1.CadenaAutomata();
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.SITUADA.SIMULATION_START));
        /**
         * * Autómata que representa la cinta transportadora de la cadena de producción
         */
        this.automata.mundo = this.mundo;
        this.automata.configurar();
        await this.automata.inicializar();
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.SITUADA.SIMULATION_BODY}:${this.automata.mundo.modelo.imprimir()}`));
        console.log(aleph_script_i18_1.i18.SISTEMA.ENTER_PARA_SEGUIR);
        return `${aleph_script_i18_1.i18.SITUADA.SIMULATION_END}`;
    }
}
exports.CadenaFIASituada = CadenaFIASituada;
// }
var IASituadaCadenaProduccion;
(function (IASituadaCadenaProduccion) {
    IASituadaCadenaProduccion.fiaCadena = new CadenaFIASituada();
    IASituadaCadenaProduccion.fiaCadena.nombre = aleph_script_i18_1.i18.SITUADA.CADENA.NOMBRE;
})(IASituadaCadenaProduccion || (exports.IASituadaCadenaProduccion = IASituadaCadenaProduccion = {}));
