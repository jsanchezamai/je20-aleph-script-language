"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18 = exports.i18_ME = void 0;
const cadena_app_i18_1 = require("../aplicaciones/cadena/cadena-app-i18");
const alephscript_i18_1 = require("../paradigmas/alephscript-i18");
exports.i18_ME = {
    ME_LABEL: "sistema",
};
exports.i18 = {
    ME_LABEL: exports.i18_ME.ME_LABEL,
    ...alephscript_i18_1.ALEPHSCRIPT_i18,
    APPS: {
        ME_LABEL: `app.manager.${exports.i18_ME.ME_LABEL}`,
        START: 'App inicia',
        BODY: 'App ejecutándose',
        END: 'App acaba',
        ...cadena_app_i18_1.APP_CADENA_i18
    }
};
