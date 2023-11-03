import { iFIA, GenesisBlock } from "../../genesis-block";
import { i18 } from "../../i18/aleph-script-i18";
import { agentMessage } from "../../thread";
import { IAutomata, Automata } from "./automata";

export interface IFIASituada extends iFIA {

    automata: IAutomata;

}

export class FIASituada extends GenesisBlock implements IFIASituada {

    runAsync = true;

    automata = new Automata();

    async instanciar(): Promise<string> {

        console.log(agentMessage(i18.FIA_SITUADA_LABEL, i18.SITUADA.SIMULATION_START));

        this.automata.configurar();
        const modelo = await this.automata.mundo.instanciar();
        console.log(
            agentMessage(i18.FIA_SITUADA_LABEL,
            `${i18.SITUADA.SIMULATION_BODY}:${modelo.imprimir()}`)
        );
        return `${i18.SITUADA.SIMULATION_END}`;
    }
}