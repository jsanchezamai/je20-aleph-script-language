import { Control } from "./control";
import { Operador } from "./operador";

export class AEstrella extends Control {

    test() {

        const N1 = this.creaNodo("N1");
        const N2 = this.creaNodo("N2", true);
        const N3 = this.creaNodo("N3");
        const N4 = this.creaNodo("N4");
        const N5 = this.creaNodo("N5");
        const N6 = this.creaNodo("N6");
        const N7 = this.creaNodo("N7");

        N1.arcos.push(new Operador(200, N2));
        N1.arcos.push(new Operador(30, N3));
        N1.arcos.push(new Operador(40, N4));
        N1.arcos.push(new Operador(200, N5));
        N1.arcos.push(new Operador(325, N6));
        N1.arcos.push(new Operador(250, N7));

        N2.arcos.push(new Operador(25, N3));
        N2.arcos.push(new Operador(100, N7));

        N4.arcos.push(new Operador(35, N3));
        N4.arcos.push(new Operador(150, N5));

        N5.arcos.push(new Operador(100, N6));

        N7.arcos.push(new Operador(25, N6));

        this.estadoInicial = N1;

        const metas = this.busquedaNoInformada();

        metas.forEach(m => console.log(" >> ", m.Id(), this.tabla_a[m.Id()].profundidad, this.tabla_a[m.Id()]?.coste_desde_inicio));

        const esperado = ["C", "D", "A"];
        const obtenido = metas.map(m => m.Id());

        const assert = esperado.every((element, index) => element === obtenido[index]);
        console.log("Test: ", assert);

        if (!assert) {
            console.log("Esperado", esperado, "obtenido", obtenido);
        }

    }
}