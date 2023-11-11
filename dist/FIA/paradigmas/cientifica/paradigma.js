"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IACientifica = void 0;
const genesis_block_1 = require("../../genesis-block");
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const turing_test_1 = require("../../agents/turing-test");
var IACientifica;
(function (IACientifica) {
    IACientifica.fiaFuerte = new genesis_block_1.GenesisBlock();
    IACientifica.fiaFuerte.nombre = aleph_script_i18_1.i18.CIENTIFICA.FUERTE_LABEL;
    IACientifica.fiaFuerte.razona =
        (w, i) => {
            return "Sí";
        };
    IACientifica.fiaFuerte.imprimir = () => {
        const tester = new turing_test_1.TuringTester();
        return `${tester.test(IACientifica.fiaFuerte)}`;
    };
    IACientifica.fiaDebil = new genesis_block_1.GenesisBlock();
    IACientifica.fiaDebil.nombre = aleph_script_i18_1.i18.CIENTIFICA.DEBIL_LABEL;
    IACientifica.fiaDebil.razona =
        (w, i) => {
            return "No";
        };
    IACientifica.fiaDebil.imprimir = () => {
        const tester = new turing_test_1.TuringTester();
        return `${tester.test(IACientifica.fiaDebil)}`;
    };
})(IACientifica || (exports.IACientifica = IACientifica = {}));
