"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Automata = void 0;
const rxjs_1 = require("rxjs");
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const mundo_1 = require("../../mundos/mundo");
const modelo_1 = require("../../mundos/modelo");
const agentMessage_1 = require("../../agentMessage");
const estado_1 = require("./estado");
class Automata {
    constructor() {
        this.eferencia = new rxjs_1.Subject();
        this.nombre = aleph_script_i18_1.i18.SITUADA.AUTOMATA.NOMBRE;
        this.mundo = new mundo_1.Mundo();
        this.mundo.modelo = new modelo_1.Modelo();
        this.estado = new estado_1.EstadoT(this.mundo.modelo);
    }
    configurar() {
        this.mundo.agregarAferencia(this.eferencia.asObservable());
    }
    async inicializar() {
        this.mundo.eferencia.subscribe((m) => {
            console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.SITUADA.AUTOMATA.RECEPCION_AFERENCIA_LABEL));
            /**
            * Procesar aferencia: Modelo (m)
            * */
            const aferencia = new estado_1.EstadoT(m.modelo);
            /**
            * Ejecución de las transiciones de ciclo
            * */
            this.estado.transicion(aferencia);
            this.mundo.modelo = this.estado.comoModelo();
            /**
            * Lanzar eferencia de regreso al mundo
            * */
            console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.SITUADA.AUTOMATA.ENVIO_EFERENCIA_LABEL));
            this.eferencia.next(this.mundo);
        });
        console.log("automata esperando al acabar de mundo");
        // Invocación génesis...
        await this.mundo.alAcabar(this.nombre);
        console.log("automata esperando al acabar de mundo: ¡ya!");
    }
}
exports.Automata = Automata;
