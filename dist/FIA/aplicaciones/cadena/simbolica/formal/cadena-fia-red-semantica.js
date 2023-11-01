"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaFIARedSemantica = exports.CadenaGrafo = void 0;
const labels_1 = require("../../../../i18/labels");
const grafo_1 = require("../../../../paradigmas/simbolica/modelos/formal/sistema/semantica/grafo");
const red_1 = require("../../../../paradigmas/simbolica/modelos/formal/sistema/semantica/red");
const thread_1 = require("../../../../thread");
const cadena_fia_simbolica_1 = require("../cadena-fia-simbolica");
class CadenaGrafo extends grafo_1.Grafo {
}
exports.CadenaGrafo = CadenaGrafo;
class CadenaFIARedSemantica extends cadena_fia_simbolica_1.CadenaFIASimbolica {
    constructor() {
        super();
        this.modelo = new red_1.RedSemantica();
        this.nombre = labels_1.i18.APPS.CADENA.SIMBOLICA.RED.NOMBRE;
        const grafo = new CadenaGrafo();
        this.modelo.nombre = labels_1.i18.APPS.CADENA.SIMBOLICA.SEMANTICA.NOMBRE;
        this.modelo.base = grafo;
    }
    async instanciar() {
        console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.APPS.CADENA.SIMBOLICA.SIMULATION_START));
        await this.cargaRed();
        console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMULATION_BODY}:${this.imprimir()}`));
        await this.probar();
        return `${labels_1.i18.APPS.CADENA.SIMBOLICA.SIMULATION_END}`;
    }
    async cargaRed() {
        const red = labels_1.i18.APPS.CADENA.SIMBOLICA.DOMINIO;
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
        const red = labels_1.i18.APPS.CADENA.SIMBOLICA.DOMINIO;
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
                instancia: {
                    robot_1: { robot: "robot" }
                }
            },
            {
                subclase: {
                    robot_1: { criptoselladora: "criptoselladora" }
                }
            },
            {
                parte: {
                    propiedad_cripta: { objeto_1: "objeto_1" }
                }
            },
            {
                tarea_cadena_robot_objeto: {
                    encadenar: {
                        tarea_1: "tarea",
                        cadena_1: "cadena",
                        robot_1: "robot",
                        objeto_1: "objeto",
                        almacen_1: "almacen"
                    }
                }
            }
        ];
        await this.modelo.probar(casos);
    }
}
exports.CadenaFIARedSemantica = CadenaFIARedSemantica;
