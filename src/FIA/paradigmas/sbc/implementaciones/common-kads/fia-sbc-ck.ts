import { agentMessage } from "../../../../agentMessage";
import { IDiccionarioI18 } from "../../../../genesis-block";
import { Mundo } from "../../../../mundos/mundo";
import { AS_COMMON_KADS_I18 } from "./as-common-kads-i18";
import { CK } from "./common-kads";

export interface ISBC_CK {

    nombre: string;

    i18: IDiccionarioI18;

    instanciar(): Promise<string>;

}

export class SBC_CK implements ISBC_CK  {

    i18 = AS_COMMON_KADS_I18.COMMON_KADS

    nombre = this.i18.NOMBRE;

    commonkads = new CK();

    async instanciar(): Promise<string> {

        return new Promise(async (resolve, reject) => {

            console.log(agentMessage(this.nombre, this.i18.CABECERA));
            // try {
                const m = new Mundo();
                const resultado = await this
                    .commonkads
                    .instanciar(m.modelo);

                resolve(resultado.comoModelo().imprimir());

            // } catch(ex) {

            //    reject(ex.message);

            //}
            console.log(agentMessage(this.nombre, this.i18.PIE));
        });

    }

}
