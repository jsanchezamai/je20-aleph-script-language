import { IBaseConocimiento } from "./base-conocimiento";

export interface IDominio {
    base: IBaseConocimiento
}

export class Dominio implements IDominio {

    constructor(public base: IBaseConocimiento){}

}