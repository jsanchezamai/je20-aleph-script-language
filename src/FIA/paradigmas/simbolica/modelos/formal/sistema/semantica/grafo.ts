import { i18 } from "../../../../../../i18/labels";
import { IBaseConocimiento } from "../../../../paradigma";
import { IArcos, Arcos } from "./arco";


export interface IEstado {
    nombre: string;
    valor: string;
}

export interface IConcepto extends IEstado {
}

export interface IEntidad extends IEstado {
    imprimir(): void;
}

export class Entidad implements IEntidad {
    nombre = "entidad";
    valor = "entidad";

    imprimir() {
        return this.nombre;
    }

}

export interface IGrafo extends IBaseConocimiento {

    nombre: string;

    arcos: IArcos;

    imprimir(): string;

    encontrar(etiqueta: string, destino: string, camino: IGrafo[]): Promise<IGrafo>;
}

export class Grafo implements IGrafo {

    base: IBaseConocimiento;

    nombre: string;

    arcos: IArcos = new Arcos();

    imprimir(): string {

        let out = "";
        out += "\n\t - (grafo) -" + this.nombre + "; arcos";
        this.arcos.estado.forEach(e => {
            out += "\n\t\t - " + e.etiqueta.estado.nombre;
        });
        return out;
    }

    async encontrar(etiqueta: string, destino: string, camino: IGrafo[]): Promise<IGrafo> {

        camino.push(this);

        if (this.nombre == destino) {
            console.log("Objetivo encontrado!", this.nombre);
            return this;
        }

        if (this.arcos.estado.length == 0) {
            console.log("Fin de rama. El destino:", this.nombre, "fallido.");
            return null;
        }

        const candidatos = this.arcos.estado
            .map(async a => {
                console.log(
                    i18.SIMBOLICA.SEMANTICA.BUSQUEDA.COMPARANDO
                        .replace("entidad", a.destino.nombre)
                        .replace("etiqueta", a.etiqueta.estado.nombre)
                        .replace("valor", a.etiqueta.estado.valor)
                );
                console.log(a.etiqueta.estado)

            //  && a.etiqueta.estado.nombre === etiqueta

            if (a.destino.nombre == destino) {
                return a.destino;
            } else {
                return await a.destino.encontrar(etiqueta, destino, camino);
            }
        });

        return await Promise.race(candidatos);
    }

}