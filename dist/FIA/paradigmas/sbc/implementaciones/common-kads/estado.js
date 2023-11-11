"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoT = exports.Estado = void 0;
class Estado {
    constructor(modelo) {
        this.modelo = modelo;
    }
    comoModelo() {
        return this.modelo;
    }
    ;
    deModelo(e) {
        this.modelo = e;
    }
    transicion(e) {
        this.modelo = e.comoModelo();
    }
}
exports.Estado = Estado;
class EstadoT extends Estado {
}
exports.EstadoT = EstadoT;
