import { i18 } from "../../../../i18/labels";
import { Grafo, IGrafo } from "../../../../paradigmas/simbolica/modelos/formal/sistema/semantica/grafo";
import { RedSemantica } from "../../../../paradigmas/simbolica/modelos/formal/sistema/semantica/red";
import { agentMessage } from "../../../../thread";
import { CadenaFIASimbolica } from "../cadena-fia-simbolica";

export class CadenaGrafo extends Grafo {}

export class CadenaFIARedSemantica extends CadenaFIASimbolica {

    modelo = new RedSemantica();
    nombre = i18.APPS.CADENA.SIMBOLICA.RED.NOMBRE;

    constructor() {

        super();

        const grafo = new CadenaGrafo();

        this.modelo.nombre = i18.APPS.CADENA.SIMBOLICA.SEMANTICA.NOMBRE;
        this.modelo.base = grafo;

    }

    async instanciar(): Promise<string> {

        console.log(agentMessage(this.nombre, i18.APPS.CADENA.SIMBOLICA.SIMULATION_START));

        await this.cargaRed();

        console.log(
            agentMessage(this.nombre, `${i18.APPS.CADENA.SIMULATION_BODY}:${this.imprimir()}`)
        );

        await this.probar();

        return `${i18.APPS.CADENA.SIMBOLICA.SIMULATION_END}`;
    }

    async cargaRed() {

        const red = i18.APPS.CADENA.SIMBOLICA.DOMINIO;
        this.modelo.cargar(red);

    }

    imprimir(): string {

        let out = "";
        this.modelo.entidades.forEach(e => {
            out += e.imprimir();
        })
        return out;
    }

    async probar(): Promise<void> {

        const red = i18.APPS.CADENA.SIMBOLICA.DOMINIO;

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
                    encadenar : {
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


