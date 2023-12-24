import { Cabecera } from "./Cabecera"
import { Linea, LineaExterna } from "./Linea"
import { TablaDiagnosticos } from "./TablaDiagnosticos"
import { TablaSensores } from "./TablaSensores"
import { TablaTipos } from "./TablaTipos"
import { TablaValoraciones } from "./TablaValoraciones"
import { TablaValores } from "./TablaValores"

export type Base = {
    red: {
        ENTIDADES?: any;
        ESTRUCTURALES?: any;
        lineas?: Linea[]
    };
    cabecera: Cabecera;
    lineas: LineaExterna[];
}

export enum COLUMNAS {
    componente = 0,
    alteracion = 1,
    tipo = 2,
    valores = 3,
    sensores = 4,
    diagnosticos = 5
}

export const PC1 = [

    "CPU",

    "Temperatura fuera de rango",
    "F01-sistema-ventilacion",

    [true, true],

    [
        "tendencia decreciente con pérdida del 20% Nmax",
        "tendencia decreciente con pérdida del 80% Nmax"
    ],

    [[ "F01-apagar-ventilador", "F01-iniciar-procesos-mantenimiento"], []]

]

export const PC2 = [

    "CPU",

    "Temperatura fuera de rango",
    "F01-sistema-ventilacion",

    [true, false],

    [
        "tendencia creciente con ganancia del 20% Nmin",
        "tendencia creciente con ganancia del 80% Nmin"
    ],

    [[ "F01-encender-ventilador", "F01-apagar-procesos-mantenimiento"], []]
]

export const LINEA = {
    componente: "elemento1",
    diagnosticos: [
        {
            alteracion: "estado1",
            tipo: TablaTipos.T01,
            valores: [
                TablaValores.V01,
                TablaValores.V02
            ],
            prediccion: [
                {
                    sensores: [{
                        sensor: TablaSensores[0],
                        valoracion: TablaValoraciones.VL01,
                        condicion: "tendencia decreciente con pérdida del 20% Nmax",
                    }],
                    diagnosticos: [ TablaDiagnosticos.R01 ]
                }
            ]
        }
    ]
}
