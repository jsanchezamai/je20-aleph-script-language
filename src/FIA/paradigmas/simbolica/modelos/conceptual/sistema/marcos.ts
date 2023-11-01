import { IReglaMarco } from "../../../paradigma";
import { InferenciaConcepto } from "../inferencia/concepto/paradigma";

export interface IPropiedad {}

export interface IPropiedades {
    estado: IPropiedad[];
}

export interface IFaceta {}

export interface IFacetas {
    estado: IFacetas[];
}

export interface IRelacion extends IReglaMarco {}

export interface IRelaciones {
    estado: IRelacion[];
}

export class ReglaMarco extends InferenciaConcepto
                        implements IReglaMarco {

    nombre: string;

    // Esquema de atributos
    propiedades: IPropiedades;

    // Conjunto de estados de los atributos
    facetas: IFacetas;

    // Árbol de subclases
    relaciones: IRelaciones;

}