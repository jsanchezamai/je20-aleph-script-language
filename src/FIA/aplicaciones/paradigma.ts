import { GenesisBlock, iFIA } from "../genesis-block";
import { i18 } from "../i18/labels";
import { IACientifica } from "../paradigmas/cientifica/paradigma";
import { IAConexionista } from "../paradigmas/conexionista/paradigma";
import { IASimbolica } from "../paradigmas/simbolica/paradigma";
import { IASituada } from "../paradigmas/situada/paradigma";
import { agentMessage } from "../thread";

export interface IApp extends iFIA {

    situada: IASituada;

    debil: GenesisBlock;
    fuerte: GenesisBlock;

    simbolica: IASimbolica;
    conexionista: IAConexionista;

}

export class App extends GenesisBlock implements IApp {

    nombre = i18.APPS.CADENA.NOMBRE;

    runAsync = true;

    situada: IASituada;

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
        this.situada = new IASituada();
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