import { agentMessage } from "../../../agentMessage";

const enum Tipo {
    V = "VARIABLE",
    c = "constante",
    f = "funcion"
}

export interface ITerminal {

    v: string;
    tipo: Tipo;
    contenida: (t: ITerminal) => boolean;

    imprimir: () => string;

}

export interface IFuncion extends ITerminal {

    parametro: ITerminal;
    primerTerminalNoF(t: ITerminal): ITerminal;
}

export class dT implements ITerminal {

    constructor(public v: string, public tipo: Tipo) {

    }

    contenida(t: ITerminal) {

        if (t.tipo === Tipo.f) {

            const f = t as IFuncion;
            return [f.parametro].find(p => p.contenida(this)) != null;

        } else {

            return this.tipo === Tipo.V && t.tipo === Tipo.V && this.v === t.v;

        }

    };

    imprimir(): string {

        if (this.tipo === Tipo.f) {

            const f = this as unknown as IFuncion;
            console.log("imprimier", f.v);
            return `${f.v}(${[f.parametro].map(p => p.imprimir()).join(", ")})`;

        } else {
            console.log("imprimier end", this.v);
            return this.v;

        }

    };

}

export class dTF  extends dT implements IFuncion {

    constructor(public v: string, public parametro: ITerminal) {
        super(v, Tipo.f);
    }

    primerTerminalNoF(t: ITerminal): ITerminal {

        if (t.tipo === Tipo.f) {

            const f = t as unknown as IFuncion;
            return [f.parametro].find(p => f.primerTerminalNoF(p));

        } else {

            return t;
        }
    }

}

type S = { V: ITerminal, c: ITerminal };

export interface IDeclaracion {

    v: string;
    terminos: ITerminal[];
    comparar?: (b: IDeclaracion) => boolean;
    imprimir: () => string;

    sustituir(t: ITerminal, s: S)

    sustitucion?: S[];
}

export class Declaracion implements IDeclaracion {

    v: string;
    terminos: ITerminal[];
    sustitucion?: S[];

    constructor(d: Partial<IDeclaracion>) {
        Object.assign(this, d);
    }

    comparar(b: IDeclaracion) {

        return this.terminos.length === b.terminos.length
            &&
            this.terminos
                .filter((a, index) => a == b.terminos[index])
                .length == b.terminos.length;

    }

    sustituir(t: ITerminal, s: S) {

        console.log(agentMessage("sustituri", t.v))
        if (t.tipo === Tipo.f) {

            const f = t as unknown as IFuncion;
            return this.sustituir(f.parametro, s);

        } else {

            if (t.v === s.V.v) {
                Object.assign(t, s.c);
            }

        }
    }

    imprimir(): string {
        return `${this.v}=(${this.terminos.map(d => d.imprimir()).join(", ")})`;
    }
}

export class UnificadorGeneral {

    nombre = "Unificador";

    unificar(SA: IDeclaracion, SB: IDeclaracion): IDeclaracion {

        console.log(
            agentMessage(
                "Unificador",
                "Unificando A y B: " + SA.imprimir() + ", " + SB.imprimir()
            )
        )

        if (SA.terminos.length != SB.terminos.length) {

            console.log(agentMessage(this.nombre, "No se pueden unificar, longitudes distintas"));
            return null;
        }

        const S: IDeclaracion = new Declaracion({
            sustitucion: [],
            v: "",
            terminos: []
        });

        let SA_igual_SB = SA.comparar(SB);
        let indice = 0;

        while(!SA_igual_SB && indice > SA.terminos.length) {

            console.log(agentMessage(this.nombre, "Paso: "+ indice))
            console.log(SA.terminos);
            console.log(SB.terminos);

            const u1 = SA.terminos[indice];
            const u2 = SB.terminos[indice];

            const salida_1 = u1.tipo == Tipo.c && u2.tipo == Tipo.c;
            const salida_3 = u1.contenida(u2) || u2.contenida(u1);

            if (salida_1) {
                if (salida_1) {
                    console.log(agentMessage(this.nombre, "No hay variables en paso: " + indice + ". " + u1.tipo + "/" + u2.tipo ));
                }

                if (salida_3) {
                    console.log(agentMessage(this.nombre, "Contenidas!" ));
                }
                return null;
            } else {

                let variable;
                const salida_2 = u1.tipo == Tipo.f && u2.tipo == Tipo.f;

                if (salida_2) {

                    const fu1 = (u1 as IFuncion);
                    const p = fu1.parametro;
                    variable = fu1.primerTerminalNoF(p);

                } else {
                    variable = u1.tipo === Tipo.V ? u1: u2;
                }

                const S_x_b = u1.tipo === Tipo.V ? u2: u1;

                const s: S = {
                    V: variable,
                    c: S_x_b
                };
                S.sustitucion.push(s);

                console.log(agentMessage(this.nombre, "Paso: "+ indice + " Sustitucion_ " + JSON.stringify(s) ))

                SA.terminos.forEach(t => SA.sustituir(t, s));
                SB.terminos.forEach(t => SB.sustituir(t, s));
            }

            indice++;
            SA_igual_SB = SA.comparar(SB);
        }

        return S
    }

    probarNoUnificable() {

        const parametros: ITerminal= new dT("U", Tipo.V);

        const A = new Declaracion({
            v: "A",
            terminos: [
                new dT("U", Tipo.V),
                new dT("a", Tipo.c),
                new dTF("f", parametros)
            ]
        });

        const parametrosb: ITerminal= new dT("X", Tipo.V);

        const B = new Declaracion({
            v: "B",
            terminos: [
                new dT("X", Tipo.V),
                new dT("b", Tipo.c),
                new dTF("f", parametrosb)
            ]
        });

        const unificacion = this.unificar(A, B);

        if (unificacion) {
            console.log(
                agentMessage(
                    "Unificador",
                    "Unificacion de A y B = C " + A.imprimir() + ", " + B.imprimir() + ", " + unificacion.imprimir()
                )
            )
        }
    }

    probar() {

        const parametrosG: ITerminal= new dT("Y", Tipo.V);

        const parametros: ITerminal= new dTF("g", parametrosG);

        const A = new Declaracion({
            v: "A",
            terminos: [
                new dT("a", Tipo.c),
                new dT("X", Tipo.V),
                new dTF("f", parametros)
            ]
        });

        const parametrosb: ITerminal = new dT("Z", Tipo.V);

        const parametrosc: ITerminal = new dT("U", Tipo.c);

        const B = new Declaracion({
            v: "B",
            terminos: [
                new dT("Z", Tipo.V),
                new dTF("f", parametrosb),
                new dTF("f", parametrosc)
            ]
        });

        const unificacion = this.unificar(A, B);

        if (unificacion) {
            console.log(
                agentMessage(
                    "Unificador",
                    "Unificacion de A y B = C " + A.imprimir() + ", " + B.imprimir() + ", " + unificacion.imprimir()
                )
            )
        }
    }
}