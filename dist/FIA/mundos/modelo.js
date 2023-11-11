"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modelo = exports.BASE_MUNDO_PULSO = void 0;
const dominio_1 = require("./dominio");
exports.BASE_MUNDO_PULSO = 10000;
class Modelo {
    constructor() {
        this.nombre = "<Modelo Vacío>";
        this.dia = 0;
        this.muerte = 3;
        this.pulso = exports.BASE_MUNDO_PULSO;
        this.dominio = new dominio_1.Dominio({});
    }
    imprimir() {
        return Object
            .keys(this).map(k => {
            let out = "";
            if (typeof this[k] === "object") {
                out = `${k}: ${JSON.stringify(this[k])}`;
            }
            else {
                out = `${k}: ${this[k]}`;
            }
            return out;
        }).join("\n\t\t -");
    }
}
exports.Modelo = Modelo;
