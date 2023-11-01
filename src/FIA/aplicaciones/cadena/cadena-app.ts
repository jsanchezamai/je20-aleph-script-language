import { i18 } from "../../i18/labels";
import { agentMessage } from "../../thread";
import { App } from "../paradigma";
import { CadenaFIASituada } from "./situada/cadena-fia-situada";
import { CadenaFiaRedNeuronal } from "./conexionista/cadena-fia-red-neuronal";

export class CadenaApp extends App {

    runAsync: true;

    constructor() {
        super();
        this.nombre = i18.APPS.CADENA.NOMBRE;
    }

    async instanciar(): Promise<string> {

        console.log(agentMessage(this.nombre, i18.APPS.CADENA.SIMULATION_START));

        /**
         *
         */
        this.situada = new CadenaFIASituada();
        // this.situada.instanciar();

        // this.simbolica = new CadenaFIARedSemantica();

        this.conexionista = new CadenaFiaRedNeuronal();
        await this.conexionista.instanciar();

        const salidas = await Promise.all(
            [

                // this.simbolica.instanciar(),
            ]
        );

        return `${salidas.join("\n\t - ")}${i18.APPS.CADENA.SIMULATION_END}`;
    }
}