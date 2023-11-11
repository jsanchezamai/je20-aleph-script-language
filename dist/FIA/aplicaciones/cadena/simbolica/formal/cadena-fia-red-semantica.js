"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaFIARedSemantica = void 0;
const aleph_script_i18_1 = require("../../../../i18/aleph-script-i18");
const red_1 = require("../../../../paradigmas/simbolica/modelos/formal/sistema/semantica/red");
const agentMessage_1 = require("../../../../agentMessage");
const cadena_fia_simbolica_1 = require("../cadena-fia-simbolica");
const cadena_grafo_1 = require("./cadena-grafo");
class CadenaFIARedSemantica extends cadena_fia_simbolica_1.CadenaFIASimbolica {
    constructor() {
        super();
        this.modelo = new red_1.RedSemantica();
        this.nombre = aleph_script_i18_1.i18.APPS.CADENA.SIMBOLICA.RED.NOMBRE;
        const grafo = new cadena_grafo_1.CadenaGrafo();
        this.modelo.nombre = aleph_script_i18_1.i18.APPS.CADENA.SIMBOLICA.SEMANTICA.NOMBRE;
        this.modelo.base = grafo;
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.APPS.CADENA.SIMBOLICA.SIMULATION_START));
        await this.cargaRed();
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.APPS.CADENA.SIMULATION_BODY}:${this.imprimir()}`));
        await this.probar();
        return `${aleph_script_i18_1.i18.APPS.CADENA.SIMBOLICA.SIMULATION_END}`;
    }
    async cargaRed() {
        const red = aleph_script_i18_1.i18.APPS.CADENA.SIMBOLICA.DOMINIO;
        this.modelo.cargar(red);
    }
    imprimir() {
        let out = "";
        this.modelo.entidades.forEach(e => {
            out += e.imprimir();
        });
        return out;
    }
    async probar() {
        const red = aleph_script_i18_1.i18.APPS.CADENA.SIMBOLICA.DOMINIO;
        /*

            red.ENTIDADES.tarea
            red.ENTIDADES.robot
            red.ENTIDADES.objeto
            red.ENTIDADES.propiedad
            red.ENTIDADES.cadena
            red.ENTIDADES.almacen

            red.ARCOS.ESTRUCTURALES.INSTANCIA.cadena_1
            red.ARCOS.ESTRUCTURALES.INSTANCIA.robot_1
            red.ARCOS.ESTRUCTURALES.INSTANCIA.objeto_1
            red.ARCOS.ESTRUCTURALES.INSTANCIA.almacen_1

            red.ARCOS.ESTRUCTURALES.SUBCLASE.criptoselladora

        */
        const casos = [
            {
                texto: "¿Es robot_1 instancia de robot? ¿Es robot_1 un robot?",
                instancia: {
                    robot_1: { robot: "robot" }
                }
            },
            {
                texto: "¿Es robot_1 una criptoselladora?",
                subclase: {
                    robot_1: { criptoselladora: "criptoselladora" }
                }
            },
            {
                texto: "¿Es el objeto_1 criptosellable?",
                parte: {
                    propiedad_cripta: { objeto_1: "objeto_1" }
                }
            },
            {
                texto: "¿Necesita el objeto_1 criptosellado y puede el robot_1 hacerlo?",
                parte: {
                    propiedad_cripta: { objeto_1: "objeto_1" }
                },
                subclase: {
                    robot_1: { criptoselladora: "criptoselladora" }
                }
            }
        ];
        await this.modelo.probar(casos);
    }
}
exports.CadenaFIARedSemantica = CadenaFIARedSemantica;
