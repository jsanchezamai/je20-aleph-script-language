"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaEstado = exports.CadenaEstados = void 0;
const paradigma_1 = require("../../../paradigmas/situada/paradigma");
var CadenaEstados;
(function (CadenaEstados) {
    CadenaEstados["PARADA"] = "PARADA";
    CadenaEstados["ARRANCAR"] = "ARRANCAR";
    CadenaEstados["AVANZAR"] = "AVANZAR";
    CadenaEstados["PARAR"] = "PARAR";
    CadenaEstados["FUERA_SERVICIO"] = "FUERA_SERVICIO";
})(CadenaEstados || (exports.CadenaEstados = CadenaEstados = {}));
class CadenaEstado extends paradigma_1.EstadoT {
    transicion() {
        switch (this.modelo.motor) {
            case CadenaEstados.PARADA:
                this.modelo.motor = CadenaEstados.ARRANCAR;
                break;
            case CadenaEstados.ARRANCAR:
                this.modelo.motor = CadenaEstados.AVANZAR;
                break;
            case CadenaEstados.AVANZAR:
                // Condicionar en función de la aferencia
                const iluminacion = this.modelo.dia % 2 == 0;
                // Construir la eferencia
                this.modelo.posicion++;
                this.modelo.iluminacion = iluminacion;
                // El autómata acabará con tiempo de parar la máquina antes
                // de que finalice el tiempo del mundo donde opera
                const tiempoArranque = 2;
                const tiempoParada = 2;
                if (this.modelo.posicion === (this.modelo.muerte - tiempoArranque - tiempoParada)) {
                    this.modelo.motor = CadenaEstados.PARAR;
                }
                break;
            case CadenaEstados.PARAR:
                this.modelo.posicion = 0;
                this.modelo.iluminacion = false;
                this.modelo.motor = CadenaEstados.FUERA_SERVICIO;
                break;
            default:
                this.modelo.motor = CadenaEstados.PARADA;
        }
    }
}
exports.CadenaEstado = CadenaEstado;
