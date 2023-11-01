"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedSemantica = exports.ReglaRed = void 0;
const paradigma_1 = require("../../../../paradigma");
const paradigma_2 = require("../../inferencia/relacion/paradigma");
const paradigma_3 = require("../../paradigma");
const cadena_fia_red_semantica_1 = require("../../../../../../aplicaciones/cadena/simbolica/formal/cadena-fia-red-semantica");
const labels_1 = require("../../../../../../i18/labels");
const thread_1 = require("../../../../../../thread");
const traductor_1 = require("../../../../../../i18/traductor");
const arcos_1 = require("./arcos");
const grafo_1 = require("./grafo");
class ReglaRed extends paradigma_2.InferenciaRelacion {
    evaluar() {
        const activar = this.activar();
        console.log(labels_1.i18.SIMBOLICA.SEMANTICA.REGLA, "> ReglaRed", "Entidades origen: ", activar.contexto.arcos.estado.length, "Parametros: ", activar.parametros);
        return this;
    }
}
exports.ReglaRed = ReglaRed;
class RedSemantica extends paradigma_3.Formal {
    constructor() {
        super(...arguments);
        this.entidades = [];
        this.nombre = labels_1.i18.SIMBOLICA.SEMANTICA.NOMBRE;
        this.base = new grafo_1.Grafo();
        this.motor = new paradigma_1.MotorInferencia();
    }
    cargar(red) {
        const entidades = this.entidades; // árbol a grafo
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
            this.entidades.push(entidad);
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
                const grafoPadre = this.entidades.find(e => e.nombre === clase_padre);
                if (!grafoPadre) {
                    console.log("Error de integridad en CadenaFiaRedSemantica.ARCOS.ESTRUCTURALES.SUBCLASE", ", padre no encontrado para la hija:", clase_hija, ", padre:", clase_padre);
                    return;
                }
                const relacion = new arcos_1.RelacionEstructural();
                relacion.nombre = etiqueta_texto.replace("clave", grafoHija.nombre).replace("valor", grafoPadre.nombre);
                const etiqueta = new arcos_1.EtiquetaEstructural();
                etiqueta.estado = relacion;
                const arco = new arcos_1.ArcoEstructural();
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
                const relacion = new arcos_1.RelacionEstructural();
                relacion.nombre = etiqueta_texto.replace("clave", grafoPadre.nombre).replace("valor", grafoHijo.nombre);
                const etiqueta = new arcos_1.EtiquetaEstructural();
                etiqueta.estado = relacion;
                const arco = new arcos_1.ArcoEstructural();
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
                const relacion = new arcos_1.RelacionEstructural();
                relacion.nombre = etiqueta_texto.replace("clave", grafoHijo.nombre).replace("valor", grafoPadre.nombre);
                const etiqueta = new arcos_1.EtiquetaEstructural();
                etiqueta.estado = relacion;
                const arco = new arcos_1.ArcoEstructural();
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
                if (clase_hijo === "parametros") {
                    const partes = red.ARCOS.DESCRIPTIVOS[clase_padre];
                    parametros = partes[clase_hijo];
                    return;
                }
                if (!parametros) {
                    console.log("ERROR> Simbolica.Formal.Sistema.Semantica.CargarArcosDescriptivos.Error en el fichero de traducción. El primer nodo debe ser  'parametros'", clase_hijo);
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
                const relacion = new arcos_1.RelacionDescriptiva();
                relacion.nombre = new traductor_1.Traductor().crearTextoAyuda(clase_hijo, parametros, etiqueta_texto);
                ;
                const etiqueta = new arcos_1.EtiquetaDescriptiva();
                etiqueta.estado = relacion;
                const arco = new arcos_1.ArcoDescriptivo();
                arco.destino = grafoPadre;
                arco.etiqueta = etiqueta;
                grafoHijo.arcos.estado.push(arco);
                console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_DESCRIPTIVOS_LABEL}${grafoHijo.nombre}/${grafoPadre.nombre}`));
            });
        });
    }
    probar(casos) {
        return new Promise((resolve, reject) => {
            console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.TEST.PROBAR_START_LABEL}:${""}`));
            casos.forEach((c, index) => {
                console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.TEST.CASO.START_LABEL}:${index}`));
                const regla = new ReglaRed();
                const parametros = new paradigma_1.Dominio(c);
                const dominio = new grafo_1.Grafo();
                this.entidades.forEach(e => {
                    const arco = new arcos_1.Arco();
                    arco.destino = e;
                    dominio.arcos.estado.push(arco);
                });
                regla.configurar(dominio, parametros);
                console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.TEST.CASO.BUCLE.CREAR_REGLA_LABEL}:${index}
                     ${regla.imprimir()}
                    `));
                this.motor.reglas.push(regla);
            });
            this.motor.arrancar((info) => {
                console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.TEST.CASO.BODY_LABEL}:${JSON.stringify(info)}`));
            });
            this.motor.trasDetenerse(() => {
                console.log((0, thread_1.agentMessage)(this.nombre, `${labels_1.i18.APPS.CADENA.TEST.PROBAR_END_LABEL}:${""}`));
                resolve("> forma.sistema.semantica.paradigma.RedSemantica.probar, finalizó con éxito");
            });
            setTimeout(() => reject("forma.sistema.semantica.paradigma.RedSemantica.probar, tiempo expirado!"), 5000);
        });
    }
}
exports.RedSemantica = RedSemantica;
