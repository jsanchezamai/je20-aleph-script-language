import { Automata } from "./automata";
import { gramaticaAritmetica } from "./gramatica";

// Uso del autómata con la gramática de expresiones aritméticas
const automataAritmetico = new Automata(gramaticaAritmetica);

// Prueba con una cadena válida
automataAritmetico.procesarCadena("2 + 3 - 1");

// Prueba con una cadena no válida
automataAritmetico.procesarCadena("2 * 3");
