import { agentMessage } from "../../../../../../agentMessage";
import { CabeceraPC } from "./dominio/Cabecera";
import { Base, COLUMNAS, PC1 } from "./dominio/base";
import { error } from "console";
import { Buffer } from "buffer";
import { Linea, LineaExterna } from "./dominio/Linea";

export type Guid = string;
export type GuidSensor = Guid;
export type GuidExterno = string;
export type FuncionCriterio = (...args) => boolean;

type CriteriosSensor = { guidSensor: GuidSensor, guidRegulador: Guid };
export type Sensor = any;
export type Valor = Guid;
export type Paso = Guid;
export type Diagnostico = Guid;
export type DiagnosticoLinea = Paso[];

type Telemetria = number;
export type Lectura = Telemetria;
export type Aferencia = { GuidSensor: GuidSensor, Lectura: Lectura };

export const i18_PROCESADOR_ESTADO_AS = {
    NOMBRE: "Procesador estado",
    CARGA: {
        CABECERA: "Analizando Cabecera",
        CUERPO: "Analizando Cuerpo",
        ERROR: "Error al procesar la cabecera. Ver ejemplo, formato esperado..."
    },
    AFERENCIA: {
        INICIO: "Iniciando Aferencia",
        IDENTIFICACION_SENSOR: "Buscando sensor",
        ERROR_ID_S: "Sensor no encontrado",
        BUSCANDO_REGLAS: "Buscando reglas",
        PROCESANDO_CRITERIOS: "Procesando criterios",
        POSITIVOS: "Positivos encontrados",
    },
    RED: {
        INICIO: "Creando estructura de la red",
        TRABAJO: "Cargando datos",
        ERROR: "Error al procesar líneas. Ver ejemplo, formato esperado..."
    }
}


export class CargadorBaseExperta {

    aferencia(estado: Aferencia) {

        console.log(agentMessage(this.nombre, this.i18.AFERENCIA.INICIO));

        console.log(agentMessage(this.nombre, `\t - ${this.i18.AFERENCIA.IDENTIFICACION_SENSOR}`));
        const sensor = this.recuperar(this.sensores_tabla, estado.GuidSensor);

        console.log(agentMessage(this.nombre, `\t\t - Sensor ${estado.GuidSensor}/${sensor}`));
        if (!sensor) {
            console.log(agentMessage(this.nombre, this.i18.AFERENCIA.ERROR_ID_S));
            console.log(this.sensores_tabla);
        }
        console.log(agentMessage(this.nombre, `\t - ${this.i18.AFERENCIA.BUSCANDO_REGLAS}`));
        const indiceSensor = this.sensores.findIndex(s => s.guidSensor === sensor);

        const reglas = this.dominio.red.lineas
            .filter(l => {
                if (l.sensores) {
                    return l.sensores[indiceSensor].length > 0
                }
            return false;
        });
        console.log(agentMessage(this.nombre, `\t\t - Reglas encontradas: ${reglas.length}`));

        console.log(agentMessage(this.nombre, this.i18.AFERENCIA.PROCESANDO_CRITERIOS));
        const positivos = reglas.filter(r => {

            const resultados: boolean[] = [];
            r.sensores.forEach(c => {
                const functionCriterio = this.sensores_funciones_tabla.get(c);
                const resultado = functionCriterio(estado.Lectura);
                resultados.push(resultado);
            })
            return resultados.filter(r => r === true).length > 0;
        })

        console.log(agentMessage(this.nombre, `\t\t - Positivos encontrados: ${positivos.length}`));

        console.log(agentMessage(this.nombre, this.i18.AFERENCIA.POSITIVOS));
        console.log(agentMessage(this.nombre, `\t - Lineas afectadas: ${positivos.length}`));

        positivos.forEach(p => {
            console.log(agentMessage(this.nombre,
                `\t\t - ${p.componente}/${p.alteracion}/${p.tipo}, diag: ${p.diagnosticos.length}`));

            p.diagnosticos.forEach((d, i) => {

                const guidDiagnostico = this.diagnosticos[i];
                const diagnostico = this.diagnosticos_tabla.get(guidDiagnostico);
                console.log(agentMessage(this.nombre, `\t\t\t - ${i}: ${diagnostico}`));
                d.forEach((pasoGuid, ip) => {
                    const paso = this.diagnosticos_pasos_tabla.get(pasoGuid);
                    console.log(agentMessage(this.nombre, `\t\t\t\t - ${ip}: ${paso}`));
                })
            })
        })

    }

