"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arcos = exports.ArcoEstructural = exports.ArcoDescriptivo = exports.Arco = exports.EtiquetaDescriptiva = exports.EtiquetaEstructural = exports.RelacionDescriptiva = exports.RelacionEstructural = void 0;
class RelacionEstructural {
    constructor() {
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
class Arco {
}
exports.Arco = Arco;
class ArcoDescriptivo {
    constructor() {
        this.etiqueta = new EtiquetaDescriptiva();
    }
}
exports.ArcoDescriptivo = ArcoDescriptivo;
class ArcoEstructural extends Arco {
    constructor() {
        super(...arguments);
        this.etiqueta = new EtiquetaEstructural();
    }
}
exports.ArcoEstructural = ArcoEstructural;
class Arcos {
    constructor() {
        this.estado = [];
    }
}
exports.Arcos = Arcos;
