import { APP_CADENA_i18 } from '../aplicaciones/cadena/cadena-app-i18';
import { ALEPHSCRIPT_i18 } from '../paradigmas/alephscript-i18';

export const i18_ME = {

    ME_LABEL: "sistema",

}

export const i18 = {

    ME_LABEL: i18_ME.ME_LABEL,

    ...ALEPHSCRIPT_i18,

    APPS: {
        ...APP_CADENA_i18
    }

}
