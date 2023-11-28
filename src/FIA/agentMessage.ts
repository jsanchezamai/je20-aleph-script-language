import { AgregarBloque } from "./aplicaciones/ide/cadena-bloques";

export function agentMessage(id: string, message: string, nivel?: string) {

    AgregarBloque(nivel || id, {
        estado: message,
        fecha:new Date()
    });
    return `${id}> ${message}`;
}
