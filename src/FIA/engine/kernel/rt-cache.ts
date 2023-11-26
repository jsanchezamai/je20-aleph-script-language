import { noop } from "rxjs";
import { Ignoto } from "../../Intencion";
import { Dominio, IDominio } from "../../mundos/dominio";
import * as fs from "fs";

export class RTCache {

    dominio: IDominio = new Dominio({});

    constructor() {
        this.recuperar();
    }

    guardar(clave: string, valor: Ignoto): void {

        this.dominio.base[clave] = valor;

    }

    leer(clave: string): Ignoto {

        return this.dominio.base[clave];

    }

    leerLista(clave: string): Ignoto[] {

        return this.dominio.base[clave] || [];

    }

    persistir() {

        try {
            fs.writeFileSync(__dirname + '/cache.json', JSON.stringify(
                { cache : this.dominio.base }, null, "\t"));
            console.log("Cache escrita en", __dirname + '/cache.json' /*, this.dominio.base*/);
        } catch(ex) {
            console.log("Error al guardar cache", ex)
        }

    }

    recuperar() {

        if (!fs.existsSync(__dirname + '/cache.json')) {
            this.persistir();
        }
        const data: any = fs.readFileSync(__dirname + '/cache.json');

        this.dominio.base = JSON.parse(data || {})?.cache || {};

    }

}