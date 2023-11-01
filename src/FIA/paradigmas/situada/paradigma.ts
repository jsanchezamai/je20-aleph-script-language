import { GenesisBlock, IAccion, Intencion, iFIA } from "../../genesis-block";
import { i18 } from "../../i18/labels";
import { agentMessage } from "../../thread";
import { IModelo, IMundo, Modelo, Mundo } from "../../mundos/paradigma";
import { Subject } from "rxjs";


    export interface IEstado {

        modelo: IModelo;

        comoModelo: () => IModelo;
        deModelo: (m: IModelo) => void;

        transicion(e: IEstado): void;
    }

    export interface IEstadoT<T> extends IEstado {

        actual: T;

        transicion(e: IEstadoT<T>): void;
    }

    export class Estado implements IEstado {

        constructor(public modelo: IModelo) {}

        comoModelo(): IModelo {
            return this.modelo;
        };

        deModelo(e: IModelo): void {
            this.modelo = e as unknown as IModelo;
        }

        transicion(e: IEstado): void {
            this.modelo = e.comoModelo();
        }

    }

    export class EstadoT<T> extends Estado implements IEstadoT<T> {

        actual: T;

        transicion(e: IEstadoT<T>): void {
            this.modelo = e.comoModelo();
        }

    }

    export interface IAutomata {

        nombre: string;

        estado: IEstado;
        mundo: IMundo;

        eferencia: Subject<IMundo>;

        configurar(): void;
        inicializar(): void;

    }

    export interface IAutomataT<T> extends IAutomata {

        estado: IEstadoT<T>;

    }

    export class Automata<T> implements IAutomataT<T> {

        estado: IEstadoT<T>;
        mundo: IMundo;

        eferencia = new Subject<IMundo>();

        nombre: string;

        constructor() {

            this.nombre = i18.SITUADA.AUTOMATA.NOMBRE;
            this.mundo = new Mundo();
            this.mundo.modelo = new Modelo();
            this.estado = new EstadoT<T>(this.mundo.modelo);
        }

        configurar() {

            this.mundo.agregarAferencia(this.eferencia.asObservable())

        }

        async inicializar() {

            this.mundo.eferencia.subscribe((m) => {

                console.log(agentMessage(this.nombre, i18.SITUADA.AUTOMATA.RECEPCION_AFERENCIA_LABEL));

                const aferencia = new EstadoT<T>(m.modelo);
                this.estado.transicion(aferencia);

                this.mundo.modelo = this.estado.comoModelo();

                console.log(agentMessage(this.nombre, i18.SITUADA.AUTOMATA.ENVIO_EFERENCIA_LABEL));
                this.eferencia.next(this.mundo);

            });

            await this.mundo.ciclo();
        }
    }

    export interface iIASituada extends iFIA {

        automata: IAutomata;

    }

    export class IASituada extends GenesisBlock implements iIASituada {

        runAsync = true;

        automata = new Automata();

        async instanciar(): Promise<string> {

            console.log(agentMessage(i18.FIA_SITUADA_LABEL, i18.SITUADA.SIMULATION_START));

            this.automata.configurar();
            const modelo = await this.automata.mundo.instanciar();
            console.log(
                agentMessage(i18.FIA_SITUADA_LABEL,
                `${i18.SITUADA.SIMULATION_BODY}:${modelo.imprimir()}`)
            );
            return `${i18.SITUADA.SIMULATION_END}`;
        }
    }

export namespace IASituada {

    export const fiaSituada = new IASituada();

    fiaSituada.nombre = i18.FIA_SITUADA_LABEL;
    fiaSituada.razona =
        (w: IMundo, i: Intencion) => {
        return "Sí";
    }

}
