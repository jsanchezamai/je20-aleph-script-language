"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotorInferencia = void 0;
const rxjs_1 = require("rxjs");
class MotorInferencia {
    constructor() {
        this.evento = new rxjs_1.Subject();
        this.reglas = [];
        this.eventos = this.evento.asObservable();
    }
    arrancar(log) {
        // console.log("motor.arrancar, reglas: ", this.reglas.length);
        this.reglas.forEach(async (regla) => {
            // console.log("\t motor.arrancar, ejecutando: ", regla.claveDominio);
            const inferencia = await regla.evaluar();
            log(inferencia === null || inferencia === void 0 ? void 0 : inferencia.dominio[inferencia === null || inferencia === void 0 ? void 0 : inferencia.claveSalida]);
            // console.log("\t motor.arrancar, propagando resultado: ", inferencia.dominio.base);
            this.evento.next(inferencia);
        });
        for (const r of this.reglas)
            this.reglas.pop();
    }
    trasDetenerse(log) {
        log("MotorInferencia.Detenido");
    }
}
exports.MotorInferencia = MotorInferencia;
