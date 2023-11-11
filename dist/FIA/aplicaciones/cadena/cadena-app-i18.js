"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CADENA_i18 = void 0;
const cadena_mundo_i18_1 = require("./mundo/cadena-mundo-i18");
const cadena_situada_i18_1 = require("./situada/cadena-situada-i18");
const cadena_simbolica_i18_1 = require("./simbolica/cadena-simbolica-i18");
const cadena_conexionista_i18_1 = require("./conexionista/cadena-conexionista-i18");
exports.APP_CADENA_i18 = {
    CADENA: {
        NOMBRE: "cadena-app",
        SIMULATION_START: "Modelización cadena de producción. ¡Arrancando simulación!",
        SIMULATION_BODY: "Modelo resultante",
        SIMULATION_END: "¡La aplicación ha concluído y se cierra!",
        TEST: {
            PROBAR_START_LABEL: "¡Arrancando secuencia de pruebas!",
            PROBAR_END_LABEL: "¡La secuencia de pruebas ha concluído!",
            CASO: {
                START_LABEL: "\n\t - Lanzando caso: ",
                BODY_LABEL: "\n\t - Evaluando caso: ",
                END_LABEL: "\n\t - Resultado caso: ",
                BUCLE: {
                    CREAR_REGLA_LABEL: "Creada regla:"
                }
            }
        },
        ...cadena_mundo_i18_1.CADENA_MUNDO_i18,
        ...cadena_situada_i18_1.CADENA_SITUADA_i18,
        ...cadena_simbolica_i18_1.CADENA_SIMBOLICA_i18,
        ...cadena_conexionista_i18_1.CADENA_CONEXIONISTA_i18
    }
};
