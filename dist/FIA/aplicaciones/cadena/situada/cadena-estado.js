"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaEstado = exports.CadenaEstados = void 0;
const estado_1 = require("../../../paradigmas/situada/estado");
var CadenaEstados;
(function (CadenaEstados) {
    CadenaEstados["PARADA"] = "PARADA";
    CadenaEstados["ARRANCAR"] = "ARRANCAR";
    CadenaEstados["AVANZAR"] = "AVANZAR";
    CadenaEstados["PARAR"] = "PARAR";
    CadenaEstados["FUERA_SERVICIO"] = "FUERA_SERVICIO";
})(CadenaEstados || (exports.CadenaEstados = CadenaEstados = {}));
class CadenaEstado extends estado_1.EstadoT {
    transicion() {
        switch (this.modelo.motor) {
            case CadenaEstados.PARADA:
                this.modelo.motor = CadenaEstados.ARRANCAR;
                break;
            case CadenaEstados.ARRANCAR:
                this.modelo.motor = CadenaEstados.AVANZAR;
                break;
            case CadenaEstados.AVANZAR:
                /**
                 * Procesar la aferencia
                 **/
                // La cinta trabajará con la luz apagada la primera mitad del día
                // y con la luz encendida la segunda.
                const iluminacion = this.modelo.dia % 2 == 0;
                /**
                 *  Construir la eferencia
                 **/
                this.modelo.posicion++;
                this.modelo.iluminacion = iluminacion;
                /**
                 * Construir la condición de salida
                 **/
                // El autómata detendrá la simulación
                // con tiempo de parar la máquina;
                // teniendo en cuenta el tiempo de arranque y de parada
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
                this.modelo.iluminacion = false;
                this.modelo.motor = CadenaEstados.PARADA;
        }
    }
}
exports.CadenaEstado = CadenaEstado;
