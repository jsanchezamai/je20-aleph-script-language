import { IMotorInferencia, MotorInferencia } from '../../formal/sistema/semantica/motor-inferencia';
import { IInferenciaMarcoEquiparacion, IInferenciaMarcoHerencia, IInferenciaMarcoDemonio } from './inferencia';

export interface IMotorInferenciaMarco extends IMotorInferencia {

    reglas: (IInferenciaMarcoEquiparacion | IInferenciaMarcoHerencia | IInferenciaMarcoDemonio)[]
}

export class MotorInferenciaMarco extends MotorInferencia implements IMotorInferenciaMarco {

}