import { Estado } from "./estado";
import { Operador } from "./operador";

/**
 * Un grafo dirigido o digrafo (oposición, no dirigido):
 * es un tipo de grafo en el cual las aristas tienen
 * un sentido definido.
 *
 * Grafos simple (por oposición a Multigrafo):
 * Es un tipo de grafo el cual no incluye ciclos ni
 * aristas paralelas.
 */
export interface GrafoDirigidoSimple {

    nodo: Estado;
    arcos: Operador[];

}

export interface Control {

    espacioBusqueda: GrafoDirigidoSimple;

    estadoInicial: Estado;

    metas: Estado[];

    busquedaNoInformada(): Estado[];

    busquedaHeuristica(): Estado[];

    /**
     * Si el factor de ramificación (número medio de sucesores de un nodo) es b, la profundidad (número de arcos del nodo inicial hasta la solución) es d, los órdenes de magnitud de las complejidades espacial y temporal son:
 
        ----        | Anchura | Profundidad | Bidireccional
        Espacial    | O(b^d)  | O(b . d)    | O(b^d/2)
        Temporal    | O(b^d)  | O(b^d)      | O(b^d/2

    O sea, la búsqueda en anchura tiene complejidad espacial y temporal exponencial en la profundidad, la búsqueda en profundidad tiene complejidad espacial lineal y temporal exponencial, y la bidireccional es exponencial pero en orden d/2.
    */
}

export interface PrimeroEnAnchura extends Control {

    // Siempre encuentra la solución
    // Si, encuentra la solución más cercana
    // a la raíz
    completo: true;

    // Siempre encuentra la solución óptima
    // Si el coste es igual para todos los arcos
    // entonces sí sería admisible.
    admisible: false;

}

export interface PrimeroEnProfundidad extends Control {

    /**
     * La búsqueda en profundidad no es ni completa ni admisible
     * (puede entrar en una rama infinita y nunca llegar a una solución).
     * Ni poniendo una profundidad límite se garantiza la completitud.
     */
    // Siempre encuentra la solución
    completo: false;

    // Siempre encuentra la solución óptima
    admisible: false;

}

export interface BúsquedaBidireccional extends Control {

    // Siempre encuentra la solución
    /*
    La búsqueda bidireccional es completa si en una de las direcciones se hace búsqueda en anchura, porque así se garantiza que las dos búsquedas se encontrarán en algún momento.
    */
    completo: true;

    // Siempre encuentra la solución óptima
    /**
     * Si se realiza la búsqueda desde un nodo objetivo, es admisible.
     */
    admisible: false;

}