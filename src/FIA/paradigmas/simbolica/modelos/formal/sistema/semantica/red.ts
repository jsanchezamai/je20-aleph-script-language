import { Formal } from "../../paradigma";
import { i18 } from "../../../../../../i18/aleph-script-i18";
import { agentMessage } from "../../../../../../agentMessage";
import { Traductor } from "../../../../../../i18/traductor";
import { IGrafo, Grafo } from "./grafo";
import { ReglaRed } from "./regla";
import { ArcoEstructural, ArcoDescriptivo } from "./arco";
import { RelacionEstructural, EtiquetaEstructural, RelacionDescriptiva, EtiquetaDescriptiva } from "./etiqueta";
import { MotorInferencia } from "./motor-inferencia";
import { Dominio } from "../../../../../../mundos/dominio";
import { IModeloFormal } from "../../../../paradigma";

export interface IRedSemantica extends IModeloFormal {

    cargar(red: Set<string>, entidades: IGrafo[]): void;

}

export class RedSemantica extends Formal implements IRedSemantica {

    entidades: IGrafo[] = [];

    nombre = i18.SIMBOLICA.SEMANTICA.NOMBRE;

    base = new Grafo();
    motor = new MotorInferencia();


    cargar(red: any) {
        const entidades = this.entidades; // árbol a grafo
        /**
         * Añadir entidades maestras
         */
        Object.keys(red.ENTIDADES).forEach(i => {

            // Creación de entidad
            const valor = red.ENTIDADES[i];

            // Opcional: mapeo de valores por defecto
            const entidad = Object.assign(
                new Grafo(),
                {}
            );
            entidad.nombre = valor;

            console.log(agentMessage(this.nombre,
                `${i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ENTIDADES_LABEL}${valor}`
            ));
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

            const grafoHija = existing || new Grafo();
            if (existing) {

            } else {
                entidades.push(grafoHija);
                grafoHija.nombre = clase_hija;
            }

            const padres = red.ARCOS.ESTRUCTURALES.SUBCLASE[clase_hija];

            Object.keys(padres).forEach(clase_padre => {

                const grafoPadre = this.entidades.find(e => e.nombre === clase_padre);

                if (!grafoPadre) {
                    console.log(
                        "Error de integridad en CadenaFiaRedSemantica.ARCOS.ESTRUCTURALES.SUBCLASE",
                        ", padre no encontrado para la hija:",
                        clase_hija,
                        ", padre:",
                        clase_padre
                    );
                    return;
                }

                const relacion = new RelacionEstructural();
                relacion.nombre =  etiqueta_texto
                    .replace("clave", grafoHija.nombre)
                    .replace("valor", grafoPadre.nombre);

                relacion.valor = "subclase";

                const etiqueta = new EtiquetaEstructural();
                etiqueta.estado = relacion;

                const arco = new ArcoEstructural();
                arco.destino = grafoPadre;
                arco.etiqueta = etiqueta;
                grafoHija.arcos.estado.push(arco);

                console.log(agentMessage(this.nombre,
                    `${i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_SUBCLASES_LABEL}${grafoHija.nombre}/${grafoPadre.nombre}`
                ));

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

            const grafoPadre = existing || new Grafo();
            if (existing) {

            } else {
                entidades.push(grafoPadre);
                grafoPadre.nombre = clase_padre;
            }

            const partes = red.ARCOS.ESTRUCTURALES.PARTE[clase_padre];

            Object.keys(partes).forEach(clase_hijo => {

                const existing2 = entidades.find(e => e.nombre === clase_hijo);

                const grafoHijo = existing2 || new Grafo();
                if (existing2) {

                } else {
                    entidades.push(grafoHijo);
                    grafoHijo.nombre = clase_hijo;
                }

                const relacion = new RelacionEstructural();

                relacion.nombre =  etiqueta_texto
                    .replace("clave", grafoPadre.nombre)
                    .replace("valor", grafoHijo.nombre);

                relacion.valor = "parte";

                const etiqueta = new EtiquetaEstructural();
                etiqueta.estado = relacion;

                const arco = new ArcoEstructural();
                arco.destino = grafoPadre;
                arco.etiqueta = etiqueta;
                grafoHijo.arcos.estado.push(arco);

                console.log(agentMessage(this.nombre,
                    `${i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_PARTE_LABEL}${grafoHijo.nombre}/${grafoPadre.nombre}`
                ));

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

            const grafoHijo = existing || new Grafo();
            if (existing) {

            } else {
                entidades.push(grafoHijo);
                grafoHijo.nombre = clase_hija;
            }

            const padres = red.ARCOS.ESTRUCTURALES.INSTANCIA[clase_hija];

            Object.keys(padres).forEach(clase_padre => {

                const existing2 = entidades.find(e => e.nombre === clase_padre);

                const grafoPadre = existing2 || new Grafo();
                if (existing2) {

                } else {
                    entidades.push(grafoPadre);
                    grafoPadre.nombre = clase_padre;
                }

                const relacion = new RelacionEstructural();

                relacion.nombre =  etiqueta_texto
                    .replace("clave", grafoHijo.nombre)
                    .replace("valor", grafoPadre.nombre);

                relacion.valor = "instancia";

                const etiqueta = new EtiquetaEstructural();
                etiqueta.estado = relacion;

                const arco = new ArcoEstructural();
                arco.destino = grafoPadre;
                arco.etiqueta = etiqueta;
                grafoHijo.arcos.estado.push(arco);

                console.log(agentMessage(this.nombre,
                    `${i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_INSTANCIA_LABEL}${grafoPadre.nombre}/${grafoHijo.nombre}`
                ));

            });

        });

        /**
        * Añadir entidades del arco "descriptivo"
        */
        Object.keys(red.ARCOS.DESCRIPTIVOS).forEach(clase_padre => {

            const existing = entidades.find(e => e.nombre === clase_padre);

            const grafoPadre = existing || new Grafo();
            if (existing) {

            } else {
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

                const grafoHijo = existing2 || new Grafo();
                if (existing2) {

                } else {
                    entidades.push(grafoHijo);
                    grafoHijo.nombre = clase_hijo;
                }

                const etiqueta_texto = partes[clase_hijo];

                const relacion = new RelacionDescriptiva();
                relacion.nombre =  new Traductor().crearTextoAyuda(clase_hijo, parametros, etiqueta_texto);;

                const etiqueta = new EtiquetaDescriptiva();
                etiqueta.estado = relacion;

                const arco = new ArcoDescriptivo();
                arco.destino = grafoPadre;
                arco.etiqueta = etiqueta;
                grafoHijo.arcos.estado.push(arco);

                console.log(agentMessage(this.nombre,
                    `${i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_DESCRIPTIVOS_LABEL}${grafoHijo.nombre}/${grafoPadre.nombre}`
                ));

            });

        });

        /**
         * Convertir las entidades hoja en hijas de un nodo raíz
         */
        this.base = new Grafo();

        this.entidades.forEach(
            e =>
            {
                const relacion = new RelacionEstructural();

                relacion.nombre =  "relacion.raiz";

                const etiqueta = new EtiquetaEstructural();
                etiqueta.estado = relacion;

                const arco = new ArcoEstructural();
                arco.destino = e;
                arco.etiqueta = etiqueta;
                this.base.arcos.estado.push(arco);
        });

    }

    probar(casos: object[]) {

        return new Promise((resolve, reject) => {

            console.log(agentMessage(this.nombre, `${i18.APPS.CADENA.TEST.PROBAR_START_LABEL}:${""}`));

            /**
             *  Encolado de casos a probar
             * */
            casos.forEach((c, index) => {

                console.log(agentMessage(this.nombre, `${i18.APPS.CADENA.TEST.CASO.START_LABEL}:${index}`));

                const regla = new ReglaRed();
                const parametros = new Dominio(c);

                regla.configurar(this.base, parametros);

                console.log(agentMessage(this.nombre,
                    `${i18.APPS.CADENA.TEST.CASO.BUCLE.CREAR_REGLA_LABEL}:${index} con ${regla.imprimir()}`
                ));

                this.motor.reglas.push(regla);

            });

            /**
             *  Arrancar la cola de inferencias
             * */
            this.motor.arrancar((info) => {
                console.log(
                    agentMessage(this.nombre,
                        `${i18.APPS.CADENA.TEST.CASO.BODY_LABEL}:${info}`));
            });

            /**
             *  Capturar evento de parada
             * */
            this.motor.trasDetenerse(() => {
                console.log(agentMessage(this.nombre, `${i18.APPS.CADENA.TEST.PROBAR_END_LABEL}:${""}`));
                resolve("> forma.sistema.semantica.paradigma.RedSemantica.probar, finalizó con éxito");
            });

            /**
             *  Condición de salida
             * */
            setTimeout(
                () => reject("forma.sistema.semantica.paradigma.RedSemantica.probar, tiempo expirado!")
                , 5000
            );


        });

    }

}