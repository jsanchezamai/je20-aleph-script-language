"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIA_SBC = void 0;
const genesis_block_1 = require("../../genesis-block");
const agentMessage_1 = require("../../agentMessage");
const as_sbc_i18_1 = require("./as-sbc-i18");
const fia_sbc_ck_1 = require("./implementaciones/common-kads/fia-sbc-ck");
class FIA_SBC extends genesis_block_1.GenesisBlock {
    constructor() {
        super(...arguments);
        this.i18 = as_sbc_i18_1.AS_SBC_I18;
        this.runAsync = true;
        this.nombre = this.i18.NOMBRE;
    }
    async instanciar() {
        return new Promise(async (resolve, reject) => {
            console.log((0, agentMessage_1.agentMessage)(this.nombre, this.i18.CABECERA));
            // try {
            const ck = new fia_sbc_ck_1.SBC_CK();
            const resultado = await ck.instanciar();
            resolve(resultado);
            //} catch(ex) {
            //    reject(ex.message);
            //}
            console.log((0, agentMessage_1.agentMessage)(this.nombre, this.i18.PIE));
        });
    }
}
exports.FIA_SBC = FIA_SBC;
