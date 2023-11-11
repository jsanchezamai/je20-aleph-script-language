"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AS_SBC_I18 = void 0;
const as_common_kads_i18_1 = require("./implementaciones/common-kads/as-common-kads-i18");
exports.AS_SBC_I18 = {
    NOMBRE: "fia.sbc",
    CABECERA: "Lanzando un sistema basado en conocimiento de tipo CommonKADS...",
    PIE: "¡Cerrando SBC!",
    IMPLEMENTACIONES: {
        ...as_common_kads_i18_1.AS_COMMON_KADS_I18
    }
};
