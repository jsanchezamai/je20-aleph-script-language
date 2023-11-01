"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18 = exports.i18_ME = void 0;
exports.i18_ME = {
    ME_LABEL: "sistema",
};
exports.i18 = {
    ME_LABEL: exports.i18_ME.ME_LABEL,
    FIA_CIENTIFICA_LABEL: "cientifica",
    FIA_CONEXIONISTA_LABEL: "conexionista",
    FIA_SIMBOLICA_LABEL: "simbolica",
    FIA_SITUADA_LABEL: "situada",
    FIA_CIENTIFICA_FUERTE_LABEL: "fuerte",
    FIA_CIENCITICA_DEBIL_LABEL: "debil",
    SISTEMA: {
        STARTING_LABEL: "Arrancando el sistema",
        ENTER_PARA_SEGUIR: "PULSA ENTER PARA CONTINUAR "
    },
    MENU_HEADER_LABEL: `Escoge:`,
    MENU_PROMPT_DATA_LABEL: `Escribe:`,
    EXIT_PROMT_LABEL: "Not today! ¡Cerrar!, please, bye!",
    LOOP: {
        LOAD_FIA_LABEL: "Cargando FIAs disponibles, por favor espera... ",
        LAUNCH_FIA_LABEL: "Transfiriendo el prompt a",
        NOT_INIT_LABEL: "¡No estoy inicializada, por favor, instánciame!",
    },
    IDLE_STATE_LABEL: "Nada qué hacer! Cierro!",
    TURING: {
        AGENT: "turing-tester",
        TEST_LABEL: "Para ser fuerte, debes ser como un humano. Si no, serás débil. Razona lo siguiente: ¿eres humano?",
        TEST_START_LABEL: "iniciar test-turing",
        TEST_STOP_LABEL: "¡Test concluído!"
    },
    SITUADA: {
        SIMULATION_START: "Hola soy un autómata situado. Voy a ejemplificar mi forma de razonar. Para ello operaré un serie de pasos recibiendo señales con mis sensores y enviando acciones.",
        SIMULATION_BODY: "Modelo resultante.\n",
        SIMULATION_END: "¡Simulación finalizada!",
        AUTOMATA: {
            NOMBRE: "situada.automata",
            RECEPCION_AFERENCIA_LABEL: "El mundo envía una aferencia. Voy a realizar la transición de estado.",
            ENVIO_EFERENCIA_LABEL: "¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.",
        },
        CADENA: {
            NOMBRE: "situada.automata"
        }
    },
    SIMBOLICA: {
        SEMANTICA: {
            NOMBRE: "red-semantica",
            REGLA: "regla.de.red.semantica",
            INFERENCIA: "\n\t - Tipo de inferencia: <clave> \n\t - agentes: <agentes>  \n\t - sujetos: <sujetos>  \n\t - Entidades: <entidades>",
            INFERENCIA_NATURAL_LABEL: "¿Existe un camino que lleve desde <agente> hasta <sujeto> pasando por <arco>",
            BUSQUEDA: {
                INICIO: "\n\t\t - Inicio búsqueda por: ",
                OPCION: "\n\t\t\t - Candidato: ",
                COMPARANDO: "\n\t\t\t - Comparando entidad:  \n\t\t\t - ...con etiqueta: y valor",
            }
        }
    },
    CONEXIONISTA: {
        NEURONAL: {
            NOMBRE: "red-neuronal",
            REGLA: "regla.de.red.neuronal.conexionista",
            IDLE: "Lista para recibir inferencia, envía tensores que te devuelvo ídem. Usa una canalación.",
            CREANDO_SESION_INFERENCIA_LABEL: "Creando sesión de inferencia para el modelo: ",
            CARGANDO_PARAMETROS_LABEL: "Tensores de entrada: ",
            RESPUESTA_INFERENCIA_LABEL: "La inferencia acabó con éxito, tensor de salida: ",
        }
    },
    MUNDO: {
        INICIO_LABEL: "¡Mundo iniciado!",
        FIN_LABEL: "¡Mundo acabado!",
        DIA_LABEL: "Hoy es el día:",
        EJEMPLOS_CADENA_LABEL: "cadena",
        AFERENCIA: {
            RECEPCION_LABEL: "El mundo ha recibido una eferencia. Actualizando modelo."
        }
    },
    APPS: {
        CADENA: {
            NOMBRE: "cadena-app",
            SIMULATION_START: "Esta aplicación simula una cadena de producción. ¡Arrancando simulación!",
            SIMULATION_BODY: "Modelo resultante",
            SIMULATION_END: "¡La aplicación ha concluído y se cierra!",
            TEST: {
                PROBAR_START_LABEL: "Se van a lanzar una serie de inferencias sobre la red...",
                PROBAR_END_LABEL: "Test de la red semántica finalizado",
                CASO: {
                    START_LABEL: "\n\t - Lanzando caso: ",
                    BODY_LABEL: "\n\t - Evaluando caso: ",
                    END_LABEL: "\n\t - Resultado caso: ",
                    BUCLE: {
                        CREAR_REGLA_LABEL: "Creada regla:"
                    }
                }
            },
            SITUADA: {
                NOMBRE: "cadena.situada",
                SIMULATION_START: "Hola soy un autómata situado. Voy a ejemplificar mi forma de razonar. Para ello operaré un serie de pasos recibiendo señales con mis sensores y enviando acciones.",
                SIMULATION_BODY: "Modelo resultante",
                SIMULATION_END: "¡Simulación finalizada!",
                AUTOMATA: {
                    NOMBRE: "cadena.situada.automata",
                    RECEPCION_AFERENCIA_LABEL: "El mundo envía una aferencia. Voy a realizar la transición de estado.",
                    ENVIO_EFERENCIA_LABEL: "¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.",
                }
            },
            SIMBOLICA: {
                NOMBRE: "cadena.simbolica",
                SEMANTICA: {
                    NOMBRE: "cadena.simbolica.semantica.red",
                },
                SIMULATION_START: "Creando la red semántica...",
                SIMULATION_BODY: "Modelo resultante",
                SIMULATION_END: "¡Simulación finalizada!",
                AGREGANDO_ENTIDADES_LABEL: "Agregando entidad: ",
                AGREGANDO_ARCOS_SUBCLASES_LABEL: "Agregando arco subclase/clase: ",
                AGREGANDO_ARCOS_PARTE_LABEL: "Agregando arco parte/clase: ",
                AGREGANDO_ARCOS_INSTANCIA_LABEL: "Agregando arco instancia hija/padre: ",
                AGREGANDO_ARCOS_DESCRIPTIVOS_LABEL: "Agregando arco descriptivo destino/origen: ",
                DOMINIO: {
                    ENTIDADES: {
                        tarea: "tarea",
                        robot: "robot",
                        objeto: "objeto",
                        propiedad: "propiedad",
                        cadena: "cadena",
                        almacen: "almacen",
                    },
                    ARCOS: {
                        DESCRIPTIVOS: {
                            tarea_cadena_robot_objeto_almacen: {
                                parametros: {
                                    tarea: "",
                                    cadena: "",
                                    robot: "",
                                    objeto: "",
                                    almacen: ""
                                },
                                desencadenar: "Tarea: <clave>. Agente <robot>: <tarea> <objeto> entre <almacen> y <cadena>.",
                                encadenar: "Tarea: <clave>. Agente <robot>: <tarea> <objeto> entre <almacen> y <cadena>."
                            },
                            tarea_robot_objeto_almacen: {
                                parametros: {
                                    robot: "",
                                    objeto: "",
                                    almacen: ""
                                },
                                deshechar: "Tarea: <clave>. Agente <robot>: <tarea>: <objeto> al lugar <almacen>.",
                            },
                            tarea_robot_objeto_propiedad: {
                                parametros: {
                                    robot: "",
                                    objeto: "",
                                    propiedad: ""
                                },
                                operar: "Tarea: <clave>. Agente <robot>: <tarea>: <propiedad> de <objeto>",
                            }
                        },
                        ESTRUCTURALES: {
                            INSTANCIA: {
                                texto: "<clave> es instancia de <valor>",
                                cadena_1: { cadena: "cadena" },
                                almacen_1: { almacen: "almacen" },
                                entrada: { almacen: "almacen" },
                                salida: { almacen: "almacen" },
                                basura: { almacen: "almacen" },
                                reponerdor: { reponedor: "reponedor" },
                                robot_1: { criptoselladora: "criptoselladora" },
                                robot_2: { criptoselladora: "criptoselladora" },
                                robot_3: { parseadora: "parseadora" },
                                robot_4: { parseadora: "parseadora" },
                                objeto_1: { objeto_parseable: "objeto_parseable" },
                                objeto_2: { objeto_criptosellable: "objeto_criptosellable" },
                                objeto_3: { objeto_parseable: "objeto_parseable" },
                                objeto_4: { objeto_compuesto: "objeto_compuesto" },
                                propiedad_cripta: { propiedad: "propiedad" },
                                propiedad_cadena: { propiedad: "propiedad" },
                                propiedad_estado: { estado: "estado" }
                            },
                            PARTE: {
                                texto: "<clave> tiene la parte: <valor>",
                                robot: {
                                    tarea_cadena_robot_objeto: "tarea",
                                    tarea_robot_objeto: "tarea",
                                    tarea_robot_objeto_propiedad: "tarea",
                                },
                                objeto: {
                                    propiedad_estado: "propiedad"
                                },
                                objeto_criptosellable: {
                                    propiedad_cripta: "propiedad"
                                },
                                objeto_parseable: {
                                    propiedad_cadena: "propiedad"
                                },
                                objeto_compuesto: {
                                    objeto_parseable: "objeto",
                                    objeto_criptosellable: "objeto"
                                }
                            },
                            SUBCLASE: {
                                texto: "<clave> es subclase de <valor>",
                                reponedor: { robot: "robot" },
                                criptoselladora: { robot: "robot" },
                                parseadora: { robot: "robot" },
                                objeto_criptosellable: { objeto: "objeto" },
                                objeto_parseable: { objeto: "objeto" },
                                objeto_compuesto: { objeto: "objeto" }
                            }
                        }
                    }
                },
                RED: {
                    NOMBRE: "cadena.simbolica.red",
                }
            },
            CONEXIONISTA: {
                NOMBRE: "cadena.conexionista",
                NEURONAL: {
                    NOMBRE: "cadena.conexionista.neuronal.red",
                },
                SIMULATION_START: "Creando la red neuronal...",
                SIMULATION_BODY: "Modelo resultante",
                SIMULATION_END: "¡Simulación finalizada!",
                RED: {
                    NOMBRE: "cadena.conexionista.red",
                }
            },
        }
    }
};
