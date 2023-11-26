import { agentMessage } from "../../../agentMessage";
import { App } from "../../../engine/apps/app";
import { IDEModelo } from "./modelo/ide-modelo";
import { IDEMundo } from "./mundo/ide-mundo";
import { IDEEstados } from "./situada/ide-estado";
import { IDEFIASituada } from "./situada/ide-fia-situada";

export class IdeApp extends App {

    i18 = this.i18.IDE;

    runAsync: true;

    constructor() {
        super();
        this.nombre = this.i18.NOMBRE;
    }

    async instanciar(): Promise<string> {

        console.log(agentMessage(this.nombre, this.i18.SIMULATION_START));
        /**
         * CREACIÓN DEL MUNDO RAÍZ
         */
        this.mundo = new IDEMundo();

        this.mundo.modelo = new IDEModelo();
        this.mundo.modelo.pulso = 1000;
        this.mundo.modelo.muerte = 1;
        this.mundo.modelo.estado = IDEEstados.PARADA;

        this.mundo.nombre = this.i18.MUNDO.NOMBRE;

        this.situada = new IDEFIASituada();
        this.situada.mundo = this.mundo;

        const salidas = await Promise.all(
            [
                this.mundo.ciclo(),
                this.situada.instanciar()
            ]
        );

        if (typeof salidas == 'object') {
            return `${this.i18.SIMULATION_END}`;
        } else {

        }

    }
}