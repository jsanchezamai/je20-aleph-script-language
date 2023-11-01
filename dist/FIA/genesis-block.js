"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisBlock = exports.FIA = void 0;
const labels_1 = require("./i18/labels");
class FIA {
    constructor() {
        this.runAsync = false;
        this.nombre = "FIA";
    }
    imprimir() {
        return `${labels_1.i18.LOOP.NOT_INIT_LABEL}`;
    }
    async instanciar() {
        return await new Promise((resolve, reject) => {
            try {
                resolve(`${labels_1.i18.LOOP.NOT_INIT_LABEL}`);
            }
            catch (ex) {
                return reject(ex.message);
            }
        });
    }
}
exports.FIA = FIA;
class GenesisBlock extends FIA {
    constructor() {
        super(...arguments);
        this.nombre = "FIA_Genesis";
    }
}
exports.GenesisBlock = GenesisBlock;
