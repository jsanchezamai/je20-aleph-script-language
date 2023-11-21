import { Ignoto } from "../../genesis-block";
import { Gramatica } from "./gramatica";
import { Lexer } from "./lexico";
import { Parser } from "./parser";

export class Automata {

    private gramatica: Gramatica;

    constructor(gramatica: Gramatica) {
      this.gramatica = gramatica;
    }

    public procesarCadena(cadena: string): void {
      // Validar la cadena con la gramática
      if (this.validarCadena(cadena)) {
        // Procesar la cadena (puedes agregar la lógica de procesamiento aquí)
        console.log(`Cadena válida: ${cadena}`);
      } else {
        console.log(`Cadena no válida: ${cadena}`);
      }
    }

    private validarCadena(cadena: string): boolean {
      const derivacion: Ignoto | null = this.derivarCadena(cadena);
      return derivacion !== null;
    }

    private derivarCadena(cadena: string): Ignoto | null {
      const lexer = new Lexer(this.gramatica);
      lexer.analizarCadena(cadena);
      const parser = new Parser(lexer.tokens, this.gramatica);
      return parser.analizar();
    }
  }
