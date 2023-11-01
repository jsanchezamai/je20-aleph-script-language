"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arcos = exports.ArcoEstructural = exports.ArcoDescriptivo = exports.Arco = void 0;
const etiqueta_1 = require("./etiqueta");
class Arco {
}
exports.Arco = Arco;
class ArcoDescriptivo {
    constructor() {
        this.etiqueta = new etiqueta_1.EtiquetaDescriptiva();
    }
}
exports.ArcoDescriptivo = ArcoDescriptivo;
class ArcoEstructural extends Arco {
    constructor() {
        super(...arguments);
        this.etiqueta = new etiqueta_1.EtiquetaEstructural();
    }
}
exports.ArcoEstructural = ArcoEstructural;
class Arcos {
    constructor() {
        this.estado = [];
    }
}
exports.Arcos = Arcos;
