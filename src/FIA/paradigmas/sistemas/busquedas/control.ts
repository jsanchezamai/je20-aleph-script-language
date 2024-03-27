import { Dominio } from "../../../mundos/dominio";
import { Modelo } from "../../../mundos/modelo";
import { Estado } from './estado';
import { Operador } from "./operador";

export type TablaA_Id = string;
export type HashDataItem = {
    anterior: Arbol,
    coste_desde_inicio: number,
    profundidad?: number
}
export type HashData = {[key: string]: HashDataItem};

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

export class Arbol extends GrafoS {}

export interface Control {

    abierta: Arbol[];
    tabla_a: HashData;

    camino(inicio: Arbol, destino: Arbol): Arbol[];
    coste(inicio: Estado, destino: Estado): number;

    espacioBusqueda: Arbol;

    estadoInicial: Arbol;

    metas: Arbol[];

    camino(inicio: Arbol, destino: Arbol): Arbol[];

    busquedaNoInformada(): Arbol[];

    busquedaHeuristica(): Arbol[];

    creaNodo(valor: string): Arbol;

    imprimir(abierta: boolean, tabla_a: boolean);

    /**
     * Si el factor de ramificación (número medio de sucesores de un nodo) es b, la profundidad (número de arcos del nodo inicial hasta la solución) es d, los órdenes de magnitud de las complejidades espacial y temporal son:
 
        ----        | Anchura | Profundidad | Bidireccional
        Espacial    | O(b^d)  | O(b . d)    | O(b^d/2)
        Temporal    | O(b^d)  | O(b^d)      | O(b^d/2

    O sea, la búsqueda en anchura tiene complejidad espacial y temporal exponencial en la profundidad, la búsqueda en profundidad tiene complejidad espacial lineal y temporal exponencial, y la bidireccional es exponencial pero en orden d/2.
    */
}

export class Control implements Control {

    abierta: Arbol[] = [];
    tabla_a: HashData = {};

    espacioBusqueda = new Arbol();
    estadoInicial: Arbol;
    metas: Arbol[] = [];

    busquedaHeuristica(): Arbol[] {
        throw new Error("Method not implemented.");
    }

    camino(inicio: Arbol, destino: Arbol): Arbol[] {

        console.log("\t - Camino desde/a: ", inicio.Id(), destino.Id());

        let index = 0;
        let nodo: Arbol = destino;
        const camino: Arbol[] = [];
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

    creaNodo(valor: string, objetivo: boolean = false): Arbol {

        const g = new Estado();
        g.esObjetivo = () => objetivo;
        g.modelo = new Modelo();
        g.modelo.dominio = new Dominio({});
        g.modelo.dominio.base = valor;
        const gs = new Arbol();
        gs.nodo = g;
        gs.profundidad = 1;
        return gs;
    }

    imprimir(abierta: boolean, tabla_a: boolean)
    {
        if (abierta) console.log("\t\t - Abierta", this.abierta.map(a => a.Id()))
        if (tabla_a) console.log("\t\t - Tabla_A",
            Object.keys(this.tabla_a)
                .map(a => this.imprimir_tabla_a(a)
            )
        );
    }

    imprimir_tabla_a(ta: TablaA_Id) {

        const i = this.tabla_a[ta];
        if (!i) return "[T_a vacía]";
        return `[${i.anterior?.Id() || " - "}]->[${ta}]: coste(inicio, n): ${i.coste_desde_inicio} - p: ${i.profundidad || " - "}`;
    }
}

