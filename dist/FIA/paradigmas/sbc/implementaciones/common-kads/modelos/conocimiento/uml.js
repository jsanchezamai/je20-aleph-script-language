"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UML = void 0;
const dominio_1 = require("../../../../../../mundos/dominio");
const modelo_1 = require("../../../../../../mundos/modelo");
const as_common_kads_i18_1 = require("../../as-common-kads-i18");
class UML {
    constructor() { }
    modelar(f) {
        const modelo = new modelo_1.Modelo();
        const dominio = new dominio_1.Dominio(modelo);
        dominio.base["Common.Kads.uml"] = {};
        return {
            dominio,
            imprimir: () => as_common_kads_i18_1.AS_COMMON_KADS_I18.COMMON_KADS.CK.FASES.CONCEPTUAL.UML
        };
    }
}
exports.UML = UML;
