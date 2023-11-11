"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALEPHSCRIPT_i18 = void 0;
const as_situada_i18_1 = require("./situada/as-situada-i18");
const as_simbolica_i18_1 = require("./simbolica/as-simbolica-i18");
const as_conexionista_i18_1 = require("./conexionista/as-conexionista-i18");
const turing_test_i18_1 = require("../agents/turing-test-i18");
const cientifica_i18_1 = require("./cientifica/cientifica-i18");
const navigation_i18_1 = require("../navigation/navigation-i18");
const engine_i18_1 = require("../engine/engine-i18");
const mundos_i18_1 = require("../mundos/mundos-i18");
const as_hibrida_i18_1 = require("./hibrido/as-hibrida-i18");
exports.ALEPHSCRIPT_i18 = {
    ...engine_i18_1.AS_ENGINE_i18,
    ...navigation_i18_1.AS_MENU_i18,
    ...turing_test_i18_1.AS_TURING_TEST_i18,
    ...mundos_i18_1.AS_MUNDO_i18,
    ...cientifica_i18_1.AS_CIENTIFICA_i18,
    ...as_situada_i18_1.AS_SITUADA_i18,
    ...as_simbolica_i18_1.AS_SIMBOLICA_i18,
    ...as_conexionista_i18_1.AS_CONEXIONISTA_i18,
    ...as_hibrida_i18_1.AS_HIBRIDA_i18
};
