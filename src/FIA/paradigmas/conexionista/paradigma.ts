export interface IDato {}

export interface ISolucion {}

export interface IEtiqueta {}

export interface IAprendizaje {
    datos: IDato;
}

export interface IAprendizajeSupervisado extends IAprendizaje {
    etiquetado: IEtiqueta;
}

export interface IAprendizajeNoSupervisado extends IAprendizaje  {}

