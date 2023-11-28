import { GenesisBlock, iFIA } from "../../genesis-block";
import { agentMessage } from "../../agentMessage";
import { AS_SBC_I18 } from "./as-sbc-i18";
import { SBC_CK } from "./implementaciones/common-kads/fia-sbc-ck";
import { CKCACHE_Clave } from "./implementaciones/common-kads/common-kads";
import { IModelo } from "../../mundos/modelo";
import { IEstadoT } from "../situada/estado";
import { RTCache } from "../../engine/kernel/rt-cache";
import { Asistentizador } from "../../aplicaciones/ide/aleph-script-idle";

export interface FIA_SBC extends iFIA {

    instanciarE(): Promise<IEstadoT<IModelo>>;

}

export class FIA_SBC extends GenesisBlock implements iFIA {

    i18 = AS_SBC_I18;

    runAsync = true;

    nombre = this.i18.NOMBRE;

    async instanciarE(): Promise<IEstadoT<IModelo>> {

        return new Promise(async (resolve, reject) => {

            console.log(agentMessage(this.nombre, this.i18.CABECERA));
            // try {
                const ck = new SBC_CK();

                const as = new Asistentizador(ck.commonkads);
                as.examinarClase();

                const ch = new RTCache();
                let c = ch.leer(CKCACHE_Clave);

                if (c) {
                    resolve(c);
                    console.log(agentMessage(this.nombre, "Cacheado! " + this.i18.PIE));
                    return;
                }

                const resultado = await ck.instanciar();

                this.cache.guardar(CKCACHE_Clave, resultado.comoModelo().dominio.base[CKCACHE_Clave]);
                this.cache.persistir();

                console.log(agentMessage(this.nombre, this.i18.PIE));

                resolve(resultado)

            //} catch(ex) {

            //    reject(ex.message);

            //}


        });

    }
}