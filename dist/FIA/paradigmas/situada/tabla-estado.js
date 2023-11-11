"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaEstado = void 0;
class TablaEstado {
    constructor() {
        this.tabla = [];
    }
    procesarAferencia(a) {
        const posicion = this.tabla.findIndex(e => e.estado.aferente === a);
        if (posicion > -1) {
            return this.tabla[posicion].estado.eferente;
        }
        else {
            return null;
        }
    }
}
exports.TablaEstado = TablaEstado;
