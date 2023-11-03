import { IDominio, Inferencia, IBaseConocimiento } from "../../../../paradigma";

export interface IMotorInferencia {

    reglas: Inferencia[]

    arrancar(log: (string) => void): void;
    trasDetenerse(log: (string) => void): void
}

export class MotorInferencia implements IMotorInferencia {

    reglas: Inferencia[] = []

    arrancar(log: (string) => void): void {

        this.reglas.forEach(regla => {

            const inferencia = regla.evaluar();

            log(inferencia);

        })
    }

    trasDetenerse(log: (string: any) => void): void {
        log("MotorInferencia.Detenido");
    }

}