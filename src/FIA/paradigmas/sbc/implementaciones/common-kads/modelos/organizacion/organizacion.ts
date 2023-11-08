import { Formulario } from "../../nivel/formulario";
import { ICKModelo, CKModelo } from "../ck-modelo";


export interface IOrganizacion extends ICKModelo {


}

export class Organizacion extends CKModelo implements IOrganizacion {

    constructor() {

        super();

        this.formularios = [
            new Formulario("OM-1"),
            new Formulario("OM-2"),
            new Formulario("OM-3"),
            new Formulario("OM-4"),
            new Formulario("OM-5"),
        ];
    }



}