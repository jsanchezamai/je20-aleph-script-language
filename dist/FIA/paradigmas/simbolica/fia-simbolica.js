"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIASimbolica = void 0;
const genesis_block_1 = require("../../genesis-block");
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
class FIASimbolica extends genesis_block_1.GenesisBlock {
}
exports.FIASimbolica = FIASimbolica;
(function (FIASimbolica) {
    FIASimbolica.fiaSimbolica = new FIASimbolica();
    FIASimbolica.fiaSimbolica.nombre = aleph_script_i18_1.i18.FIA_SIMBOLICA_LABEL;
    FIASimbolica.fiaSimbolica.razona =
        (w, i) => {
            return "No";
        };
})(FIASimbolica || (exports.FIASimbolica = FIASimbolica = {}));
