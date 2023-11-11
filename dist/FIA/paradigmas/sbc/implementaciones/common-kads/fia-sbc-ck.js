"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBC_CK = void 0;
const agentMessage_1 = require("../../../../agentMessage");
const mundo_1 = require("../../../../mundos/mundo");
const as_common_kads_i18_1 = require("./as-common-kads-i18");
const common_kads_1 = require("./common-kads");
class SBC_CK {
    constructor() {
        this.i18 = as_common_kads_i18_1.AS_COMMON_KADS_I18.COMMON_KADS;
        this.nombre = this.i18.NOMBRE;
        this.commonkads = new common_kads_1.CK();
    }
    async instanciar() {
        return new Promise(async (resolve, reject) => {
            console.log((0, agentMessage_1.agentMessage)(this.nombre, this.i18.CABECERA));
            // try {
            const m = new mundo_1.Mundo();
            const resultado = await this
                .commonkads
                .instanciar(m.modelo);
            resolve(resultado.comoModelo().imprimir());
            // } catch(ex) {
            //    reject(ex.message);
            //}
            console.log((0, agentMessage_1.agentMessage)(this.nombre, this.i18.PIE));
        });
    }
}
exports.SBC_CK = SBC_CK;
