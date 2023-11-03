import { i18 } from "../../../i18/aleph-script-i18";
import { Automata } from "../../../paradigmas/situada/automata";
import { CadenaModelo } from "../modelo/cadena-modelo";
import { CadenaMundo } from "../mundo/cadena-mundo";
import { CadenaEstado } from "./cadena-estado";
import { TOPE_POSICION } from "./cadena-fia-situada";

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