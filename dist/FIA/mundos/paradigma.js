"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mundo = exports.Modelo = void 0;
const thread_1 = require("../thread");
const labels_1 = require("../i18/labels");
const rxjs_1 = require("rxjs");
class Modelo {
    constructor() {
        this.nombre = "Modelo base. 3 días; pulso: 1 segundo";
        this.dia = 0;
        this.muerte = 3;
        this.pulso = 1000;
    }
    imprimir() {
        return Object
            .keys(this).map(k => `${k}: ${this[k]}`).join("\n\t\t -");
    }
}
exports.Modelo = Modelo;
class Mundo {
    constructor() {
        this.nombre = "mundo-1";
        this.modelo = new Modelo();
        this.eferencia = new rxjs_1.Subject();
        this.aferencias = [];
    }
    agregarAferencia(o) {
        const s = o.subscribe(m => {
            this.modelo = m.modelo;
            console.log((0, thread_1.agentMessage)(this.nombre, labels_1.i18.MUNDO.AFERENCIA.RECEPCION_LABEL), this.modelo.imprimir());
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
    async ciclo() {
        return await new Promise((resolve, reject) => {
            console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.MUNDO.INICIO_LABEL}`));
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
        clearInterval(intervalo);
        this.destructor();
    }
    destructor() {
        this.aferencias.forEach(s => s.unsubscribe());
        console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.MUNDO.FIN_LABEL}`));
    }
    pulso() {
        this.modelo.dia++;
        console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.MUNDO.DIA_LABEL} ${this.modelo.dia}`));
        this.eferencia.next(this);
    }
    vivo() {
        return this.modelo.dia < this.modelo.muerte;
    }
}
exports.Mundo = Mundo;
