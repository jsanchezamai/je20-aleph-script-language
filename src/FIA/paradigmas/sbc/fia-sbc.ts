import { GenesisBlock, iFIA } from "../../genesis-block";
import { agentMessage } from "../../agentMessage";
import { AS_SBC_I18 } from "./as-sbc-i18";
import { SBC_CK } from "./implementaciones/common-kads/fia-sbc-ck";

export interface FIA_SBC extends iFIA {

}

export class FIA_SBC extends GenesisBlock implements iFIA {

    i18 = AS_SBC_I18;

    runAsync = true;

    nombre = this.i18.NOMBRE;

    async instanciar(): Promise<string> {

        return new Promise(async (resolve, reject) => {

            console.log(agentMessage(this.nombre, this.i18.CABECERA));
            // try {
                const ck = new SBC_CK();
                const resultado = await ck.instanciar();

                resolve(resultado);

            //} catch(ex) {

            //    reject(ex.message);

            //}
            console.log(agentMessage(this.nombre, this.i18.PIE));

        });

    }
}