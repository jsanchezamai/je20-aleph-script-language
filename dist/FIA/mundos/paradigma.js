"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modelo = void 0;
class Modelo {
    constructor() {
        this.nombre = "Modelo base. 3 días; pulso: 1 segundo";
        this.dia = 0;
        this.muerte = 3;
        this.pulso = 30000;
    }
    imprimir() {
        return Object
            .keys(this).map(k => `${k}: ${this[k]}`).join("\n\t\t -");
    }
}
exports.Modelo = Modelo;
