import { GenesisBlock, iFIA } from "../../genesis-block";
import { i18 } from "../../i18/aleph-script-i18";
import { IACientifica } from "../../paradigmas/cientifica/paradigma";
import { IAConexionista } from "../../paradigmas/conexionista/paradigma";
import { IASimbolica } from "../../paradigmas/simbolica/paradigma";
import { FIASituada } from "../../paradigmas/situada/fia-situada";
import { agentMessage } from "../../thread";

export interface IApp extends iFIA {

    situada: FIASituada;

    debil: GenesisBlock;
    fuerte: GenesisBlock;

    simbolica: IASimbolica;
    conexionista: IAConexionista;

}

export class App extends GenesisBlock implements IApp {

    nombre = i18.APPS.CADENA.NOMBRE;

    runAsync = true;

    situada: FIASituada;

    debil: GenesisBlock;
    fuerte: GenesisBlock;

    simbolica: IASimbolica;
    conexionista: IAConexionista;

    async instanciar(): Promise<string> {

        console.log(agentMessage(this.nombre, i18.SITUADA.SIMULATION_START));

        /**
         *
         */
        this.debil = IACientifica.fiaDebil;
        this.fuerte = IACientifica.fiaFuerte;
        this.situada = new FIASituada();
        this.simbolica = new IASimbolica();
        this.conexionista = new IAConexionista();

        await this.situada.instanciar();

        console.log(
            agentMessage(this.nombre,
            `${i18.APPS.CADENA.SIMULATION_BODY}:${""}`)
        );

        return `${i18.SITUADA.SIMULATION_END}`;
    }
}