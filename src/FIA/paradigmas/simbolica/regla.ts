 /**
     * REGLAS
     */

import { IInferencia, IInferenciaConcepto, IInferenciaRelacion, IInferenciaAccion } from "./inferencia";
import { IFacetas } from "./modelos/conceptual/sistema/marcos";

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

 }

 export interface IReglaDependencia extends IInferenciaRelacion {}


 /**
  * IInferenciaAccion
  */

 export interface IReglaLista extends IInferenciaAccion {}

 export interface IReglaGuion extends IReglaLista {}

 export interface IReglaSistema extends IInferenciaAccion {}