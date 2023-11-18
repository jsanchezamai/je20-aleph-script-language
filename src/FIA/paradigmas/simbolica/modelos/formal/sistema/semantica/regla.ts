import { i18 } from "../../../../../../i18/aleph-script-i18";
import { IInferencia } from "../../../../inferencia";
import { IReglaRed } from "../../../../regla";
import { InferenciaRelacion } from "../../inferencia/relacion/paradigma";
import { IBusqueda, IGrafo } from "./grafo";

export enum TecnicasInferenciaRed {

    equiparacion,
    herencia,

    instancia,
    subclase,
    parte

}

export interface IPregunta {

    esperado: boolean;
    texto: string;
    constantes: IGrafo[];
    variables: IGrafo[];
    arcos: string[];

}

export interface IApunte {

    tipo: TecnicasInferenciaRed;

    red: IGrafo;

    pregunta: IPregunta;

}

export class Apunte implements IApunte {

    tipo: TecnicasInferenciaRed;
    red: IGrafo;
    pregunta: IPregunta;

}

export class ApunteEquiparacion extends Apunte {

    tipo = TecnicasInferenciaRed.equiparacion;

}

export class ApunteHerencia extends Apunte {

    async inferir(a: IApunte) {

        const problemas = a.pregunta.variables.map(async (v, i) => {

            const camino: IGrafo[] = [];
            const b: IBusqueda = {
                etiqueta: a.pregunta.arcos[i],
                destino: a.pregunta.constantes[i].nombre,
                camino,
                encontrado: false
            }
            let solucion = await v.encontrar(b);
            while(solucion && !b.encontrado) {
                solucion = await solucion.encontrar(b);
            }

            return b;
        });
        const parciales = await Promise.all(problemas);
        // console.log("PARCI", parciales)
        const solucion = parciales.find(s => s.encontrado === a.pregunta.esperado);
        // console.log("PARCI SOL", solucion)
        if (!solucion) {
            console.log(a.pregunta.constantes, a.pregunta.variables)
            return `\n\t - ¡ERROR! Se esperaba: ${a.pregunta.esperado}, se obtuvo: ${solucion}`;
        }
        return `\n\t - Respuesta: ${solucion.camino.map(c => c.imprimir()).join("\t - ")}`;
    }

    tipo = TecnicasInferenciaRed.herencia;

}

export class ReglaRed extends InferenciaRelacion implements IReglaRed {

    apunte: IApunte;

    enunciado(): string {

        const p = this?.apunte?.pregunta;

        if (!p) return "No inicializado";

        return `${p.texto} ¿${p.esperado}?: ${i18.SIMBOLICA.SEMANTICA.INFERENCIA_NATURAL_LABEL
                .replace("<clave", this.tipo.toString())
                .replace("<constantes>", p.constantes.map(c => c.nombre).join(" - "))
                .replace("<variables>", p.variables.map(c => c.nombre).join(" - "))
                .replace("<arcos>", p.arcos.join(" - "))
                .replace("<entidades>", this.apunte.red.nombre)}`;
    }

    async evaluar(): Promise<IInferencia> {

        this.apunte = this.analizarParametros();

        switch(this.tipo) {
            case TecnicasInferenciaRed.equiparacion:

                const apunteEquiparacion = new ApunteEquiparacion();
                console.log("¡Acabado!")

                break;
            case TecnicasInferenciaRed.herencia:

                const apunteHerencia = new ApunteHerencia();
                this.dominio[this.claveSalida] = `${this.enunciado()} \t - ${await apunteHerencia.inferir(this.apunte)}`;
                break;
            default:
                console.log("¡Acabado3!")
                //
        }

        return this;
    }

    analizarParametros(): IApunte {

        const activar = this.activar();
        const c = activar.parametros;

        // console.log("Inicia analisis de parametros");

        const texto = c["texto"];
        const esperado = c["esperado"];
        const arcos = Object.keys(c).filter(a => a != "texto" && a != "esperado");

        // console.log("01: arcos", arcos);

        const variables = arcos.map(arco => Object.keys(c[arco]).map(variable => { return { arco, variable }})).flat();

        // console.log("02: variables", variables);

        const constantes = variables.map((ct: { arco: string, variable: string }) => c[ct.arco][ct.variable]).map(cl => Object.keys(cl)[0]);

        // console.log("03: constantes", constantes);

        const e = activar.contexto.entidades;
        const clavesAObjetos = (claves: string[]) => claves
            .map(cl => { const ee = e.find(i => cl === i.nombre); if (!ee) console.log("no for", cl); return ee});

        return {

            tipo: this.tipo,

            red: activar.contexto.raiz,

            pregunta: {
                esperado,
                texto,
                constantes: clavesAObjetos(constantes),
                variables: clavesAObjetos(variables.map(v => v.variable)),
                arcos
            }
        }

    }
}