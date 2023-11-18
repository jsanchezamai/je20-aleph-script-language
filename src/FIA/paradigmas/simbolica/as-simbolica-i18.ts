import { AS_MARCOS_i18 } from "./modelos/conceptual/sistema/as-marcos-i18.ts"
import { AS_SEMANTICA_i18 } from "./modelos/formal/sistema/semantica/as-semantica-i18.ts";

export const AS_SIMBOLICA_i18 = {

    FIA_SIMBOLICA_LABEL: "simbolica",

    SIMBOLICA: {
        ...AS_SEMANTICA_i18,
        ...AS_MARCOS_i18
    },

}