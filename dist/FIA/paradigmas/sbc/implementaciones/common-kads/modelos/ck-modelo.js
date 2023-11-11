"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKModelo = void 0;
class CKModelo {
    imprimir() {
        const estado = "\t\t -" + this.formularios
            .map(f => f.imprimir())
            .join("\n\t\t\t -");
        return `${estado}`;
    }
}
exports.CKModelo = CKModelo;
