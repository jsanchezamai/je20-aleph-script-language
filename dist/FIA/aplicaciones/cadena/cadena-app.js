"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaApp = void 0;
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const agentMessage_1 = require("../../agentMessage");
const app_1 = require("../../engine/apps/app");
const cadena_modelo_1 = require("./modelo/cadena-modelo");
const cadena_mundo_1 = require("./mundo/cadena-mundo");
const cadena_fia_situada_1 = require("./situada/cadena-fia-situada");
const cadena_fia_red_semantica_1 = require("./simbolica/formal/cadena-fia-red-semantica");
const cadena_fia_red_neuronal_1 = require("./conexionista/cadena-fia-red-neuronal");
class CadenaApp extends app_1.App {
    constructor() {
        super();
        this.i18 = this.i18.CADENA;
        this.nombre = aleph_script_i18_1.i18.APPS.CADENA.NOMBRE;
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.APPS.CADENA.SIMULATION_START));
        /**
         * CREACIÓN DEL MUNDO RAÍZ
         */
        this.mundo = new cadena_mundo_1.CadenaMundo();
        this.mundo.modelo = new cadena_modelo_1.CadenaModelo();
        this.mundo.nombre = aleph_script_i18_1.i18.APPS.CADENA.MUNDO.NOMBRE;
        /**
         * APLICACIÓN PARA EL ESTUDIO DEL APRENDIZAJE INTELIGENTE
         * FUNDAMENTOS DE IA + TEORIA LENGUAJES PROGRAMACION
         */
        this.situada = new cadena_fia_situada_1.CadenaFIASituada();
        this.situada.mundo = this.mundo;
        this.simbolica = new cadena_fia_red_semantica_1.CadenaFIARedSemantica();
        this.simbolica.mundo = this.mundo;
        this.conexionista = new cadena_fia_red_neuronal_1.CadenaFiaRedNeuronal();
        this.conexionista.mundo = this.mundo;
        const salidas = await Promise.all([
            this.mundo.ciclo(),
            //this.situada.instanciar(),
            this.simbolica.instanciar(),
            //this.conexionista.instanciar()
        ]);
        if (typeof salidas == 'object') {
            return `${aleph_script_i18_1.i18.APPS.CADENA.SIMULATION_END}`;
        }
        else {
        }
    }
}
exports.CadenaApp = CadenaApp;
