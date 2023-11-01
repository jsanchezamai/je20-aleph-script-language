"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IASituada = exports.Automata = exports.EstadoT = exports.Estado = void 0;
const genesis_block_1 = require("../../genesis-block");
const labels_1 = require("../../i18/labels");
const thread_1 = require("../../thread");
const paradigma_1 = require("../../mundos/paradigma");
const rxjs_1 = require("rxjs");
class Estado {
    constructor(modelo) {
        this.modelo = modelo;
    }
    comoModelo() {
        return this.modelo;
    }
    ;
    deModelo(e) {
        this.modelo = e;
    }
    transicion(e) {
        this.modelo = e.comoModelo();
    }
}
exports.Estado = Estado;
class EstadoT extends Estado {
    transicion(e) {
        this.modelo = e.comoModelo();
    }
}
exports.EstadoT = EstadoT;
class Automata {
    constructor() {
        this.eferencia = new rxjs_1.Subject();
        this.nombre = labels_1.i18.SITUADA.AUTOMATA.NOMBRE;
        this.mundo = new paradigma_1.Mundo();
        this.mundo.modelo = new paradigma_1.Modelo();
        this.estado = new EstadoT(this.mundo.modelo);
    }
    configurar() {
        this.mundo.agregarAferencia(this.eferencia.asObservable());
    }
    async inicializar() {
        this.mundo.eferencia.subscribe((m) => {
            console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.SITUADA.AUTOMATA.RECEPCION_AFERENCIA_LABEL));
            const aferencia = new EstadoT(m.modelo);
            this.estado.transicion(aferencia);
            this.mundo.modelo = this.estado.comoModelo();
            console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.SITUADA.AUTOMATA.ENVIO_EFERENCIA_LABEL));
            this.eferencia.next(this.mundo);
        });
        await this.mundo.ciclo();
    }
}
exports.Automata = Automata;
class IASituada extends genesis_block_1.GenesisBlock {
    constructor() {
        super(...arguments);
        this.runAsync = true;
        this.automata = new Automata();
    }
    async instanciar() {
        console.log((0, thread_1.agentMessage)(labels_1.i18.FIA_SITUADA_LABEL, labels_1.i18.SITUADA.SIMULATION_START));
        this.automata.configurar();
        const modelo = await this.automata.mundo.instanciar();
        console.log((0, thread_1.agentMessage)(labels_1.i18.FIA_SITUADA_LABEL, `${labels_1.i18.SITUADA.SIMULATION_BODY}:${modelo.imprimir()}`));
        return `${labels_1.i18.SITUADA.SIMULATION_END}`;
    }
}
exports.IASituada = IASituada;
(function (IASituada) {
    IASituada.fiaSituada = new IASituada();
    IASituada.fiaSituada.nombre = labels_1.i18.FIA_SITUADA_LABEL;
    IASituada.fiaSituada.razona =
        (w, i) => {
            return "Sí";
        };
})(IASituada || (exports.IASituada = IASituada = {}));
