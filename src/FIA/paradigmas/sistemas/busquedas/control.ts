import { Dominio } from "../../../mundos/dominio";
import { Modelo } from "../../../mundos/modelo";
import { Estado } from './estado';
import { Operador } from "./operador";

export type HashData = {[key: string]: {
    anterior: GrafoS,
    coste_desde_inicio: number,
    profundidad?: number
}};

/**
 * Un grafo dirigido o digrafo (oposición, no dirigido):
 * es un tipo de grafo en el cual las aristas tienen
 * un sentido definido.
 *
 * Grafos simple (por oposición a Multigrafo):
 * Es un tipo de grafo el cual no incluye ciclos ni
 * aristas paralelas.
 */
export interface GrafoS {

    profundidad: number;
    nodo: Estado;
    arcos: Operador[];

}

export class GrafoS implements GrafoS {

    profundidad = 0;
    nodo: Estado;
    arcos: Operador[] = [];

    coste(inicio: Estado, destino: Estado): number {

        return 0;
    }

    Id(): string {
        return this.nodo.modelo.dominio.base as string;
    }
}

export interface Control {

    abierta: GrafoS[];
    tabla_a: HashData;

    camino(inicio: GrafoS, destino: GrafoS): GrafoS[];
    coste(inicio: Estado, destino: Estado): number;

    espacioBusqueda: GrafoS;

    estadoInicial: GrafoS;

    metas: GrafoS[];

    camino(inicio: GrafoS, destino: GrafoS): GrafoS[];

    busquedaNoInformada(): GrafoS[];

    busquedaHeuristica(): GrafoS[];

    creaNodo(valor: string): GrafoS;

    /**
     * Si el factor de ramificación (número medio de sucesores de un nodo) es b, la profundidad (número de arcos del nodo inicial hasta la solución) es d, los órdenes de magnitud de las complejidades espacial y temporal son:
 
        ----        | Anchura | Profundidad | Bidireccional
        Espacial    | O(b^d)  | O(b . d)    | O(b^d/2)
        Temporal    | O(b^d)  | O(b^d)      | O(b^d/2

    O sea, la búsqueda en anchura tiene complejidad espacial y temporal exponencial en la profundidad, la búsqueda en profundidad tiene complejidad espacial lineal y temporal exponencial, y la bidireccional es exponencial pero en orden d/2.
    */
}

export class Control implements Control {

    abierta: GrafoS[] = [];
    tabla_a: HashData = {};

    espacioBusqueda = new GrafoS();
    estadoInicial: GrafoS;
    metas: GrafoS[] = [];

    busquedaHeuristica(): GrafoS[] {
        throw new Error("Method not implemented.");
    }

    camino(inicio: GrafoS, destino: GrafoS): GrafoS[] {

        console.log("\t - Camino desde/a: ", inicio.Id(), destino.Id());

        let index = 0;
        let nodo: GrafoS = destino;
        const camino: GrafoS[] = [];
        do {

            camino.push(nodo);
            nodo = this.tabla_a[nodo.Id()]?.anterior;
            console.log("\t\t - ruta: ", nodo.Id());
            index++;
        } while (nodo != null && inicio != nodo && index < 10);

        if (inicio == nodo) {
            camino.push(inicio);
        }
        return camino;
    }

    creaNodo(valor: string, objetivo: boolean = false): GrafoS {

        const g = new Estado();
        g.esObjetivo = () => objetivo;
        g.modelo = new Modelo();
        g.modelo.dominio = new Dominio({});
        g.modelo.dominio.base = valor;
        const gs = new GrafoS();
        gs.nodo = g;
        gs.profundidad = 1;
        return gs;
    }
}

