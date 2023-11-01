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
exports.Runtime = exports.EXIT_PROMPT_INDEX = void 0;
const genesis_block_1 = require("../../genesis-block");
const paradigma_1 = require("../../paradigmas/cientifica/paradigma");
const paradigma_2 = require("../../paradigmas/simbolica/paradigma");
const paradigma_3 = require("../../paradigmas/situada/paradigma");
const paradigma_4 = require("../../paradigmas/conexionista/paradigma");
const labels_1 = require("../../i18/labels");
const thread_1 = require("../../thread");
const readline = __importStar(require("readline"));
const cadena_app_1 = require("../../aplicaciones/cadena/cadena-app");
exports.EXIT_PROMPT_INDEX = 99;
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
        Runtime.threads.push(paradigma_2.IASimbolica.fiaSimbolica);
        Runtime.threads.push(paradigma_3.IASituada.fiaSituada);
        Runtime.threads.push(paradigma_4.IAConexionista.fiaConexionista);
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
            console.log((0, thread_1.systemMessage)(`${labels_1.i18.MENU_HEADER_LABEL}`));
            Runtime.threads.forEach((t, index) => {
                console.log((0, thread_1.menuOption)(`[${index}]: Modelo: ${t.nombre}`));
            });
            console.log((0, thread_1.menuOption)(`[${exports.EXIT_PROMPT_INDEX}]: ${labels_1.i18.EXIT_PROMT_LABEL}`));
            rl.question(`${labels_1.i18.MENU_PROMPT_DATA_LABEL}`, async (answer) => {
                const index = parseInt(answer);
                if (isNaN(index)) {
                    console.log("No FIA index given!", answer);
                }
                else {
                    // try {
                    const fia = Runtime.threads[index];
                    console.clear();
                    console.log((0, thread_1.systemMessage)(`${labels_1.i18.LOOP.LAUNCH_FIA_LABEL}: ${fia.nombre}`));
                    if (fia.runAsync) {
                        const instancia = await fia.instanciar();
                        console.log((0, thread_1.agentMessage)(fia.nombre, instancia));
                    }
                    else {
                        console.log((0, thread_1.agentMessage)(fia.nombre, fia.imprimir()));
                    }
                    /* } catch(Ex) {
                        console.log("Error running FIA", Ex.message);
                    } */
                }
                if (index == exports.EXIT_PROMPT_INDEX) {
                    console.log((0, thread_1.systemMessage)(`"System closed by user! Bye!"`));
                    rl.close();
                }
                else {
                    waitForUserInput();
                }
            });
        };
        console.log((0, thread_1.systemMessage)(`${labels_1.i18.LOOP.LOAD_FIA_LABEL}`));
        return await waitForUserInput();
    }
}
exports.Runtime = Runtime;
Runtime.threads = [];
