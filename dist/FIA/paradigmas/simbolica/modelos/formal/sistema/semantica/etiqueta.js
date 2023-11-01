"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtiquetaDescriptiva = exports.EtiquetaEstructural = exports.RelacionDescriptiva = exports.RelacionEstructural = void 0;
class RelacionEstructural {
    constructor() {
        this.nombre = "";
        this.valor = "";
    }
}
exports.RelacionEstructural = RelacionEstructural;
class RelacionDescriptiva {
}
exports.RelacionDescriptiva = RelacionDescriptiva;
class EtiquetaEstructural {
    constructor() {
        this.estado = new RelacionEstructural();
    }
}
exports.EtiquetaEstructural = EtiquetaEstructural;
class EtiquetaDescriptiva {
    constructor() {
        this.estado = new RelacionDescriptiva();
    }
}
exports.EtiquetaDescriptiva = EtiquetaDescriptiva;
