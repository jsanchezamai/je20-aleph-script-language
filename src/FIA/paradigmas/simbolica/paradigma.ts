import { Subject } from "rxjs";
import { i18 } from "../../i18/aleph-script-i18";
import { ISolucion } from "../conexionista/paradigma";
import { IProblema, IRequisitos } from "./modelos/formal/inferencia/relacion/paradigma";
import { IMotorInferencia } from "./modelos/formal/sistema/semantica/motor-inferencia";
import { GenesisBlock, Intencion, iFIA } from "../../genesis-block";
import { IMundo } from "../../mundos/mundo";
import { IBaseConocimiento } from "../../mundos/base-conocimiento";
import { IDominio } from "../../mundos/dominio";


    export interface IEstrategiaControl extends IDominio {
    }

    export interface IModeloRepresentacional {
        nombre: string;
    }

    /**
     * NO EVALUABLE, NO EJECUTABLE
     */
    export interface IModeloConceptual extends IModeloRepresentacional {
        base: IBaseConocimiento;
    }

    /**
     * EVALUABLE, NO EJECUTABLE
     */
    export interface IModeloFormal extends IModeloConceptual {

        eventos: Subject<IMundo>;

        motor: IMotorInferencia;
    }

    /**
     * EVALUABLE, EJECUTABLE
     */
    export interface IModeloComputacional extends IModeloFormal {
        control: IEstrategiaControl;
    }


