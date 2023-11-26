import { Ignoto } from "../../Intencion";
import { Gramatica } from "./gramatica";

export class Parser {
    private tokens: string[];
    private gramatica: Gramatica;
    private index: number;

    constructor(tokens: string[], gramatica: Gramatica) {
      this.tokens = tokens;
      this.gramatica = gramatica;
      this.index = 0;
    }

    public analizar(): Ignoto | null {
      return this.analizarExpresion();
    }

    private analizarExpresion(): Ignoto | null {
      const numero = this.analizarNumero();
      if (numero !== null) {
        return numero;
      }

      const izquierda = this.analizarExpresion();
      if (izquierda === null) {
        return null;
      }
 
      const operador = this.tokens[this.index++];
      if (operador !== "+" && operador !== "-") {
        return null;
      }

      const derecha = this.analizarExpresion();
      if (derecha === null) {
        return null;
      }

      return {
        tipo: "expresion",
        valor: {
          tipo: "operacion",
          operador: operador as "+" | "-",
          izquierda,
          derecha,
        },
      };
    }

    private analizarNumero(): Ignoto | null {
      const token = this.tokens[this.index++];
      if (this.gramatica.noTerminales.includes("<numero>") && /^\d+$/.test(token)) {
        return {
          tipo: "numero",
          valor: parseInt(token),
        };
      }
      return null;
    }
}