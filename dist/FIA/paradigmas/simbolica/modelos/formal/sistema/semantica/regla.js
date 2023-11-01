"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReglaRed = void 0;
const labels_1 = require("../../../../../../i18/labels");
const traductor_1 = require("../../../../../../i18/traductor");
const paradigma_1 = require("../../inferencia/relacion/paradigma");
class ReglaRed extends paradigma_1.InferenciaRelacion {
    async evaluar() {
        const activar = this.activar();
        const tipo = Object.keys(activar.parametros)[0];
        const agentes = Object.keys(activar.parametros[tipo]);
        const sujetos = Object
            .keys(activar.parametros[tipo])
            .map(parametro => activar.parametros[tipo][parametro])
            .map(sujeto => {
            return Object.keys(sujeto);
        })
            .flat();
        const entidades = activar
            .contexto
            .arcos
            .estado
            .map(arco => arco.destino)
            .filter(destino => agentes.concat(sujetos).indexOf(destino.nombre) > -1)
            .flat();
        const traductor = new traductor_1.Traductor();
        console.log(labels_1.i18.SIMBOLICA.SEMANTICA.REGLA + ">", labels_1.i18.SIMBOLICA.SEMANTICA.INFERENCIA
            .replace("<clave>", tipo)
            .replace("<agentes>", agentes.join(" - "))
            .replace("<sujetos>", sujetos.join(" - "))
            .replace("<entidades>", entidades.map(e => e.nombre).join(" - ")));
        switch (tipo) {
            case "instancia":
            case "subclase":
            case "parte":
                const agente = agentes[0];
                const sujeto = sujetos[0];
                console.log(labels_1.i18.SIMBOLICA.SEMANTICA.REGLA + ">", labels_1.i18.SIMBOLICA.SEMANTICA.INFERENCIA_NATURAL_LABEL
                    .replace("agente", agente)
                    .replace("sujeto", sujeto)
                    .replace("arco", tipo));
                const busqueda_inicio = entidades.find(e => e.nombre === agente);
                console.log("Empieza la búsqueda en", busqueda_inicio.nombre);
                const camino = [];
                const buscar = await busqueda_inicio.encontrar(sujeto, tipo, camino);
                console.log("Resultado búsqueda:", buscar === null || buscar === void 0 ? void 0 : buscar.nombre);
                break;
            default:
        }
        return this;
    }
}
exports.ReglaRed = ReglaRed;