    componente: GuidExterno;
    alteracion: GuidExterno;
    tipo: GuidExterno;

    componentes: Map<Guid, any> = new Map();
    alteraciones: Map<Guid, any> = new Map();
    tipos: Map<Guid, any> = new Map();

    valores: Valor[] = [];
    valores_tabla: Map<Guid, GuidExterno> = new Map();
    sensores: CriteriosSensor[] = [];

    sensores_tabla: Map<Guid, GuidExterno> = new Map();
    sensores_reguladores_tabla: Map<Guid, GuidExterno> = new Map();
    sensores_criterios_tabla: Map<Guid, GuidExterno> = new Map();
    sensores_funciones_tabla: Map<Guid, FuncionCriterio > = new Map();

    intensidades: Map<string, string> = new Map();

    diagnosticos_tabla: Map<Guid, GuidExterno> = new Map();
    diagnosticos_pasos_tabla: Map<Guid, GuidExterno> = new Map();
    diagnosticos: Diagnostico[] = [];
    diagnosticos_ocurrencias: Map<string, any> = new Map();

    i18 = i18_PROCESADOR_ESTADO_AS;

    nombre = this.i18.NOMBRE;

    constructor(public dominio: Base) {
        this.crearBase();
    }

    crearBase() {

        console.log(agentMessage(this.nombre, this.i18.CARGA.CABECERA));

        try {
            this.cargarCabecera();
        } catch (error) {
            console.log(agentMessage(this.nombre, this.i18.CARGA.ERROR));
            console.log(agentMessage(this.nombre, error.message));
            console.log(CabeceraPC);
        }

        console.log(agentMessage(this.nombre, this.i18.CARGA.CUERPO));

        try {
            this.cargarLineas();
        } catch (error) {
            console.log(agentMessage(this.nombre, this.i18.CARGA.ERROR));
            console.log(agentMessage(this.nombre, error.message));
            console.log(PC1);
        }
        // console.log(this.dominio.red);
        // console.log(this.componentes);
        // console.log(this.alteraciones);
        // console.log(this.valores);
        // console.log(this.dominio.red.lineas);
        // console.log(this.dominio.red.lineas.map(l => l.diagnosticos));
        // console.log(this.dominio.red.lineas[0].diagnosticos);
    }

    cargarCabecera() {

        console.log(agentMessage(this.nombre, "\t - Cabecera: componente"));
        this.componente = this.dominio.cabecera[COLUMNAS.componente];

        console.log(agentMessage(this.nombre, "\t - Cabecera: alteracion"));
        this.alteracion = this.dominio.cabecera[COLUMNAS.alteracion];

        console.log(agentMessage(this.nombre, "\t - Cabecera: tipos"));
        this.tipo = this.dominio.cabecera[COLUMNAS.tipo];

        console.log(agentMessage(this.nombre, "\t - Cabecera: valores"));
        this.dominio.cabecera[COLUMNAS.valores].forEach(c => {

            const guid = this.agregarOrecuperar(this.valores_tabla, c);
            this.valores.push(guid);

        });

        console.log(agentMessage(this.nombre, "\t - Cabecera: sensores"));
        this.dominio.cabecera[COLUMNAS.sensores].forEach((c, i) => {

            console.log(agentMessage(this.nombre, `\t\t ${i} - Crear guid`));

            const sensorGuidExterno = Object.keys(c)[0]; // k = temperatura
            const guidSensor = this.agregarOrecuperar(this.sensores_tabla, sensorGuidExterno);

            const reguladorGuidExterno = Object.keys(c)[0]; // k = temperatura
            const guidRegulador = this.agregarOrecuperar(this.sensores_reguladores_tabla, reguladorGuidExterno);

            console.log(agentMessage(this.nombre, `\t\t ${i} - Almacenar`));
            this.sensores.push( { guidSensor, guidRegulador });

        });

        console.log(agentMessage(this.nombre, "\t - Cabecera: diagnosticos"));
        this.dominio.cabecera[COLUMNAS.diagnosticos].forEach(c => {

            const Guid = this.agregarOrecuperar(this.diagnosticos_tabla, c);

            this.diagnosticos.push(Guid);
        });

        this.dominio.red = {
            ENTIDADES:
                [
                    this.componente,
                    this.alteracion,
                    this.alteracion,
                    ...this.valores,
                    ...this.sensores,
                    ...Array.from(this.intensidades, ([name, value]) => name),
                    ...Array.from(this.diagnosticos, ([name, value]) => name)
                ],
            ESTRUCTURALES: {
                INSTANCIA: {
                    texto: "<clave> es instancia de <valor>",
                }
            }
        }
    }

