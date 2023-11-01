import { GenesisBlock, Intencion, Mundo, iFIA } from "../../genesis-block";
import { i18 } from "../../i18/labels";
import { ICanalizacion } from "./canalizacion";
import { IRedNeuronalArtificial, RedNeuronalArtificial } from "./red-neuronal";

    export interface IDato {}

    export interface ISolucion {}

    export interface IEtiqueta {

    }

    export interface IAprendizaje {
        datos: IDato;
    }

    export interface IAprendizajeSupervisado extends IAprendizaje {
        etiquetado: IEtiqueta;
    }

    export interface IAprendizajeNoSupervisado extends IAprendizaje  {

    }

    export interface iIAConexionista extends iFIA {

        inferencia: (p: ICanalizacion) => ISolucion;

    }

    export class IAConexionista extends GenesisBlock implements iIAConexionista {

        modelo: IRedNeuronalArtificial = new RedNeuronalArtificial();

        aprendizaje: (p: IAprendizaje) => IRedNeuronalArtificial;

        async inferencia(c: ICanalizacion): Promise<ISolucion> {

            this.modelo.clasificador.canalizacion = c;
            const solucion = await this.modelo.clasificador.canalizacion.canalizar();

            return solucion as unknown as ISolucion;
        }

        imprimir(): string {
            return `${i18.CONEXIONISTA.NEURONAL.IDLE}`;
        }

    }

export namespace IAConexionista {

    export const fiaConexionista = new IAConexionista();

    fiaConexionista.nombre = i18.FIA_CONEXIONISTA_LABEL;
    fiaConexionista.razona =
        (m: Mundo, i: Intencion) => {
        return "No";
    }

}
