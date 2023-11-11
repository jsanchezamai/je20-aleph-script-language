"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisBlock = exports.FIA = void 0;
const aleph_script_i18_1 = require("./i18/aleph-script-i18");
const mundo_1 = require("./mundos/mundo");
class FIA {
    constructor() {
        this.nombre = "FIA";
        this.runAsync = false;
        this.mundo = new mundo_1.Mundo();
    }
    imprimir() {
        return `${aleph_script_i18_1.i18.LOOP.NOT_INIT_LABEL}`;
    }
    async instanciar() {
        return await new Promise((resolve, reject) => {
            try {
                resolve(`${aleph_script_i18_1.i18.LOOP.NOT_INIT_LABEL}`);
            }
            catch (ex) {
                return reject(ex.message);
            }
        });
    }
    razona(mundo, i) {
        const eferenciaVacia = "";
        return eferenciaVacia;
    }
}
exports.FIA = FIA;
class GenesisBlock extends FIA {
    constructor() {
        super(...arguments);
        this.objetivos = [];
        this.nombre = "FIA_Genesis";
    }
}
exports.GenesisBlock = GenesisBlock;
