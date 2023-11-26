import { IDiccionarioI18 } from "../../../../genesis-block";
import { IModelo, Modelo } from '../../../../mundos/modelo';
import { agentMessage } from "../../../../agentMessage";
import { AS_COMMON_KADS_I18 } from "./as-common-kads-i18";
import { ISistema, SistemaRuntime } from "./sistema";
import { ICKNivelArtefactual, CKNivelArtefactual } from "./nivel/nivel-artefactual";
import { ICKNivelConceptual, CKNivelConceptual, ICKModeloConceptual } from "./nivel/nivel-conceptual";
import { IAlternativa, IObjetivo, ICKNivelContextual, CKNivelContextual, Alternativa } from "./nivel/nivel-contextual";
import { IModeloComunicaciones } from "./modelos/comunicacion/modelo-comunicaciones";
import { IEstadoT, EstadoT } from "./estado";
import { RTCache } from "../../../../engine/kernel/rt-cache";

const fi18 = AS_COMMON_KADS_I18.COMMON_KADS.CK;
export enum CKFases {
    Nivel = "",
    NivelContextual = fi18.FASES.CONTEXTUAL.NOMBRE as any,
    NivelConceptual = fi18.FASES.CONCEPTUAL.NOMBRE as any,
    NivelArtefactual = fi18.FASES.DISENYO.NOMBRE as any,
    Monitorizacion = fi18.EJECUCION.NOMBRE as any
}

export interface IEspecificacion {

    conceptual: ICKModeloConceptual,
    comunicacion: IModeloComunicaciones

    comoJSON: () => Object;

}

export interface IFase {

    fase: CKFases;

    estado: IEstadoT<IModelo>;

    alternativas: IAlternativa[];

    objetivo: IObjetivo;

    especificacion: IEspecificacion;

    sistema: ISistema;

    imprimir(): string;
}

/**
 * Knowledge Acquisition and Design Structuring
 *
 * para el desarrollo SBC
 *
 */
export interface ICK {

    nombre: string;

    i18: IDiccionarioI18;

    nivel1: ICKNivelContextual;
    nivel2: ICKNivelConceptual;
    nivel3: ICKNivelArtefactual;

    instanciar(m: IModelo): Promise<IEstadoT<IModelo>>;

    modeloOrganizacion(f: IFase): IFase;
    modeloConceptual(f: IFase): IFase;
    modeloDisenyo(f: IFase): IFase;

    monitorizacion(f: IFase): Promise<IEstadoT<IModelo>>;
}

export const CKCACHE_Clave = "CJKCACHE";

export class CK implements ICK {

    i18 = AS_COMMON_KADS_I18.COMMON_KADS.CK;

    nombre = this.i18.NOMBRE;

    nivel1 = new CKNivelContextual();
    nivel2 = new CKNivelConceptual();
    nivel3 = new CKNivelArtefactual();

    constructor() {}

    async instanciar(m: IModelo): Promise<IEstadoT<IModelo>> {

        return new Promise(async (resolve, reject) => {
            console.log(agentMessage(this.nombre, this.i18.CABECERA));

            let fase: IFase = {

                fase: CKFases.Nivel,
                estado: new EstadoT<IModelo>(m),

                alternativas: [],

                objetivo: null,
                especificacion: null,

                sistema: null,

                imprimir: () => `${this.i18.CONSTRUCCION}${this}`,

            };

            const claves = (f) => {

                if (typeof f == "object") {
                    return Object.keys(f).map(claves(f)).join("/");
                }
                return f;
            }

            const c = await this.ciclo(fase);
            c.modelo.dominio.base[CKCACHE_Clave] = {

                fase: fase.fase,

                estado: fase.estado.comoModelo().estado,

                alternativas: fase.alternativas.map(a => a.comoJSON()),

                objetivo: fase.objetivo.comoJSON(),

                especificacion: fase.especificacion.comoJSON(),

                sistema: fase.sistema.comoJSON()
            }

            resolve(c);
        })

    }

