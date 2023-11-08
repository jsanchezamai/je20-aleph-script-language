import { agentMessage } from "../agentMessage";
import { i18 } from "../i18/aleph-script-i18"
import { Observable, Subject, Subscription } from "rxjs"
import { IModelo, Modelo } from "./modelo";
import { AS_MUNDO_i18 } from "./mundos-i18";
import { IDiccionarioI18 } from "../genesis-block";

export interface IMundo {

    i18: IDiccionarioI18;

    nombre: string;
    modelo: IModelo;

    pulsoVital: NodeJS.Timeout;

    instanciar(): Promise<IModelo>;

    vivo(): boolean;

    pulso: () => void;

    ciclo: () => Promise<IModelo>;

    jornada(vivir: Function, morir: Function): void;

    eferencia: Subject<IMundo>;

    aferencias: Subscription[];

    agregarAferencia(o: Observable<IMundo>): void;

    alAcabar(nombre: string): Promise<IModelo>;

    destructor(): void;

}

export interface AlAcabarCallbackDatos {
    nombre: string;
    callback: ((value: IModelo | PromiseLike<IModelo>) => void)
}

export class Mundo implements IMundo {

    i18 = AS_MUNDO_i18;

    nombre = "mundo-1";

    modelo = new Modelo();

    pulsoVital: NodeJS.Timeout;

    eferencia: Subject<IMundo> = new Subject();
    aferencias: Subscription[] = [];

    alAcabarCallbacks: AlAcabarCallbackDatos[] = [];

    constructor() {}

    agregarAferencia(o: Observable<IMundo>) {

       const s = o.subscribe(m => {

            this.modelo = m.modelo;
                console.log(agentMessage(this.nombre,
                    i18.MUNDO.AFERENCIA.RECEPCION_LABEL), this.modelo.imprimir());

        });

        this.aferencias.push(s);

    }

    async instanciar(): Promise<IModelo> {

        return await new Promise(async (resolve, reject) => {

            // Iniciar el contador de programa
            const modelo = await this.ciclo();

            resolve(modelo);

        })

    }

    async alAcabar(nombre: string = "unknown"): Promise<IModelo> {

        return await new Promise((resolve, reject) => {

            this.alAcabarCallbacks.push({
                nombre, callback: resolve
            });
            console.log(
                agentMessage(this.nombre, `${i18.MUNDO.NUEVO_SUSCRIPTOR_LABEL}, ${nombre}, suscriptores: ${this.alAcabarCallbacks.map(c => c.nombre).length}`));

        });
    }

    async ciclo(): Promise<IModelo> {

        return await new Promise((resolve, reject) => {

            console.log(agentMessage(this.nombre, `${i18.MUNDO.INICIO_LABEL} Pulso: ${this.modelo.pulso}`));
            this.pulsoVital = setInterval(() => this.jornada(resolve, reject), this.modelo.pulso);

        });
    }

    jornada(vivir: Function, morir: Function) {

        if (this.vivo()) {

            try {

                this.pulso();

            } catch(ex) {

                console.log("Error en mundo", this.nombre, ex.message);

                this.deponer(this.pulsoVital);

                return morir({
                    estado: ex.message,
                    modelo: this.modelo
                });

            }

        } else {

            this.deponer(this.pulsoVital);
            vivir(this.modelo);

        }
    }

    deponer(intervalo: any) {

        console.log(agentMessage(this.nombre, `${i18.MUNDO.FIN_LABEL}, deponer ${this.alAcabarCallbacks.map(c => c.nombre)}`));

        clearInterval(intervalo);

        this.alAcabarCallbacks.forEach(c => c.callback(this.modelo));

        this.destructor();

    }

    destructor() {

        this.aferencias.forEach(s => s.unsubscribe());
        console.log(agentMessage(this.nombre, `${i18.MUNDO.FIN_LABEL}, ${this.alAcabarCallbacks}`));
    }

    pulso(): void {

        this.modelo.dia++;
        console.log(agentMessage(this.nombre, `${i18.MUNDO.DIA_LABEL} ${this.modelo.dia}`));

        this.eferencia.next(this);

    }

    vivo(): boolean {
        return this.modelo.dia < this.modelo.muerte;
    }

}