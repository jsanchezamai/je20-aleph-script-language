
import { iFIA, FIA, GenesisBlock } from "../../genesis-block";
import { IACientifica } from "../../paradigmas/cientifica/paradigma";
import { i18 } from "../../i18/aleph-script-i18";
import { systemMessage } from "../../systemMessage";
import { agentMessage } from "../../agentMessage";
import * as readline from 'readline';
import { CadenaApp } from "../../aplicaciones/cadena/cadena-app";
import { IASituada } from "../../paradigmas/situada/paradigma";
import { FIAConexionista } from "../../paradigmas/conexionista/fia-conexionista";
import { FIASimbolica } from "../../paradigmas/simbolica/fia-simbolica";
import { FIA_SBC } from "../../paradigmas/sbc/fia-sbc";

export const EXIT_PROMPT_INDEX = 99;

export function menuOption(message: string) {
    return `\t - ${message}`;
}

/**
 * Motor de FIAs
 */
export class Runtime {

    static threads: iFIA[] = [];

    start() {

        const fia = new FIA();
        Runtime.threads.push(fia);

        const gb = new GenesisBlock();
        Runtime.threads.push(gb);

        /**
         * BASE
         */
        Runtime.threads.push(IACientifica.fiaDebil);
        Runtime.threads.push(IACientifica.fiaFuerte);

        Runtime.threads.push(FIASimbolica.fiaSimbolica);
        Runtime.threads.push(IASituada.fiaSituada);
        Runtime.threads.push(FIAConexionista.fiaConexionista);

        Runtime.threads.push(new FIA_SBC());

        /**
         * APPS
         */
        const cadenaApp = new CadenaApp();
        Runtime.threads.push(cadenaApp);

    }

    async demo(): Promise<void> {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let app;
        let cpu: number = 0;
        const waitForUserInput = async (): Promise<void> => {

            console.log(systemMessage(`${i18.MENU_HEADER_LABEL}`));
            Runtime.threads.forEach((t: iFIA, index: number) => {
                console.log(menuOption(`[${index}]: Modelo: ${t.nombre}`));
            });
            console.log(menuOption(`[${EXIT_PROMPT_INDEX}]: ${i18.EXIT_PROMT_LABEL}`));

            rl.question(`${i18.MENU_PROMPT_DATA_LABEL}`, async (answer) => {

                const index = parseInt(answer);
                if (isNaN(index)) {
                    console.log("No FIA index given!", answer);
                } else {

                    // try {
                        const fia = Runtime.threads[index];

                        console.clear();
                        console.log(systemMessage(`${i18.LOOP.LAUNCH_FIA_LABEL}: ${fia.nombre}`));

                        if (fia.runAsync) {

                            const instancia = await fia.instanciar();
                            console.log(agentMessage(fia.nombre, instancia));

                        } else {
                            console.log(agentMessage(fia.nombre, fia.imprimir()));
                        }


                    /* } catch(Ex) {
                        console.log("Error running FIA", Ex.message);
                    } */
                }
                if (index == EXIT_PROMPT_INDEX){
                    console.log(systemMessage(`"System closed by user! Bye!"`));
                    rl.close();
                } else {
                    waitForUserInput();
                }
            });
        }

        console.log(systemMessage(`${i18.LOOP.LOAD_FIA_LABEL}`));
        return await waitForUserInput();

    }
}