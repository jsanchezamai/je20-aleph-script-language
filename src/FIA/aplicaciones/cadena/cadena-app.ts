import { i18 } from "../../i18/aleph-script-i18";
import { agentMessage } from "../../thread";
import { App } from "../../engine/apps/app";

// import { CadenaFIASituada } from "./situada/cadena-fia-situada";
import { CadenaFIARedSemantica } from "./simbolica/formal/cadena-fia-red-semantica";
// import { CadenaFiaRedNeuronal } from "./conexionista/cadena-fia-red-neuronal";


export class CadenaApp extends App {

    runAsync: true;

    constructor() {
        super();
        this.nombre = i18.APPS.CADENA.NOMBRE;
    }

    async instanciar(): Promise<string> {

        console.log(agentMessage(this.nombre, i18.APPS.CADENA.SIMULATION_START));

        /**
         * APLICACIÓN PARA EL ESTUDIO DEL APRENDIZAJE INTELIGENTE
         *
         */

        // this.situada = new CadenaFIASituada();
        this.simbolica = new CadenaFIARedSemantica();
        // this.conexionista = new CadenaFiaRedNeuronal();

        const salidas = await Promise.all(
            [
                // this.situada.instanciar(),
                this.simbolica.instanciar(),
                // this.conexionista.instanciar()
            ]
        );

        return `${salidas.join("\n\t - ")}${i18.APPS.CADENA.SIMULATION_END}`;
    }
}