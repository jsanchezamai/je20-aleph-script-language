interface Regla {
    derivacion: string[];
}

export interface Gramatica {

    terminales: string[];
    noTerminales: string[];

    producciones: Produccion[];

    simboloInicial: string;
}

export interface Produccion {
    noTerminal: string;
    reglas: Regla[];
}



// Ejemplo de la gramática para expresiones aritméticas básicas
export const gramaticaAritmetica: Gramatica = {
    terminales: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-"],
    noTerminales: ["<expresion>", "<numero>"],
    producciones: [
      {
        noTerminal: "<expresion>",
        reglas: [
          { derivacion: ["<numero>"] },
          { derivacion: ["<expresion>", "+", "<expresion>"] },
          { derivacion: ["<expresion>", "-", "<expresion>"] },
        ],
      },
      {
        noTerminal: "<numero>",
        reglas: [
          { derivacion: ["0"] },
          { derivacion: ["1"] },
          { derivacion: ["2"] },
          { derivacion: ["3"] },
          { derivacion: ["4"] },
          { derivacion: ["5"] },
          { derivacion: ["6"] },
          { derivacion: ["7"] },
          { derivacion: ["8"] },
          { derivacion: ["9"] },
        ],
      },
    ],
    simboloInicial: "<expresion>",
};