    modeloOrganizacion(f: IFase): IFase {

        f.fase = CKFases.NivelContextual;

        console.log(agentMessage(this.nombre,
            `${this.i18.FASES.CONTEXTUAL.NOMBRE}`
        ));

        f.alternativas = this.nivel1.estudioViabilidad(f.estado.comoModelo());
        console.log(agentMessage(this.nombre,
            `${this.i18.FASES.CONTEXTUAL.VIABILIDAD}:
             ${f.alternativas[0].organizacion.imprimir()}`
        ));

        f.objetivo = this.nivel1.estudioImpactoYMejoras(f.alternativas);
        console.log(agentMessage(this.nombre,
            `${this.i18.FASES.CONTEXTUAL.IMPACTO}:
             ${f.objetivo.tareas.imprimir()},
             ${f.objetivo.agentes.imprimir()}`
        ));

        console.log(agentMessage(this.nombre,
            `${this.i18.CONSTRUCCION}: ${f.fase}: ${f.objetivo.conclusiones().imprimir()}`));

        return f;

    }

    modeloConceptual(f: IFase): IFase {

        f.fase = CKFases.NivelConceptual;

        console.log(agentMessage(this.nombre,
            `${this.i18.FASES.CONCEPTUAL.NOMBRE}`
        ));

        const conceptual = this.nivel2.modeloConocimiento(f.objetivo.conclusiones());
        console.log(agentMessage(this.nombre,
            `${this.i18.FASES.CONCEPTUAL.CONOCIMIENTO}:
             ${conceptual.conocimiento.imprimir()}, ${conceptual.uml.imprimir()}, ${conceptual.cml.imprimir()}.`
        ));
        const comunicacion = this.nivel2.modeloComunicaciones(conceptual);
        console.log(agentMessage(this.nombre,
            `${this.i18.FASES.CONCEPTUAL.COMUNICACIONES}:
             ${comunicacion.comunicacion.imprimir()}`
        ));

        f.especificacion = {
            conceptual,
            comunicacion,
            comoJSON: () => {
                return {
                    conceptual: conceptual.comoJSON(),
                    comunicacion: comunicacion.comoJSON()
                }
            }
        }
        console.log(agentMessage(this.nombre, `${this.i18.FASES.CONCEPTUAL.ESPECIFICACION}`));

        console.log(agentMessage(this.nombre, `${this.i18.CONSTRUCCION}: ${f.fase}`));

        return f;
    }

    modeloDisenyo(f: IFase): IFase {

        f.fase = CKFases.NivelArtefactual;

        console.log(agentMessage(this.nombre,
            `${this.i18.FASES.DISENYO.NOMBRE}`
        ));

        f.sistema = this.nivel3.sistema(f.especificacion);
        console.log(agentMessage(this.nombre,
            `${this.i18.FASES.DISENYO.NOMBRE}:
             ${f.sistema.disenyo.imprimir()}.`
        ));

        console.log(agentMessage(this.nombre, `${this.i18.CONSTRUCCION}: ${f.fase}`));

        return f;

    }

    async monitorizacion(f: IFase): Promise<IEstadoT<IModelo>> {

        return new Promise(async (resolve, reject) => {

            f.fase = CKFases.Monitorizacion;

            console.log(agentMessage(this.nombre,
                `${this.i18.EJECUCION.CABECERA}`
            ));

            try {
                const c = new SistemaRuntime(f.sistema);
                c.monitor.subscribe(notificacion => {
                    agentMessage(this.i18.NOMBRE, `${this.i18.EJECUCION.CUERPO}${notificacion}`)
                });

                const resultado = await c.ejecutar();
                resolve(resultado);

            } catch(ex) {

                reject(ex.message);

            }
            console.log(agentMessage(this.nombre, this.i18.EJECUCION.PIE));

        });
    }

    async ciclo(f: IFase): Promise<IEstadoT<IModelo>> {

        return new Promise(async (resolve, reject) => {

            switch(f.fase) {
                case CKFases.Nivel:
                    f = this.modeloOrganizacion(f);
                    await this.ciclo(f);
                    break;
                case CKFases.NivelContextual:
                    f = this.modeloConceptual(f);
                    await this.ciclo(f);
                    break;
                case CKFases.NivelConceptual:
                    f = this.modeloDisenyo(f);
                    await this.ciclo(f);
                    break;
                case CKFases.NivelArtefactual:
                    const r = await this.monitorizacion(f);
                    await this.ciclo(f);
                    break;
                case CKFases.Monitorizacion:
                default:
                    f.fase = CKFases.Nivel;
            }
            resolve(f.estado);
        })
    }
}
