"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CK = exports.CKFases = void 0;
const agentMessage_1 = require("../../../../agentMessage");
const as_common_kads_i18_1 = require("./as-common-kads-i18");
const sistema_1 = require("./sistema");
const nivel_artefactual_1 = require("./nivel/nivel-artefactual");
const nivel_conceptual_1 = require("./nivel/nivel-conceptual");
const nivel_contextual_1 = require("./nivel/nivel-contextual");
const estado_1 = require("./estado");
const fi18 = as_common_kads_i18_1.AS_COMMON_KADS_I18.COMMON_KADS.CK;
var CKFases;
(function (CKFases) {
    CKFases[CKFases["NivelContextual"] = fi18.FASES.CONTEXTUAL.NOMBRE] = "NivelContextual";
    CKFases[CKFases["NivelConceptual"] = fi18.FASES.CONCEPTUAL.NOMBRE] = "NivelConceptual";
    CKFases[CKFases["NivelArtefactual"] = fi18.FASES.DISENYO.NOMBRE] = "NivelArtefactual";
    CKFases[CKFases["Monitorizacion"] = fi18.EJECUCION.NOMBRE] = "Monitorizacion";
})(CKFases || (exports.CKFases = CKFases = {}));
class CK {
    constructor() {
        this.i18 = as_common_kads_i18_1.AS_COMMON_KADS_I18.COMMON_KADS.CK;
        this.nombre = this.i18.NOMBRE;
        this.nivel1 = new nivel_contextual_1.CKNivelContextual();
        this.nivel2 = new nivel_conceptual_1.CKNivelConceptual();
        this.nivel3 = new nivel_artefactual_1.CKNivelArtefactual();
    }
    async instanciar(m) {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, this.i18.CABECERA));
        let fase = {
            fase: CKFases.NivelContextual,
            estado: new estado_1.EstadoT(m),
            alternativas: [],
            objetivo: null,
            especificacion: null,
            sistema: null,
            imprimir: () => `${this.i18.CONSTRUCCION}${this}`,
        };
        this.modeloOrganizacion(fase);
        this.modeloConceptual(fase);
        this.modeloDisenyo(fase);
        return await this.monitorizacion(fase);
    }
    modeloOrganizacion(f) {
        f.fase = CKFases.NivelContextual;
        f.alternativas = this.nivel1.estudioViabilidad(f.estado.comoModelo());
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.FASES.CONTEXTUAL.VIABILIDAD}:
             ${f.alternativas[0].organizacion.imprimir()}`));
        f.objetivo = this.nivel1.estudioImpactoYMejoras(f.alternativas);
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.FASES.CONTEXTUAL.IMPACTO}:
             ${f.objetivo.tareas.imprimir()},
             ${f.objetivo.agentes.imprimir()}`));
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.CONSTRUCCION}: ${f.fase}: ${f.objetivo.conclusiones().imprimir()}`));
        return f;
    }
    modeloConceptual(f) {
        f.fase = CKFases.NivelConceptual;
        const conceptual = this.nivel2.modeloConocimiento(f.objetivo.conclusiones());
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.FASES.CONCEPTUAL.CONOCIMIENTO}:
             ${conceptual.conocimiento.imprimir()}, ${conceptual.uml.imprimir()}, ${conceptual.cml.imprimir()}.`));
        const comunicacion = this.nivel2.modeloComunicaciones(conceptual);
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.FASES.CONCEPTUAL.COMUNICACIONES}:
             ${comunicacion.comunicacion.imprimir()}`));
        f.especificacion = {
            conceptual,
            comunicacion
        };
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.FASES.CONCEPTUAL.ESPECIFICACION}`));
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.CONSTRUCCION}: ${f.fase}`));
        return f;
    }
    modeloDisenyo(f) {
        f.fase = CKFases.NivelArtefactual;
        f.sistema = this.nivel3.sistema(f.especificacion);
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.FASES.DISENYO.NOMBRE}:
             ${f.sistema.disenyo.imprimir()}.`));
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.CONSTRUCCION}: ${f.fase}`));
        return f;
    }
    async monitorizacion(f) {
        return new Promise(async (resolve, reject) => {
            f.fase = CKFases.Monitorizacion;
            console.log((0, agentMessage_1.agentMessage)(this.nombre, this.i18.EJECUCION.CABECERA));
            try {
                const c = new sistema_1.SistemaRuntime(f.sistema);
                c.monitor.subscribe(notificacion => {
                    (0, agentMessage_1.agentMessage)(this.i18.NOMBRE, `${this.i18.EJECUCION.CUERPO}${notificacion}`);
                });
                const resultado = await c.ejecutar();
                resolve(resultado);
            }
            catch (ex) {
                reject(ex.message);
            }
            console.log((0, agentMessage_1.agentMessage)(this.nombre, this.i18.EJECUCION.PIE));
        });
    }
}
exports.CK = CK;
