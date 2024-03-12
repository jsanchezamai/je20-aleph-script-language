import { Estado } from "./estado";

export interface Coste {

    valor: number;

}

export interface Operador {

    estado: Estado;

    // Antes de llamar a transición hay que
    // revisar condiciones del estado.
    cumpleCondiciones(estado: Estado): boolean;

    transicion(estado: Estado): {
        coste: Coste,
        estado: Estado
    }
}