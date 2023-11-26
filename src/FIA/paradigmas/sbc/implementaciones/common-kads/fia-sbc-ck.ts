import { agentMessage } from "../../../../agentMessage";
import { IDiccionarioI18 } from "../../../../genesis-block";
import { IModelo } from "../../../../mundos/modelo";
import { Mundo } from "../../../../mundos/mundo";
import { AS_COMMON_KADS_I18 } from "./as-common-kads-i18";
import { CK, IFase } from "./common-kads";
import { IEstadoT } from "./estado";

export interface ISBC_CK {

    nombre: string;

    i18: IDiccionarioI18;

    instanciar(): Promise<IEstadoT<IModelo>>;

}

export class SBC_CK implements ISBC_CK  {

    i18 = AS_COMMON_KADS_I18.COMMON_KADS

    nombre = this.i18.NOMBRE;

    commonkads = new CK();

    async instanciar(): Promise<IEstadoT<IModelo>> {

        return new Promise(async (resolve, reject) => {

            console.log(agentMessage(this.nombre, this.i18.CABECERA));
            // try {
                const m = new Mundo();
                const resultado = await this
                    .commonkads
                    .instanciar(m.modelo);

                resolve(resultado);

            // } catch(ex) {

            //    reject(ex.message);

            //}
            console.log(agentMessage(this.nombre, this.i18.PIE));
        });

    }

}
