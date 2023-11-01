"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traductor = void 0;
class Traductor {
    /**
     *
     * Dado un texto plantilla, sustituye las claves por el valor del objeto pasado.
     *
     * @param nodoTraducciones
     * @param plantilla
     * @returns
     */
    /*
    {

        Ejemplo: data el objeto:

        tarea_cadena_robot_objeto_almacen: {

            parametros: {
                tarea: "",
                cadena: "",
                robot: "",
                objeto: "",
                almacen: ""
            },
            desencadenar: "Tarea: <clave>. Agente <robot>: <tarea> <objeto> entre <almacen> y <cadena>. <texto>",
            encadenar: "Tarea: <clave>. Agente <robot>: <tarea> <objeto> entre <almacen> y <cadena>. <texto>"

        },

        Usar como:

        const m = tarea_cadena_robot_objeto_almacen;
        crearTextoAyuda(m.desencadenar, m.texto);
    }
    */
    crearTextoAyuda(clave, parametros, plantilla) {
        try {
            plantilla = plantilla.replace("clave", clave);
            const sustituciones = Object.keys(parametros);
            sustituciones.reduce((plantilla, s) => plantilla.replace(s, parametros[s]));
            return plantilla;
        }
        catch (ex) {
            console.log("Traductor.crearTextoAyuda.error", ex.message, clave, parametros, plantilla);
            return plantilla;
        }
    }
}
exports.Traductor = Traductor;
