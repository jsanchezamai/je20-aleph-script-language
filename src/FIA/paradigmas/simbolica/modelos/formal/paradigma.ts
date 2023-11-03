import { IModeloFormal } from "../../paradigma";
import { Conceptual } from "../conceptual/paradigma";
import { IMotorInferencia, MotorInferencia } from "./sistema/semantica/motor-inferencia";

export class Formal extends Conceptual implements IModeloFormal {

    motor: IMotorInferencia = new MotorInferencia();

    

}