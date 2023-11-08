import { Dominio, IDominio } from "../../../../../mundos/dominio";
import { Modelo } from "../../../../../mundos/modelo";
import { IInferencia } from "../../../../simbolica/inferencia";
import { AS_COMMON_KADS_I18 } from "../as-common-kads-i18";
import { ITarea } from "../modelos/tareas/tarea";
import { IFormularioOTA1 } from "./nivel-contextual";

/**
 * Conceptual Modeling Language
 */
export interface ICML {

    modelar(f: IFormularioOTA1): ICMLModelo;

}

export interface ICMLModelo {

    dominio: IDominio;
    inferencias: IInferencia[];
    tareas: ITarea[];

    imprimir(): string;
}

export class CML implements ICML {

    constructor() {}

    modelar(f: IFormularioOTA1): ICMLModelo {

        const modelo = new Modelo();
        const dominio = new Dominio(modelo);
        dominio.base["Common.Kads.cml"] = {};

        const inferencias = [];
        const tareas = [];

        return {
            dominio,
            inferencias,
            tareas,
            imprimir: () => AS_COMMON_KADS_I18.COMMON_KADS.CK.FASES.CONCEPTUAL.CML
        }
    }

}