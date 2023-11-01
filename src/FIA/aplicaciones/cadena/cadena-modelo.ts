import { CadenaEstados } from "./situada/cadena-estado";
import { Modelo } from "../../mundos/paradigma";


export class CadenaModelo extends Modelo {
    nombre = "Cadena de producción";
    motor: CadenaEstados;
    posicion: number = 0;
    iluminacion: boolean;
}