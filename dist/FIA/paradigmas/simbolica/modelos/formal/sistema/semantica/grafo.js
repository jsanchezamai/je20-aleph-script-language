"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grafo = exports.Entidad = void 0;
const labels_1 = require("../../../../../../i18/labels");
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
    async encontrar(etiqueta, destino, camino) {
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
            .map(async (a) => {
            console.log(labels_1.i18.SIMBOLICA.SEMANTICA.BUSQUEDA.COMPARANDO
                .replace("entidad", a.destino.nombre)
                .replace("etiqueta", a.etiqueta.estado.nombre)
                .replace("valor", a.etiqueta.estado.valor));
            console.log(a.etiqueta.estado);
            //  && a.etiqueta.estado.nombre === etiqueta
            if (a.destino.nombre == destino) {
                return a.destino;
            }
            else {
                return await a.destino.encontrar(etiqueta, destino, camino);
            }
        });
        return await Promise.race(candidatos);
    }
}
exports.Grafo = Grafo;
