"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaAutomata = void 0;
const labels_1 = require("../../../i18/labels");
const paradigma_1 = require("../../../paradigmas/situada/paradigma");
const cadena_modelo_1 = require("../cadena-modelo");
const cadena_fia_situada_1 = require("./cadena-fia-situada");
const cadena_mundo_1 = require("../cadena-mundo");
const cadena_estado_1 = require("./cadena-estado");
class CadenaAutomata extends paradigma_1.Automata {
    constructor() {
        super(...arguments);
        this.nombre = labels_1.i18.APPS.CADENA.SITUADA.AUTOMATA.NOMBRE;
    }
    configurar() {
        this.mundo = new cadena_mundo_1.CadenaMundo();
        this.mundo.modelo = new cadena_modelo_1.CadenaModelo();
        this.mundo.nombre = labels_1.i18.APPS.CADENA.SITUADA.NOMBRE;
        this.mundo.modelo.muerte = cadena_fia_situada_1.TOPE_POSICION;
        this.estado = new cadena_estado_1.CadenaEstado(this.mundo.modelo);
        this.nombre = labels_1.i18.APPS.CADENA.SITUADA.AUTOMATA.NOMBRE;
        super.configurar();
    }
}
exports.CadenaAutomata = CadenaAutomata;
