 /**
     * REGLAS
     */

import { IInferencia, IInferenciaConcepto, IInferenciaRelacion, IInferenciaAccion } from "./inferencia";
import { IFacetas } from "./modelos/conceptual/sistema/marcos";
import { IApunte } from "./modelos/formal/sistema/semantica/regla";

 export interface IReglaCondicional extends IInferencia {}

 export interface IReglaSiEntonces extends IInferencia {}

 /**
  * IInferenciaConcepto
  */
 export interface IReglaObjetoAtributoValor extends IInferenciaConcepto {}

 export interface IReglaMarco extends IInferenciaConcepto {
     facetas: IFacetas
 }

 /**
  * IInferenciaRelacion
  */
 export interface IReglaLogica extends IInferenciaRelacion {}

 export interface IReglaRed extends IInferenciaRelacion {
    apunte: IApunte;

    enunciado(): string;

    analizarParametros(): IApunte;
 }

 export interface IReglaDependencia extends IInferenciaRelacion {}


 /**
  * IInferenciaAccion
  */

 export interface IReglaLista extends IInferenciaAccion {}

 export interface IReglaGuion extends IReglaLista {}

 export interface IReglaSistema extends IInferenciaAccion {}