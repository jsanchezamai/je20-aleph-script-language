"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aplicacion = void 0;
const agentMessage_1 = require("../../../../agentMessage");
const as_common_kads_i18_1 = require("../../implementaciones/common-kads/as-common-kads-i18");
class Aplicacion {
    constructor() {
        this.i18 = as_common_kads_i18_1.AS_COMMON_KADS_I18.COMMON_KADS.SISTEMA.APLICACION;
        this.nombre = this.i18.NOMBRE;
    }
    async iniciar(estado) {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.CABECERA}`));
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.PIE}`));
        return estado;
    }
}
exports.Aplicacion = Aplicacion;
