"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaAutomata = void 0;
const aleph_script_i18_1 = require("../../../i18/aleph-script-i18");
const automata_1 = require("../../../paradigmas/situada/automata");
const cadena_estado_1 = require("./cadena-estado");
const cadena_fia_situada_1 = require("./cadena-fia-situada");
class CadenaAutomata extends automata_1.Automata {
    constructor() {
        super(...arguments);
        this.nombre = aleph_script_i18_1.i18.APPS.CADENA.SITUADA.AUTOMATA.NOMBRE;
    }
    configurar() {
        this.mundo.modelo.pulso = 1000;
        this.mundo.modelo.muerte = cadena_fia_situada_1.TOPE_POSICION;
        this.estado = new cadena_estado_1.CadenaEstado(this.mundo.modelo);
        this.nombre = aleph_script_i18_1.i18.APPS.CADENA.SITUADA.AUTOMATA.NOMBRE;
        super.configurar();
    }
}
exports.CadenaAutomata = CadenaAutomata;
