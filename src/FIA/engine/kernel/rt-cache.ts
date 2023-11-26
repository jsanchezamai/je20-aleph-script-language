import { Ignoto } from "../../genesis-block";
import { Dominio, IDominio } from "../../mundos/dominio";
import * as fs from "fs";

export class RTCache {

    dominio: IDominio = new Dominio({});

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

        fs.writeFileSync(__dirname + '/cache.json', JSON.stringify(
            { cache : this.dominio.base }, null, "\t"));
        console.log("Cache escrita en", __dirname + '/cache.json', this.dominio.base);
    }

    recuperar() {

        if (!fs.existsSync(__dirname + '/cache.json')) {
            this.persistir();
        }
        const data: any = fs.readFileSync(__dirname + '/cache.json');

        this.dominio.base = JSON.parse(data || {})?.cache || {};

    }

}