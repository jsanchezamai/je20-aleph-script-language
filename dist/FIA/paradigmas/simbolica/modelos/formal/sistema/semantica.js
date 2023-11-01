"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedSemantica = exports.ReglaRed = exports.Grafo = exports.Arcos = exports.ArcoEstructural = exports.ArcoDescriptivo = exports.EtiquetaDescriptiva = exports.EtiquetaEstructural = exports.RelacionDescriptiva = exports.RelacionEstructural = exports.Entidad = void 0;
const paradigma_1 = require("../inferencia/relacion/paradigma");
const paradigma_2 = require("../paradigma");
const cadena_fia_red_semantica_1 = require("../../../../../aplicaciones/cadena/simbolica/formal/cadena-fia-red-semantica");
const labels_1 = require("../../../../../i18/labels");
const thread_1 = require("../../../../../thread");
const traductor_1 = require("../../../../../i18/traductor");
class Entidad {
    constructor() {
        this.nombre = "entidad";
        this.valor = "entidad";
    }
    imprimir() {
        return this.nombre;
    }
}
exports.Entidad = Entidad;
class RelacionEstructural {
    constructor() {
        this.valor = "";
    }
}
exports.RelacionEstructural = RelacionEstructural;
class RelacionDescriptiva {
}
exports.RelacionDescriptiva = RelacionDescriptiva;
class EtiquetaEstructural {
    constructor() {
        this.estado = new RelacionEstructural();
    }
}
exports.EtiquetaEstructural = EtiquetaEstructural;
class EtiquetaDescriptiva {
    constructor() {
        this.estado = new RelacionDescriptiva();
    }
}
exports.EtiquetaDescriptiva = EtiquetaDescriptiva;
class ArcoDescriptivo {
    constructor() {
        this.etiqueta = new EtiquetaDescriptiva();
    }
}
exports.ArcoDescriptivo = ArcoDescriptivo;
class ArcoEstructural {
    constructor() {
        this.etiqueta = new EtiquetaEstructural();
    }
}
exports.ArcoEstructural = ArcoEstructural;
class Arcos {
    constructor() {
        this.estado = [];
    }
}
exports.Arcos = Arcos;
class Grafo {
    constructor() {
        this.arcos = new Arcos();
    }
    imprimir() {
        let out = "";
        out += "\n\t - (grafo) -" + this.nombre + "; arcos";
        this.arcos.estado.forEach(e => {
            out += "\n\t\t - " + e.etiqueta.estado.nombre;
        });
        return out;
    }
}
exports.Grafo = Grafo;
class ReglaRed extends paradigma_1.InferenciaRelacion {
}
exports.ReglaRed = ReglaRed;
class RedSemantica extends paradigma_2.Formal {
    constructor() {
        super(...arguments);
        this.nombre = labels_1.i18.SIMBOLICA.SEMANTICA.NOMBRE;
        this.base = new Grafo();
        this.motor = new ReglaRed();
    }
    cargar(red, entidades) {
        /**
         * Añadir entidades maestras
         */
        Object.keys(red.ENTIDADES).forEach(i => {
            // Creación de entidad
            const valor = red.ENTIDADES[i];
            // Opcional: mapeo de valores por defecto
            const entidad = Object.assign(new cadena_fia_red_semantica_1.CadenaGrafo(), {});
            entidad.nombre = valor;
            console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ENTIDADES_LABEL}${valor}`));
            entidades.push(entidad);
        });
        /**
         * Añadir entidades del arco "subclase-de"
         */
        Object.keys(red.ARCOS.ESTRUCTURALES.SUBCLASE).forEach(clase_hija => {
            const etiqueta_texto = red.ARCOS.ESTRUCTURALES.SUBCLASE.texto;
            if (clase_hija === "texto") {
                return;
            }
            const existing = entidades.find(e => e.nombre === clase_hija);
            const grafoHija = existing || new cadena_fia_red_semantica_1.CadenaGrafo();
            if (existing) {
            }
            else {
                entidades.push(grafoHija);
                grafoHija.nombre = clase_hija;
            }
            const padres = red.ARCOS.ESTRUCTURALES.SUBCLASE[clase_hija];
            Object.keys(padres).forEach(clase_padre => {
                const grafoPadre = entidades.find(e => e.nombre === clase_padre);
                if (!grafoPadre) {
                    console.log("Error de integridad en CadenaFiaRedSemantica.ARCOS.ESTRUCTURALES.SUBCLASE", ", padre no encontrado para la hija:", clase_hija, ", padre:", clase_padre);
                    return;
                }
                const relacion = new RelacionEstructural();
                relacion.nombre = etiqueta_texto.replace("clave", grafoHija.nombre).replace("valor", grafoPadre.nombre);
                const etiqueta = new EtiquetaEstructural();
                etiqueta.estado = relacion;
                const arco = new ArcoEstructural();
                arco.destino = grafoPadre;
                arco.etiqueta = etiqueta;
                grafoHija.arcos.estado.push(arco);
                console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_SUBCLASES_LABEL}${grafoHija.nombre}/${grafoPadre.nombre}`));
            });
        });
        /**
        * Añadir entidades del arco "parte-de"
        */
        Object.keys(red.ARCOS.ESTRUCTURALES.PARTE).forEach(clase_padre => {
            const etiqueta_texto = red.ARCOS.ESTRUCTURALES.PARTE.texto;
            if (clase_padre === "texto") {
                return;
            }
            const existing = entidades.find(e => e.nombre === clase_padre);
            const grafoPadre = existing || new cadena_fia_red_semantica_1.CadenaGrafo();
            if (existing) {
            }
            else {
                entidades.push(grafoPadre);
                grafoPadre.nombre = clase_padre;
            }
            const partes = red.ARCOS.ESTRUCTURALES.PARTE[clase_padre];
            Object.keys(partes).forEach(clase_hijo => {
                const existing2 = entidades.find(e => e.nombre === clase_hijo);
                const grafoHijo = existing2 || new cadena_fia_red_semantica_1.CadenaGrafo();
                if (existing2) {
                }
                else {
                    entidades.push(grafoHijo);
                    grafoHijo.nombre = clase_hijo;
                }
                const relacion = new RelacionEstructural();
                relacion.nombre = etiqueta_texto.replace("clave", grafoPadre.nombre).replace("valor", grafoHijo.nombre);
                const etiqueta = new EtiquetaEstructural();
                etiqueta.estado = relacion;
                const arco = new ArcoEstructural();
                arco.destino = grafoPadre;
                arco.etiqueta = etiqueta;
                grafoHijo.arcos.estado.push(arco);
                console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_PARTE_LABEL}${grafoHijo.nombre}/${grafoPadre.nombre}`));
            });
        });
        /**
        * Añadir entidades del arco "instancia-de"
        */
        Object.keys(red.ARCOS.ESTRUCTURALES.INSTANCIA).forEach(clase_hija => {
            const etiqueta_texto = red.ARCOS.ESTRUCTURALES.INSTANCIA.texto;
            if (clase_hija === "texto") {
                return;
            }
            const existing = entidades.find(e => e.nombre === clase_hija);
            const grafoHijo = existing || new cadena_fia_red_semantica_1.CadenaGrafo();
            if (existing) {
            }
            else {
                entidades.push(grafoHijo);
                grafoHijo.nombre = clase_hija;
            }
            const padres = red.ARCOS.ESTRUCTURALES.INSTANCIA[clase_hija];
            Object.keys(padres).forEach(clase_padre => {
                const existing2 = entidades.find(e => e.nombre === clase_padre);
                const grafoPadre = existing2 || new cadena_fia_red_semantica_1.CadenaGrafo();
                if (existing2) {
                }
                else {
                    entidades.push(grafoPadre);
                    grafoPadre.nombre = clase_padre;
                }
                const relacion = new RelacionEstructural();
                relacion.nombre = etiqueta_texto.replace("clave", grafoHijo.nombre).replace("valor", grafoPadre.nombre);
                const etiqueta = new EtiquetaEstructural();
                etiqueta.estado = relacion;
                const arco = new ArcoEstructural();
                arco.destino = grafoPadre;
                arco.etiqueta = etiqueta;
                grafoHijo.arcos.estado.push(arco);
                console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_INSTANCIA_LABEL}${grafoPadre.nombre}/${grafoHijo.nombre}`));
            });
        });
        /**
        * Añadir entidades del arco "descriptivo"
        */
        Object.keys(red.ARCOS.DESCRIPTIVOS).forEach(clase_padre => {
            const existing = entidades.find(e => e.nombre === clase_padre);
            const grafoPadre = existing || new cadena_fia_red_semantica_1.CadenaGrafo();
            if (existing) {
            }
            else {
                entidades.push(grafoPadre);
                grafoPadre.nombre = clase_padre;
            }
            const partes = red.ARCOS.DESCRIPTIVOS[clase_padre];
            let parametros;
            Object.keys(partes).forEach(clase_hijo => {
                if (!parametros) {
                    console.log("ERROR> Simbolica.Formal.Sistema.Semantica.CargarArcosDescriptivos.Error en el fichero de traducción. El primer nodo debe ser  'parametros");
                    return;
                }
                const existing2 = entidades.find(e => e.nombre === clase_hijo);
                const grafoHijo = existing2 || new cadena_fia_red_semantica_1.CadenaGrafo();
                if (existing2) {
                }
                else {
                    entidades.push(grafoHijo);
                    grafoHijo.nombre = clase_hijo;
                }
                const etiqueta_texto = partes[clase_hijo];
                const relacion = new RelacionDescriptiva();
                relacion.nombre = new traductor_1.Traductor().crearTextoAyuda(clase_hijo, parametros, etiqueta_texto);
                ;
                const etiqueta = new EtiquetaDescriptiva();
                etiqueta.estado = relacion;
                const arco = new ArcoDescriptivo();
                arco.destino = grafoPadre;
                arco.etiqueta = etiqueta;
                grafoHijo.arcos.estado.push(arco);
                console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_DESCRIPTIVOS_LABEL}${grafoHijo.nombre}/${grafoPadre.nombre}`));
            });
        });
    }
}
exports.RedSemantica = RedSemantica;
