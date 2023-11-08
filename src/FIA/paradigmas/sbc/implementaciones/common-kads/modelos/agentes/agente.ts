import { Formulario, IFormulario } from "../../nivel/formulario";
import { CKModelo, ICKModelo } from "../ck-modelo";

export interface IAgente extends ICKModelo {}

export class Agente extends CKModelo implements IAgente {

    formularios: IFormulario[];

    constructor() {

        super();

        this.formularios = [
            new Formulario("AM-1"),
        ];
    }

}