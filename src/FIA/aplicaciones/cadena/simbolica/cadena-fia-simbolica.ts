import { GenesisBlock } from "../../../genesis-block";
import { i18 } from "../../../i18/aleph-script-i18";
import { agentMessage } from "../../../thread";
import { IModeloFormal } from "../../../paradigmas/simbolica/paradigma";
import { ISolucion } from "../../../paradigmas/conexionista/paradigma";
import { IProblema, IRequisitos } from "../../../paradigmas/simbolica/modelos/formal/inferencia/relacion/paradigma";
import { IMundo } from "../../../mundos/mundo";
import { IFIASimbolica, FIASimbolica } from '../../../paradigmas/simbolica/fia-simbolica';

// export namespace IASituada {

    export const TOPE_POSICION = 9;

    export class CadenaFIASimbolica extends FIASimbolica implements IFIASimbolica {

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

