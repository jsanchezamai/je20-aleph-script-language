"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mundo = void 0;
const agentMessage_1 = require("../agentMessage");
const aleph_script_i18_1 = require("../i18/aleph-script-i18");
const rxjs_1 = require("rxjs");
const modelo_1 = require("./modelo");
const mundos_i18_1 = require("./mundos-i18");
class Mundo {
    constructor() {
        this.i18 = mundos_i18_1.AS_MUNDO_i18;
        this.nombre = "mundo-1";
        this.modelo = new modelo_1.Modelo();
        this.eferencia = new rxjs_1.Subject();
        this.aferencias = [];
        this.alAcabarCallbacks = [];
    }
    agregarAferencia(o) {
        const s = o.subscribe(m => {
            this.modelo = m.modelo;
            console.log((0, agentMessage_1.agentMessage)(this.nombre, aleph_script_i18_1.i18.MUNDO.AFERENCIA.RECEPCION_LABEL), this.modelo.imprimir());
        });
        this.aferencias.push(s);
    }
    async instanciar() {
        return await new Promise(async (resolve, reject) => {
            // Iniciar el contador de programa
            const modelo = await this.ciclo();
            resolve(modelo);
        });
    }
    async alAcabar(nombre = "unknown") {
        return await new Promise((resolve, reject) => {
            this.alAcabarCallbacks.push({
                nombre, callback: resolve
            });
            console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.MUNDO.NUEVO_SUSCRIPTOR_LABEL}, ${nombre}, suscriptores: ${this.alAcabarCallbacks.map(c => c.nombre).length}`));
        });
    }
    async ciclo() {
        return await new Promise((resolve, reject) => {
            console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.MUNDO.INICIO_LABEL} Pulso: ${this.modelo.pulso}`));
            this.pulsoVital = setInterval(() => this.jornada(resolve, reject), this.modelo.pulso);
        });
    }
    jornada(vivir, morir) {
        if (this.vivo()) {
            try {
                this.pulso();
            }
            catch (ex) {
                console.log("Error en mundo", this.nombre, ex.message);
                this.deponer(this.pulsoVital);
                return morir({
                    estado: ex.message,
                    modelo: this.modelo
                });
            }
        }
        else {
            this.deponer(this.pulsoVital);
            vivir(this.modelo);
        }
    }
    deponer(intervalo) {
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.MUNDO.FIN_LABEL}, deponer ${this.alAcabarCallbacks.map(c => c.nombre)}`));
        clearInterval(intervalo);
        this.alAcabarCallbacks.forEach(c => c.callback(this.modelo));
        this.destructor();
    }
    destructor() {
        this.aferencias.forEach(s => s.unsubscribe());
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.MUNDO.FIN_LABEL}, ${this.alAcabarCallbacks}`));
    }
    pulso() {
        this.modelo.dia++;
        console.log((0, agentMessage_1.agentMessage)(this.nombre, `${aleph_script_i18_1.i18.MUNDO.DIA_LABEL} ${this.modelo.dia}`));
        this.eferencia.next(this);
    }
    vivo() {
        return this.modelo.dia < this.modelo.muerte;
    }
}
exports.Mundo = Mundo;
