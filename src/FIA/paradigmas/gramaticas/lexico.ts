import { Gramatica } from "./gramatica";

export class Lexer {

    private gramatica: Gramatica;
    public tokens: string[];

    constructor(gramatica: Gramatica) {
      this.gramatica = gramatica;
      this.tokens = [];
    }

    public analizarCadena(cadena: string): void {
      // Lógica simple de análisis léxico
      this.tokens = cadena.split(/\s+/);
    }

  }