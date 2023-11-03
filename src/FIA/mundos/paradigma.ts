export interface IModelo {

    nombre: string;

    /**
     * Contador de días (uno por ciclo)
     */
    dia: number;

    /**
     * Límite de días, el mundo se depondrá
     */
    muerte: number;

    /**
     * Frecuencia de ciclo (en ms)
     */
    pulso: number;

    imprimir(): string;

}

export class Modelo implements IModelo {

    nombre = "Modelo base. 3 días; pulso: 1 segundo";
    dia: number = 0;
    muerte: number = 3;
    pulso: number = 1000;

    imprimir(): string {
        return Object
            .keys(this).map(k => `${k}: ${this[k]}`).join("\n\t\t -");
    }
}

