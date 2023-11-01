import { i18 } from "../../../i18/labels";
import { Automata } from "../../../paradigmas/situada/paradigma";
import { CadenaModelo } from "../cadena-modelo";
import { TOPE_POSICION } from "./cadena-fia-situada";
import { CadenaMundo } from "../cadena-mundo";
import { CadenaEstado } from "./cadena-estado";

export class CadenaAutomata<CadenaEstados> extends Automata<CadenaEstados> {

    nombre = i18.APPS.CADENA.SITUADA.AUTOMATA.NOMBRE;

    configurar(): void {

        this.mundo = new CadenaMundo();
        this.mundo.modelo = new CadenaModelo();
        this.mundo.nombre = i18.APPS.CADENA.SITUADA.NOMBRE;
        this.mundo.modelo.muerte = TOPE_POSICION;

        this.estado = new CadenaEstado<CadenaEstados>(this.mundo.modelo);

        this.nombre = i18.APPS.CADENA.SITUADA.AUTOMATA.NOMBRE;

        super.configurar();

    }

}