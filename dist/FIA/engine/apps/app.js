"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const paradigma_1 = require("../../paradigmas/cientifica/paradigma");
const fia_conexionista_1 = require("../../paradigmas/conexionista/fia-conexionista");
const fia_hibrida_1 = require("../../paradigmas/hibrido/fia-hibrida");
const fia_simbolica_1 = require("../../paradigmas/simbolica/fia-simbolica");
const fia_situada_1 = require("../../paradigmas/situada/fia-situada");
const agentMessage_1 = require("../../agentMessage");
class App extends fia_hibrida_1.FIAHibrida {
    constructor() {
        super(...arguments);
        this.i18 = aleph_script_i18_1.i18.APPS;
        this.nombre = aleph_script_i18_1.i18.APPS.ME_LABEL;
        this.runAsync = true;
        this.fias = [];
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.SITUADA.SIMULATION_START));
        /**
         *
         */
        this.debil = paradigma_1.IACientifica.fiaDebil;
        this.fuerte = paradigma_1.IACientifica.fiaFuerte;
        this.situada = new fia_situada_1.FIASituada();
        this.simbolica = new fia_simbolica_1.FIASimbolica();
        this.conexionista = new fia_conexionista_1.FIAConexionista();
        await this.situada.instanciar();
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.BODY}:${""}`));
        return `${aleph_script_i18_1.i18.SITUADA.SIMULATION_END}`;
    }
}
exports.App = App;
