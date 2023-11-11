"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grafo = exports.Entidad = void 0;
const arco_1 = require("./arco");
class Entidad {
    constructor() {
        this.nombre = "entidad";
        this.valor = "entidad";
    }
    imprimir() {
        return this.nombre;
    }
}
exports.Entidad = Entidad;
class Grafo {
    constructor() {
        this.arcos = new arco_1.Arcos();
    }
    imprimir() {
        let out = "";
        out += "\n\t - (grafo) -" + this.nombre + "; arcos";
        this.arcos.estado.forEach(e => {
            out += "\n\t\t - " + e.etiqueta.estado.nombre;
        });
        return out;
    }
    async encontrar(b) {
        b.camino.push(this);
        if (this.nombre == b.destino) {
            b.encontrado = true;
            return null;
        }
        if (this.arcos.estado.length == 0) {
            return null;
        }
        const candidatos = this.arcos.estado
            .map(async (a) => {
            /* console.log(
                i18.SIMBOLICA.SEMANTICA.BUSQUEDA.COMPARANDO
                    .replace("entidad", a.destino.nombre)
                    .replace("etiqueta", a.etiqueta.estado.valor)
                    .replace("valor", "")
            ); */
            //  && a.etiqueta.estado.nombre === etiqueta
            if (a.destino.nombre == b.destino) {
                return a.destino;
            }
            else {
                return await a.destino.encontrar(b);
            }
        });
        return await Promise.race(candidatos);
    }
}
exports.Grafo = Grafo;
