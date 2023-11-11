"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CADENA_SIMBOLICA_i18 = void 0;
const cadena_dominio_1 = require("./formal/cadena-dominio");
exports.CADENA_SIMBOLICA_i18 = {
    SIMBOLICA: {
        NOMBRE: "cadena.simbolica",
        SEMANTICA: {
            NOMBRE: "cadena.simbolica.semantica.red",
        },
        SIMULATION_START: "Creando la red semántica...",
        SIMULATION_BODY: "Modelo resultante",
        SIMULATION_END: "¡Simulación finalizada!",
        ...cadena_dominio_1.CADENA_DOMINIO_i18,
        RED: {
            NOMBRE: "cadena.simbolica.red",
        }
    }
};
