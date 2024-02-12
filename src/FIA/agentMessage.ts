import { AgregarBloque } from "./aplicaciones/ide/cadena-bloques";
import { IModelo } from "./mundos/modelo";
import { IDE_clave } from "./paradigmas/conexionista/modelos-lenguaje/oai/Trainer_key";
import { CKCACHE_Clave } from "./paradigmas/sbc/implementaciones/common-kads/common-kads";

export function agentMessageCache(m: IModelo) {
    console.log(m.dominio.base[IDE_clave].cache.dominio.base[CKCACHE_Clave]);
}
export function agentMessage(id: string, message: string, nivel?: string) {

    AgregarBloque(nivel || id, {
        estado: message,
        fecha:new Date()
    });
    return `${id}> ${message}`;
}
