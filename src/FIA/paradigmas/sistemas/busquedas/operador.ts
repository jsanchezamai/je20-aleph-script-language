import { GrafoS } from "./control";
import { Estado } from "./estado";

export interface Operador {

    nodo: GrafoS;
    coste: number;

    // Antes de llamar a transición hay que
    // revisar condiciones del estado.
    cumpleCondiciones(estado: Estado): boolean;

    transicion(estado: Estado): {
        coste: number,
        nodo: GrafoS
    }
}

export class Operador implements Operador {

    constructor(
        public coste: number,
        public nodo: GrafoS,
        public profundidad: number) {
            nodo.profundidad = profundidad;
        }

    // Antes de llamar a transición hay que
    // revisar condiciones del estado.
    cumpleCondiciones(estado: Estado): boolean {
        return true;
    }

    transicion(estado: Estado): {
        coste: number,
        nodo: GrafoS
    } {
        return {
            coste: this.coste,
            nodo: this.nodo
        }
    }
}