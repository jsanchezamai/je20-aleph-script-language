"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaRuntime = void 0;
const rxjs_1 = require("rxjs");
const modelo_1 = require("../../../../mundos/modelo");
const as_common_kads_i18_1 = require("./as-common-kads-i18");
const agentMessage_1 = require("../../../../agentMessage");
const estado_1 = require("./estado");
class SistemaRuntime {
    constructor(sistema) {
        this.sistema = sistema;
        this.i18 = as_common_kads_i18_1.AS_COMMON_KADS_I18.COMMON_KADS.SISTEMA;
        this.nombre = this.i18.NOMBRE;
        this.sujeto = new rxjs_1.Subject();
        this.monitor = this.sujeto.asObservable();
    }
    async ejecutar() {
        return new Promise(async (resolve, reject) => {
            console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.CABECERA}`));
            const estado = new estado_1.EstadoT(new modelo_1.Modelo());
            try {
                await this.sistema.aplicacion.iniciar(estado);
                resolve(estado);
            }
            catch (ex) {
                reject(ex.message);
            }
            console.log((0, agentMessage_1.agentMessage)(this.nombre, `${this.i18.PIE}`));
        });
    }
}
exports.SistemaRuntime = SistemaRuntime;
