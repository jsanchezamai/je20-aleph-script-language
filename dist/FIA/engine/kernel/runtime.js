"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = exports.menuOption = exports.EXIT_PROMPT_INDEX = void 0;
const genesis_block_1 = require("../../genesis-block");
const paradigma_1 = require("../../paradigmas/cientifica/paradigma");
const aleph_script_i18_1 = require("../../i18/aleph-script-i18");
const systemMessage_1 = require("../../systemMessage");
const agentMessage_1 = require("../../agentMessage");
const readline = __importStar(require("readline"));
const cadena_app_1 = require("../../aplicaciones/cadena/cadena-app");
const paradigma_2 = require("../../paradigmas/situada/paradigma");
const fia_conexionista_1 = require("../../paradigmas/conexionista/fia-conexionista");
const fia_simbolica_1 = require("../../paradigmas/simbolica/fia-simbolica");
const fia_sbc_1 = require("../../paradigmas/sbc/fia-sbc");
exports.EXIT_PROMPT_INDEX = 99;
function menuOption(message) {
    return `\t - ${message}`;
}
exports.menuOption = menuOption;
/**
 * Motor de FIAs
 */
class Runtime {
    start() {
        const fia = new genesis_block_1.FIA();
        Runtime.threads.push(fia);
        const gb = new genesis_block_1.GenesisBlock();
        Runtime.threads.push(gb);
        /**
         * BASE
         */
        Runtime.threads.push(paradigma_1.IACientifica.fiaDebil);
        Runtime.threads.push(paradigma_1.IACientifica.fiaFuerte);
        Runtime.threads.push(fia_simbolica_1.FIASimbolica.fiaSimbolica);
        Runtime.threads.push(paradigma_2.IASituada.fiaSituada);
        Runtime.threads.push(fia_conexionista_1.FIAConexionista.fiaConexionista);
        Runtime.threads.push(new fia_sbc_1.FIA_SBC());
        /**
         * APPS
         */
        const cadenaApp = new cadena_app_1.CadenaApp();
        Runtime.threads.push(cadenaApp);
    }
    async demo() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let app;
        let cpu = 0;
        const waitForUserInput = async () => {
            console.log((0, systemMessage_1.systemMessage)(`${aleph_script_i18_1.i18.MENU_HEADER_LABEL}`));
            Runtime.threads.forEach((t, index) => {
                console.log(menuOption(`[${index}]: Modelo: ${t.nombre}`));
            });
            console.log(menuOption(`[${exports.EXIT_PROMPT_INDEX}]: ${aleph_script_i18_1.i18.EXIT_PROMT_LABEL}`));
            rl.question(`${aleph_script_i18_1.i18.MENU_PROMPT_DATA_LABEL}`, async (answer) => {
                const index = parseInt(answer);
                if (isNaN(index)) {
                    console.log("No FIA index given!", answer);
                }
                else {
                    // try {
                    const fia = Runtime.threads[index];
                    console.clear();
                    console.log((0, systemMessage_1.systemMessage)(`${aleph_script_i18_1.i18.LOOP.LAUNCH_FIA_LABEL}: ${fia.nombre}`));
                    if (fia.runAsync) {
                        const instancia = await fia.instanciar();
                        console.log((0, agentMessage_1.agentMessage)(fia.nombre, instancia));
                    }
                    else {
                        console.log((0, agentMessage_1.agentMessage)(fia.nombre, fia.imprimir()));
                    }
                    /* } catch(Ex) {
                        console.log("Error running FIA", Ex.message);
                    } */
                }
                if (index == exports.EXIT_PROMPT_INDEX) {
                    console.log((0, systemMessage_1.systemMessage)(`"System closed by user! Bye!"`));
                    rl.close();
                }
                else {
                    waitForUserInput();
                }
            });
        };
        console.log((0, systemMessage_1.systemMessage)(`${aleph_script_i18_1.i18.LOOP.LOAD_FIA_LABEL}`));
        return await waitForUserInput();
    }
}
exports.Runtime = Runtime;
Runtime.threads = [];
