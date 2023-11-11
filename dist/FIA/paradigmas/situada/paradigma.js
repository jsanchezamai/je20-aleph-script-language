"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IASituada = void 0;
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const fia_situada_1 = require("./fia-situada");
var IASituada;
(function (IASituada) {
    IASituada.fiaSituada = new fia_situada_1.FIASituada();
    IASituada.fiaSituada.nombre = aleph_script_i18_1.i18.FIA_SITUADA_LABEL;
    IASituada.fiaSituada.razona =
        (w, i) => {
            return "Sí";
        };
})(IASituada || (exports.IASituada = IASituada = {}));
