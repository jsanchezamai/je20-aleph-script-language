"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaApp = void 0;
const labels_1 = require("../../i18/labels");
const thread_1 = require("../../thread");
const paradigma_1 = require("../paradigma");
const cadena_fia_situada_1 = require("./situada/cadena-fia-situada");
const cadena_fia_red_neuronal_1 = require("./conexionista/cadena-fia-red-neuronal");
class CadenaApp extends paradigma_1.App {
    constructor() {
        super();
        this.nombre = labels_1.i18.APPS.CADENA.NOMBRE;
    }
    async instanciar() {
        console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.APPS.CADENA.SIMULATION_START));
        /**
         *
         */
        this.situada = new cadena_fia_situada_1.CadenaFIASituada();
        // this.situada.instanciar();
        // this.simbolica = new CadenaFIARedSemantica();
        this.conexionista = new cadena_fia_red_neuronal_1.CadenaFiaRedNeuronal();
        await this.conexionista.instanciar();
        const salidas = await Promise.all([
        // this.simbolica.instanciar(),
        ]);
        return `${salidas.join("\n\t - ")}${labels_1.i18.APPS.CADENA.SIMULATION_END}`;
    }
}
exports.CadenaApp = CadenaApp;
