import { Diagnostico, DiagnosticoLinea, Guid, Sensor, Valor } from "../cargador";

export type Linea = {
    Guid: Guid,
    componente: Guid,
    alteracion: Guid,
    tipo: Guid,
    valores: Valor[],
    sensores: Sensor[],
    diagnosticos: DiagnosticoLinea[]
};

export type LineaExterna = any;


export const Linea = [
    "componente1",

    "alteracion1",
    "tipo1",

    { valores: [false, true] },

    {
        sensores: [
            "tendencia decreciente con pérdida del 20% Nmax",
            "tendencia decreciente con pérdida del 80% Nmax"
        ]
    },

    { diagnosticos: [["Diagnostico1", "Diagnostico2"], []] }
];
