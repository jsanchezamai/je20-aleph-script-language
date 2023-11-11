"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAHibrida = void 0;
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const fia_hibrida_1 = require("./fia-hibrida");
var IAHibrida;
(function (IAHibrida) {
    IAHibrida.fiaHibrida = new fia_hibrida_1.FIAHibrida();
    IAHibrida.fiaHibrida.nombre = aleph_script_i18_1.i18.FIA_SITUADA_LABEL;
    IAHibrida.fiaHibrida.razona =
        (w, i) => {
            return "Sí";
        };
})(IAHibrida || (exports.IAHibrida = IAHibrida = {}));
