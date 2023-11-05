import { CadenaEstados } from "../situada/cadena-estado";
import { Modelo } from "../../../mundos/modelo";


export class CadenaModelo extends Modelo {
    nombre = "Cadena de producción";
    motor: CadenaEstados;
    posicion: number = 0;
    iluminacion: boolean;

    imprimir(): string {
        return Object
            .keys(this).map(k => {

                let out = "";

                if (typeof this[k] === "object") {

                    const dominioA = this.dominio['modelo.motor.eventos'] || {}
                    out = dominioA['inferencias.openai'];
                    out = `${k}: ${JSON.stringify(this[k])}`
                } else {
                    out = `${k}: ${this[k]}`
                }

                return out;
            }).join("\n\t\t -");
    }
}