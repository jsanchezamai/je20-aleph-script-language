import { IDiccionarioI18 } from "../../../../../genesis-block";
import { IReglaMarco } from "../../../regla";
import { IArcos } from "../../formal/sistema/semantica/arco";
import { IBusqueda, IGrafo } from "../../formal/sistema/semantica/grafo";
import { InferenciaConcepto } from "../inferencia/concepto/paradigma";
import { AS_MARCOS_i18 } from './as-marcos-i18';
import { IFacetas } from "./faceta";
import { IInferenciaMarcoDemonio, IInferenciaMarcoEquiparacion, IInferenciaMarcoHerencia } from "./inferencia";
import { IRelaciones } from "./relacion";

export interface IPropiedad {
    nombre: string;
    tipo: string;
    valor: string;
}

export interface IPropiedades {
    estado: IPropiedad[];
}

export interface IPropiedadClase extends IPropiedades {
    estado: IPropiedad[];   // Definida y rellenada en marco-clase
}

export interface IPropiedadInstancia extends IPropiedadClase {
    estado: IPropiedad[];   // Definida en marco-clase pero rellenada en marco-instancia
}

export class ReglaMarco extends InferenciaConcepto
    implements IReglaMarco {

    inferencia: IInferenciaMarcoEquiparacion | IInferenciaMarcoHerencia | IInferenciaMarcoDemonio

}

export interface IMarco extends IGrafo {

    i18: IDiccionarioI18;

    arcos: IRelaciones;

    // Esquema de atributos
    propiedades: IPropiedades;

    // Conjunto de estados de los atributos
    facetas: IFacetas;

    // Árbol de subclases
    relaciones: IRelaciones;

}

export class Marco implements IMarco {

    arcos: IRelaciones;

    i18 = AS_MARCOS_i18;

    nombre: string = this.i18.MARCOS.NOMBRE;

    // Esquema de atributos
    propiedades: IPropiedades = { estado: [] };

    // Conjunto de estados de los atributos
    facetas: IFacetas = { estado: [] };

    // Árbol de subclases
    relaciones: IRelaciones = { estado: [] };

    imprimir(): string {
        throw new Error("Method not implemented.");
    }

    encontrar(b: IBusqueda): Promise<IGrafo> {
        throw new Error("Method not implemented.");
    }

}


