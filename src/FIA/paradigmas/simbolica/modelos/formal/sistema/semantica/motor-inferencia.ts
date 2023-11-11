import { Observable, Subject } from "rxjs";
import { IInferencia } from "../../../../inferencia";

export interface IMotorInferencia {

    evento: Subject<IInferencia>;
    eventos: Observable<IInferencia>;

    reglas: IInferencia[]

    arrancar(log: (string) => void): void;
    trasDetenerse(log: (string) => void): void
}

export class MotorInferencia implements IMotorInferencia {

    evento = new Subject<IInferencia>();

    eventos: Observable<IInferencia>;

    reglas: IInferencia[] = []

    constructor() {

        this.eventos = this.evento.asObservable();
    }

    arrancar(log: (string) => void): void {

        // console.log("motor.arrancar, reglas: ", this.reglas.length);
        this.reglas.forEach(async regla => {

            // console.log("\t motor.arrancar, ejecutando: ", regla.claveDominio);
            const inferencia = await regla.evaluar();

            log(inferencia?.dominio[inferencia?.claveSalida]);

            // console.log("\t motor.arrancar, propagando resultado: ", inferencia.dominio.base);
            this.evento.next(inferencia);

        });
        for(const r of this.reglas) this.reglas.pop();

    }

    trasDetenerse(log: (string: any) => void): void {
        log("MotorInferencia.Detenido");
    }

}