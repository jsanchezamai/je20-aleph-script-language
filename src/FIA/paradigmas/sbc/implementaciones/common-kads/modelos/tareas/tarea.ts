import { IModelo, Modelo } from "../../../../../../mundos/modelo";
import { Formulario, IFormulario } from "../../nivel/formulario";
import { ICKModelo, CKModelo } from "../ck-modelo";

export interface ITarea extends ICKModelo {

    formularios: IFormulario[];

}

export class Tarea extends CKModelo implements ITarea {

    formularios: IFormulario[];

    constructor() {

        super();

        this.formularios = [
            new Formulario("TM-1"),
            new Formulario("TM-2"),
        ];
    }

}