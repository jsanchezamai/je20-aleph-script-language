import { GenesisBlock } from "../../../genesis-block";
import { i18 } from "../../../i18/labels";
import { agentMessage } from "../../../thread";
import { iIASituada, Automata } from '../../../paradigmas/situada/paradigma';
import { CadenaEstados } from "./cadena-estado";
import { CadenaAutomata } from "./cadena-automata";

// export namespace IASituada {

    export const TOPE_POSICION = 6;

    export class CadenaFIASituada extends GenesisBlock implements iIASituada {

        nombre = i18.APPS.CADENA.SITUADA.NOMBRE;
        runAsync = true;

        automata = new CadenaAutomata<CadenaEstados>();

        async instanciar(): Promise<string> {

            console.log(agentMessage(this.nombre, i18.SITUADA.SIMULATION_START));

            /**
             * 
             */
            this.automata.configurar();
            await this.automata.inicializar();

            console.log(
                agentMessage(this.nombre,
                `${i18.SITUADA.SIMULATION_BODY}:${this.automata.mundo.modelo.imprimir()}`)
            );
            console.log(i18.SISTEMA.ENTER_PARA_SEGUIR);
            return `${i18.SITUADA.SIMULATION_END}`;
        }
    }

// }

export namespace IASituadaCadenaProduccion {

    export const fiaCadena = new CadenaFIASituada();

    fiaCadena.nombre = i18.SITUADA.CADENA.NOMBRE;

}