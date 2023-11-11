"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReglaRed = exports.ApunteHerencia = exports.ApunteEquiparacion = exports.Apunte = exports.TecnicasInferenciaRed = void 0;
const aleph_script_i18_1 = require("../../../../../../i18/aleph-script-i18");
const paradigma_1 = require("../../inferencia/relacion/paradigma");
var TecnicasInferenciaRed;
(function (TecnicasInferenciaRed) {
    TecnicasInferenciaRed[TecnicasInferenciaRed["equiparacion"] = 0] = "equiparacion";
    TecnicasInferenciaRed[TecnicasInferenciaRed["herencia"] = 1] = "herencia";
    TecnicasInferenciaRed[TecnicasInferenciaRed["instancia"] = 2] = "instancia";
    TecnicasInferenciaRed[TecnicasInferenciaRed["subclase"] = 3] = "subclase";
    TecnicasInferenciaRed[TecnicasInferenciaRed["parte"] = 4] = "parte";
})(TecnicasInferenciaRed || (exports.TecnicasInferenciaRed = TecnicasInferenciaRed = {}));
class Apunte {
}
exports.Apunte = Apunte;
class ApunteEquiparacion extends Apunte {
    constructor() {
        super(...arguments);
        this.tipo = TecnicasInferenciaRed.equiparacion;
    }
}
exports.ApunteEquiparacion = ApunteEquiparacion;
class ApunteHerencia extends Apunte {
    constructor() {
        super(...arguments);
        this.tipo = TecnicasInferenciaRed.herencia;
    }
    async inferir(a) {
        const problemas = a.pregunta.variables.map(async (v, i) => {
            const camino = [];
            const b = {
                etiqueta: a.pregunta.arcos[i],
                destino: a.pregunta.constantes[i].nombre,
                camino,
                encontrado: false
            };
            let solucion = await v.encontrar(b);
            while (solucion && !b.encontrado) {
                solucion = await solucion.encontrar(b);
            }
            return b.encontrado;
        });
        const solucion = await Promise.all(problemas);
        return solucion.find(s => !s) ? 'FALSO' : 'CIERTO';
    }
}
exports.ApunteHerencia = ApunteHerencia;
class ReglaRed extends paradigma_1.InferenciaRelacion {
    enunciado() {
        var _a;
        const p = (_a = this === null || this === void 0 ? void 0 : this.apunte) === null || _a === void 0 ? void 0 : _a.pregunta;
        if (!p)
            return "No inicializado";
        return `
            ${aleph_script_i18_1.i18.SIMBOLICA.SEMANTICA.REGLA}>
            ${aleph_script_i18_1.i18.SIMBOLICA.SEMANTICA.INFERENCIA_NATURAL_LABEL
            .replace("<clave", this.tipo.toString())
            .replace("<constantes>", p.constantes.map(c => c.nombre).join(" - "))
            .replace("<variables>", p.variables.map(c => c.nombre).join(" - "))
            .replace("<arcos>", p.arcos.join(" - "))
            .replace("<entidades>", this.apunte.red.nombre)}`;
    }
    async evaluar() {
        this.apunte = this.analizarParametros();
        switch (this.tipo) {
            case TecnicasInferenciaRed.equiparacion:
                const apunteEquiparacion = new ApunteEquiparacion();
                console.log("¡Acabado!");
                break;
            case TecnicasInferenciaRed.herencia:
                const apunteHerencia = new ApunteHerencia();
                this.dominio[this.claveSalida] = `${this.enunciado()} ${await apunteHerencia.inferir(this.apunte)}`;
                break;
            default:
                console.log("¡Acabado3!");
            //
        }
        return this;
    }
    analizarParametros() {
        const activar = this.activar();
        const c = activar.parametros;
        // console.log("Inicia analisis de parametros");
        const arcos = Object.keys(c).filter(a => a != "texto");
        // console.log("01: arcos", arcos);
        const variables = arcos.map(arco => Object.keys(c[arco]).map(variable => { return { arco, variable }; })).flat();
        // console.log("02: variables", variables);
        const constantes = variables.map((ct) => c[ct.arco][ct.variable]).map(cl => Object.keys(cl)[0]);
        // console.log("03: constantes", constantes);
        const e = activar.contexto.entidades;
        const clavesAObjetos = (claves) => claves
            .map(cl => { const ee = e.find(i => cl === i.nombre); if (!ee)
            console.log("no for", cl); return ee; });
        return {
            tipo: this.tipo,
            red: activar.contexto.raiz,
            pregunta: {
                constantes: clavesAObjetos(constantes),
                variables: clavesAObjetos(variables.map(v => v.variable)),
                arcos
            }
        };
    }
}
exports.ReglaRed = ReglaRed;