    cargarLineas() {

        const errores: Error[] = [];
        this.dominio.red.lineas = [];
        this.dominio.lineas.forEach((l, i) => {
            try {
                this.procesarLinea(l, i);
            } catch (error) {
                console.log(agentMessage(this.nombre, `\t\t ${i} - Error al cargar línea: ${ error.message }`));
                errores.push(error.message);
            }
        })

        if (error.length > 0 ) {
            throw new Error(errores.join("\n\t -"));
        }
    }

    procesarLinea(l: LineaExterna, i: number) {

        const linea: Linea = {
            Guid: "",
            componente: "",
            alteracion: "",
            tipo: "",
            valores: [],
            sensores: [],
            diagnosticos:[]
        }

        linea.Guid = this.crearGuid(i.toString());

        console.log(agentMessage(this.nombre, `\t ${i} - Linea: Componente`));
        let clave = this.agregarOrecuperar(this.componentes, l[COLUMNAS.componente]);
        linea.componente = l[COLUMNAS.componente];

        console.log(agentMessage(this.nombre, `\t ${i} - Linea: Alteracion`));
        clave = this.agregarOrecuperar(this.alteraciones, l[COLUMNAS.alteracion]);
        linea.alteracion = l[COLUMNAS.alteracion];

        console.log(agentMessage(this.nombre, `\t ${i} - Linea: Tipo`));
        clave = this.agregarOrecuperar(this.tipos, l[COLUMNAS.tipo]);
        linea.tipo = l[COLUMNAS.tipo];

        console.log(agentMessage(this.nombre, `\t ${i} - Linea: Valores`));
        l[COLUMNAS.valores].forEach((v, i) => {

            if (v) {
                console.log(agentMessage(this.nombre, `\t\t ${i} - Agregar valor`));
                const guidValor = this.valores[i];
                linea.valores.push(guidValor)
            }

        })

        console.log(agentMessage(this.nombre, `\t ${i} - Linea: sensores`));
        l[COLUMNAS.sensores].forEach((l, i) => {

            console.log(agentMessage(this.nombre, `\t\t ${i} - Crear regla de sensor`));
            if (l) {
                console.log(agentMessage(this.nombre, `\t\t\t ${i} - Crear guid criterio`));
                const guidCriterio = this.agregarOrecuperar(this.sensores_criterios_tabla, l);
                this.sensores_funciones_tabla.set(guidCriterio, (...args) => true)
                console.log(agentMessage(this.nombre, `\t\t\t ${i} - Almacenar criterio`));
                linea.sensores.push(guidCriterio);
            }

        })

        console.log(agentMessage(this.nombre, `\t ${i} - Linea: Diagnósticos`));
        l[COLUMNAS.diagnosticos].forEach((pasos, i) => {

            console.log(agentMessage(this.nombre, `\t\t ${i} - Agregar diagnóstico`));
            if (pasos && pasos.length > 0) {

                const guidsPasos = [];
                pasos.forEach((d) => {
                    const GuidPaso = this.agregarOrecuperar(this.diagnosticos_pasos_tabla, d);
                    guidsPasos.push(GuidPaso);
                });

                linea.diagnosticos.push(guidsPasos);
            } else {
                linea.diagnosticos.push([])
            }

        })
        this.dominio.red.lineas.push(linea);
    }

    agregarOrecuperar(map: Map<string, any>, valor: string): Guid {

        let existente = this.recuperar(map, valor);
        if (existente) return existente;

        const clave = this.crearGuid(valor);
        // console.log(map)
        map.set(clave, valor);

        return clave;
    }

    recuperar(map: Map<string, any>, valor: string): Guid | null {

        // console.log("inicio recuperación", Object.keys(map), map.keys())
        let existente = Array.from(map.keys())
            .find(key => {
                /* console.log(`${map.get(key)} === ${valor}`);*/ return map.get(key) === valor
            });
        if (existente) return existente;

        return null;
    }

    crearGuid(datos: string): Guid {
        return Buffer.from(datos, 'binary').toString('base64').replace(/\=/g, "")
    }

    crearGuidObjeto(datos: object): Guid {
        return Buffer.from(JSON.stringify(datos), 'binary').toString('base64').replace(/\=/g, "")
    }
}


