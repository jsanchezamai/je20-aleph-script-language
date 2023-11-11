"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaModelo = void 0;
const modelo_1 = require("../../../mundos/modelo");
const aleph_script_i18_1 = require("../../../i18/aleph-script-i18");
class CadenaModelo extends modelo_1.Modelo {
    constructor() {
        super(...arguments);
        this.nombre = "Cadena de producción";
        this.posicion = 0;
    }
    imprimir() {
        console.log("Imprimir the cadena modelo");
        const result = Object
            .keys(this).map(k => {
            var _a;
            let out = "";
            if (typeof this[k] === "object") {
                const dominioA = this.dominio['modelo.motor.eventos'] || {};
                if (dominioA) {
                    out = (_a = dominioA['inferencias.openai']) === null || _a === void 0 ? void 0 : _a.respuesta;
                    out = `${aleph_script_i18_1.i18.APPS.CADENA.MUNDO.AFERENCIA.AFERENCIA_RECOMENDACIONES_LABEL} \n\t -${out || '----'}\n`;
                }
                else {
                    out = `${k}: ${Object.keys(this[k]).join(" - ")}`;
                }
            }
            else {
                out = `${k}: ${this[k]}`;
            }
            return out || '---';
        }).join("\n\t\t -");
        return result || '--';
    }
}
exports.CadenaModelo = CadenaModelo;
