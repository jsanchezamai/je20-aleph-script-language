import { Inferencia, IInferenciaRelacion, IDominio, Dominio, IInferencia, IBaseConocimiento } from "../../../../paradigma";
import { IGrafo } from "../../sistema/semantica/grafo";

export interface ISolucion {}

export interface IProblema {

    predicado: IPredicado;
    dominio: IDominio;

}

export interface IPredicado {}

export interface IRequisitos  {
}

export class InferenciaRelacion
    extends Inferencia
    implements IInferenciaRelacion {

        claveDominio = "inferencias_relacion";

        dominio: IDominio = new Dominio({});

        constructor() {
            super();
            this.dominio.base[this.claveDominio] = {};
        }

        configurar(g: IGrafo, parametros: IDominio): void {

            this.dominio.base[this.claveDominio][this.claveEntrada] = parametros;
            this.dominio.base[this.claveDominio][this.claveContexto] = g;
        }

        activar(): { parametros: IBaseConocimiento, contexto: IGrafo} {
            return {
                parametros: this.dominio.base[this.claveDominio][this.claveEntrada].base,
                contexto: this.dominio.base[this.claveDominio][this.claveContexto]
            }
        }

        async evaluar(): Promise<IInferencia> {
            return this;
        }

        imprimir(): string {
            return JSON.stringify(
                Object.keys(
                    this.dominio.base[this.claveDominio][this.claveEntrada].base).join(" - "),
                    null,
                    "\t"
                );
        }
}