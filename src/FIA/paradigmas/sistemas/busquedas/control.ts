import { Dominio } from "../../../mundos/dominio";
import { Modelo } from "../../../mundos/modelo";
import { Estado } from './estado';
import { Operador } from "./operador";
import { Lectura } from '../../simbolica/modelos/formal/sistema/base-experta/dominio/tipos';

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
    metas: GrafoS[];

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

export class PrimeroEnAnchura extends Control {

    // Siempre encuentra la solución
    // Si, encuentra la solución más cercana
    // a la raíz
    completo: true;

    // Siempre encuentra la solución óptima
    // Si el coste es igual para todos los arcos
    // entonces sí sería admisible.
    admisible: false;

    busquedaNoInformada(): GrafoS[] {

        console.log("Búsqueda no informada. Primero en anchura");

        this.abierta = [this.estadoInicial];

        this.tabla_a[this.estadoInicial?.Id()] = {
            anterior: null,
            coste_desde_inicio: 0
        };

        while(this.abierta.length > 0) {

            console.log("\t - Abierta: ", this.abierta.length);
            const n = this.abierta.splice(0, 1)[0];

            console.log("\t - Nodo n: ", n.Id());
            if (n.nodo.esObjetivo())
            {
                console.log("\t - esObjetivo: ", n.Id());
                this.metas = this.camino(this.estadoInicial, n);
                return this.metas;
            }

            const S = n.arcos;
            S.forEach(q => {
                console.log("\t - Sucesor q: ", q.nodo.Id());
                const ta = {
                    anterior: n,
                    coste_desde_inicio: (this.tabla_a[n.Id()]?.coste_desde_inicio || 0) + q.coste
                }

                this.tabla_a[q.nodo.Id()] = ta;
                this.abierta.push(q.nodo);
            });
        }

        return this.metas;
    }

    test() {

        const gsF = this.creaNodo("F");
        const gsC = this.creaNodo("C", true);
        const gsE = this.creaNodo("E");
        const gsD = this.creaNodo("D");
        const gsB = this.creaNodo("B");
        const gs = this.creaNodo("A");

        gs.arcos.push(new Operador(2, gsB, gs.profundidad + 1));
        gs.arcos.push(new Operador(5, gsD, gs.profundidad + 1));
        gs.arcos.push(new Operador(3, gsE, gs.profundidad + 1));

        gsD.arcos.push(new Operador(4, gsC, gsD.profundidad + 1));
        gsE.arcos.push(new Operador(2, gsF, gsE.profundidad + 1));

        this.estadoInicial = gs;

        const metas = this.busquedaNoInformada();

        metas.forEach(m => console.log(" >> ", m.Id(), m.profundidad, this.tabla_a[m.Id()].coste_desde_inicio));

        const esperado = ["C", "D", "A"];
        const obtenido = metas.map(m => m.Id());

        const assert = esperado.every((element, index) => element === obtenido[index]);
        console.log("Test: ", assert);

        if (!assert) {
            console.log("Esperado", esperado, "obtenido", obtenido);
        }

    }

}

export class PrimeroEnProfundidad extends Control {

    maximaProfundidad: number = 10;
    /**
     * La búsqueda en profundidad no es ni completa ni admisible
     * (puede entrar en una rama infinita y nunca llegar a una solución).
     * Ni poniendo una profundidad límite se garantiza la completitud.
     */
    // Siempre encuentra la solución
    completo: false;

    // Siempre encuentra la solución óptima
    admisible: false;

    busquedaNoInformada(): GrafoS[] {

        console.log("Búsqueda no informada. Primero en profunidad");

        this.abierta = [this.estadoInicial];

        this.tabla_a[this.estadoInicial?.Id()] = {
            anterior: null,
            coste_desde_inicio: 0,
            profundidad: 0
        };

        while(this.abierta.length > 0) {

            console.log("\t - Abierta: ", this.abierta.length);
            const n = this.abierta.pop();

            console.log("\t - Nodo n: ", n.Id());
            if (n.nodo.esObjetivo())
            {
                console.log("\t - esObjetivo: ", n.Id());
                this.metas = this.camino(this.estadoInicial, n);
                return this.metas;
            }

            let S = []
            if (n.profundidad < this.maximaProfundidad) {
                S = n.arcos;
            }

            if (S.length == 0) {
                const p = this.tabla_a[n.Id()]?.anterior;
                const limpiar = p.arcos.filter(c => this.abierta.find(a => a.Id() == c.nodo.Id())).length > -1;
                if (limpiar) {
                    // console.log("\t Limpiar", p.Id(), this.tabla_a);
                    delete this.tabla_a[p.Id()];
                    // console.log("\t Limpiado", p.Id(), this.tabla_a);
                }
            }

            S.forEach(q => {
                console.log("\t - Sucesor q: ", q.nodo.Id());
                const ta = {
                    anterior: n,
                    coste_desde_inicio: (this.tabla_a[n.Id()]?.coste_desde_inicio || 0) + q.coste,
                    profundidad: (this.tabla_a[n.Id()]?.profundidad || 0) + 1
                }

                this.tabla_a[q.nodo.Id()] = ta;
                this.abierta.push(q.nodo);
            });
        }

        return this.metas;
    }

    test() {

        const gsF = this.creaNodo("F");
        const gsC = this.creaNodo("C", true);
        const gsE = this.creaNodo("E");
        const gsD = this.creaNodo("D");
        const gsB = this.creaNodo("B");
        const gs = this.creaNodo("A");

        gs.arcos.push(new Operador(2, gsB, gs.profundidad + 1));
        gs.arcos.push(new Operador(5, gsD, gs.profundidad + 1));
        gs.arcos.push(new Operador(3, gsE, gs.profundidad + 1));

        gsD.arcos.push(new Operador(4, gsC, gsD.profundidad + 1));
        gsE.arcos.push(new Operador(2, gsF, gsE.profundidad + 1));

        this.estadoInicial = gs;

        const metas = this.busquedaNoInformada();

        metas.forEach(m => console.log(" >> ", m.Id(), m.profundidad, this.tabla_a[m.Id()]?.coste_desde_inicio));

        const esperado = ["C", "D", "A"];
        const obtenido = metas.map(m => m.Id());

        const assert = esperado.every((element, index) => element === obtenido[index]);
        console.log("Test: ", assert);

        if (!assert) {
            console.log("Esperado", esperado, "obtenido", obtenido);
        }

    }
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