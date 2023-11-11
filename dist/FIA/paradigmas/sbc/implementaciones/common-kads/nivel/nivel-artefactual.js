"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKNivelArtefactual = void 0;
const disenyo_1 = require("../modelos/disenyo/disenyo");
class CKNivelArtefactual {
    constructor() {
        this.disenyo = new disenyo_1.Disenyo();
    }
    formularios() {
        return [
            ...this.disenyo.formularios
        ];
    }
    sistema(e) {
        return {
            disenyo: this.disenyo,
            arquitectura: this.disenyo.arquitectura(e),
            plataforma: this.disenyo.plataforma(e),
            componentes: this.disenyo.componentes(e),
            aplicacion: this.disenyo.aplicacion(e)
        };
    }
}
exports.CKNivelArtefactual = CKNivelArtefactual;
