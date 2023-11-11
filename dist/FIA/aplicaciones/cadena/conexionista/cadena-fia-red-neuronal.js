"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaFiaRedNeuronal = exports.CadenaRedNeuronal = void 0;
const aleph_script_i18_1 = require("../../../i18/aleph-script-i18");
const red_neuronal_1 = require("../../../paradigmas/conexionista/red-neuronal");
const agentMessage_1 = require("../../../agentMessage");
const cadena_fia_conexionista_1 = require("./cadena-fia-conexionista");
const cadena_inferencia_lenguaje_natural_1 = require("./cadena-inferencia-lenguaje-natural");
const api_1 = require("../../../paradigmas/conexionista/modelos-lenguaje/oai/api");
const dominio_1 = require("../../../mundos/dominio");
class CadenaRedNeuronal extends red_neuronal_1.RedNeuronalArtificial {
}
exports.CadenaRedNeuronal = CadenaRedNeuronal;
class CadenaFiaRedNeuronal extends cadena_fia_conexionista_1.CadenaFIAConexionista {
    constructor() {
        super(...arguments);
        this.modelo = new CadenaRedNeuronal();
        this.nombre = aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.RED.NOMBRE;
    }
    async instanciar() {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.SIMULATION_START));
        await this.cargaRed();
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.APPS.CADENA.SIMULATION_BODY}:${this.imprimir()}`));
        await this.mundo.alAcabar(this.nombre);
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.SIMULATION_END}`));
        return "";
    }
    async cargaRed() {
        this.mundo.agregarAferencia(this.modelo.eventos.asObservable());
        this.mundo.eferencia.subscribe(async (m) => {
            console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.AFERENCIA));
            await this.probar();
        });
    }
    async probar() {
        return new Promise((resolve, reject) => {
            const c = aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.NEURONAL.PROMPTS;
            const prompts = {
                system: {
                    background: c.SYSTEM.BACKGROUND,
                    format: c.SYSTEM.FORMAT
                },
                assistant: {
                    cache: c.ASSISTANT.CACHE,
                    archive: c.ASSISTANT.ARCHIVE
                },
                user: {
                    analytics: c.USER.ANALYTICS,
                    prompt: c.USER.PROMPT
                }
            };
            const regla = new cadena_inferencia_lenguaje_natural_1.CadenaInferenciaLenguajeNatural();
            const parametros = new dominio_1.Dominio(prompts);
            const a = {
                state: api_1.STATES.NOT_INIT,
                modelo: this.mundo.modelo
            };
            regla.configurar(a, parametros);
            this.modelo.motor.reglas.push(regla);
            console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.APPS.CADENA.TEST.CASO.BUCLE.CREAR_REGLA_LABEL}:${0} con prompts: ${regla.mensajes.length}`));
            this.modelo.motor.arrancar((log) => {
                console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.INFERENCIA}: resolución de la api: ${Object.keys(log).join(" - ")}`));
                this.modelo.eventos.next(this.mundo);
            });
            const takeOne = this.modelo.motor.eventos.subscribe(s => {
                var _a;
                this.mundo.modelo.dominio['modelo.motor.eventos'] = ((_a = s === null || s === void 0 ? void 0 : s.dominio) === null || _a === void 0 ? void 0 : _a.base) || this.mundo.modelo.dominio['modelo.motor.eventos'];
                takeOne.unsubscribe();
            });
            /**
             *  Capturar evento de parada
             * */
            this.modelo.motor.trasDetenerse(() => {
                console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.APPS.CADENA.CONEXIONISTA.INFERENCIA}:${"Motor de inferencias parado. Se han lanzado todas las inferencia. Esperando resultados...!"}`));
                resolve();
            });
            /**
             *  Condición de salida
             * */
            setTimeout(() => reject("forma.sistema.semantica.paradigma.RedSemantica.probar, tiempo expirado!"), 5000);
        });
    }
}
exports.CadenaFiaRedNeuronal = CadenaFiaRedNeuronal;
