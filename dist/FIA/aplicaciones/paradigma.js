"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const genesis_block_1 = require("../genesis-block");
const labels_1 = require("../i18/labels");
const paradigma_1 = require("../paradigmas/cientifica/paradigma");
const paradigma_2 = require("../paradigmas/conexionista/paradigma");
const paradigma_3 = require("../paradigmas/simbolica/paradigma");
const paradigma_4 = require("../paradigmas/situada/paradigma");
const thread_1 = require("../thread");
class App extends genesis_block_1.GenesisBlock {
    constructor() {
        super(...arguments);
        this.nombre = labels_1.i18.APPS.CADENA.NOMBRE;
        this.runAsync = true;
    }
    async instanciar() {
        console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.SITUADA.SIMULATION_START));
        /**
         *
         */
        this.debil = paradigma_1.IACientifica.fiaDebil;
        this.fuerte = paradigma_1.IACientifica.fiaFuerte;
        this.situada = new paradigma_4.IASituada();
        this.simbolica = new paradigma_3.IASimbolica();
        this.conexionista = new paradigma_2.IAConexionista();
        await this.situada.instanciar();
        console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMULATION_BODY}:${""}`));
        return `${labels_1.i18.SITUADA.SIMULATION_END}`;
    }
}
exports.App = App;
