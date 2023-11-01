import { EstadoT } from "../../../paradigmas/situada/paradigma";
import { TOPE_POSICION } from "./cadena-fia-situada";
import { CadenaModelo } from "../cadena-modelo";

export enum CadenaEstados {
    PARADA = "PARADA",
    ARRANCAR = "ARRANCAR",
    AVANZAR = "AVANZAR",
    PARAR = "PARAR",
    FUERA_SERVICIO = "FUERA_SERVICIO"
}

export class CadenaEstado<CadenaEstados> extends EstadoT<CadenaEstados> {

    modelo: CadenaModelo;

    transicion(): void {

        switch(this.modelo.motor) {
            case CadenaEstados.PARADA:
                this.modelo.motor = CadenaEstados.ARRANCAR;
                break;
            case CadenaEstados.ARRANCAR:
                this.modelo.motor = CadenaEstados.AVANZAR;
                break;
            case CadenaEstados.AVANZAR:

                // Condicionar en función de la aferencia
                const iluminacion = this.modelo.dia % 2 == 0;

                // Construir la eferencia
                this.modelo.posicion++;
                this.modelo.iluminacion = iluminacion;

                // El autómata acabará con tiempo de parar la máquina antes
                // de que finalice el tiempo del mundo donde opera
                const tiempoArranque = 2;
                const tiempoParada = 2;
                if (this.modelo.posicion === (
                    this.modelo.muerte - tiempoArranque - tiempoParada
                )) {
                    this.modelo.motor = CadenaEstados.PARAR;
                }

                break;
            case CadenaEstados.PARAR:
                this.modelo.posicion = 0;
                this.modelo.iluminacion = false;
                this.modelo.motor = CadenaEstados.FUERA_SERVICIO;
                break;
            default:
                this.modelo.motor = CadenaEstados.PARADA;
        }

    }

}