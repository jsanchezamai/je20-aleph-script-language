import { IDisenyo, Disenyo } from "../modelos/disenyo/disenyo";
import { IFormulario } from "./formulario";
import { IEspecificacion } from "../common-kads";
import { ISistema } from "../sistema";
import { ICKNivel } from "./nivel";


export interface ICKNivelArtefactual extends ICKNivel {

    disenyo: IDisenyo;

    sistema: (e: IEspecificacion) => ISistema;

}

export class CKNivelArtefactual implements ICKNivelArtefactual {

    arquitectura: () => void;
    plataforma: () => void;
    componentes: () => void;
    aplicacion: () => void;

    disenyo: IDisenyo = new Disenyo();

    formularios(): IFormulario[] {
        return [
            ...this.disenyo.formularios
        ]
    }

    sistema(e: IEspecificacion): ISistema {

        return {
            disenyo: this.disenyo,
            arquitectura: this.disenyo.arquitectura(e),
            plataforma: this.disenyo.plataforma(e),
            componentes: this.disenyo.componentes(e),
            aplicacion: this.disenyo.aplicacion(e)
        }

    }

}