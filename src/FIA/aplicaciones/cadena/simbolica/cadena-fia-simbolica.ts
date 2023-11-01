import { GenesisBlock } from "../../../genesis-block";
import { i18 } from "../../../i18/labels";
import { agentMessage } from "../../../thread";
import { IModeloFormal, IModeloRepresentacional, iIASimbolica } from "../../../paradigmas/simbolica/paradigma";
import { IMundo } from "../../../mundos/paradigma";
import { ISolucion } from "../../../paradigmas/conexionista/paradigma";
import { IProblema, IRequisitos } from "../../../paradigmas/simbolica/modelos/formal/inferencia/relacion/paradigma";

// export namespace IASituada {

    export const TOPE_POSICION = 9;

    export class CadenaFIASimbolica extends GenesisBlock implements iIASimbolica {

        runAsync = true;

        nombre = i18.APPS.CADENA.SIMBOLICA.NOMBRE;

        modelo: IModeloFormal;

        analisis: (p: IProblema) => ISolucion[];
        sintesis: (r: IRequisitos) => ISolucion;
        modificacion: (s: ISolucion) => IMundo;

        async instanciar(): Promise<string> {

            console.log(agentMessage(this.nombre, i18.APPS.CADENA.SIMBOLICA.SIMULATION_START));

            console.log(
                agentMessage(this.nombre, `${i18.APPS.CADENA.SIMULATION_BODY}:${this.modelo}`)
            );

            return `${i18.APPS.CADENA.SIMBOLICA.SIMULATION_END}`;
        }
    }

// }

