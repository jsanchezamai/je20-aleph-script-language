import { IBaseConocimiento } from "../../FIA/mundos/base-conocimiento";
import { Grafo } from "../../FIA/paradigmas/simbolica/modelos/formal/sistema/semantica/grafo";
import { IFilePath } from "../core/file-model";
import { IModel, IRow, Model } from '../core/model';
import { ISemanticNetworkModel } from "../core/semantic-network-model";
import { StructuredDataLoader } from "./loader";

export class TreeModel extends Model implements IModel  {

    grafo: Grafo[];
    indice: IRow[];

}

export interface ITreeNode extends IBaseConocimiento {

    nombre: string;

    hijos: ITreeNode[];

}

export class TreeLoader extends StructuredDataLoader {

    model = new TreeModel();

    import(Tree_file: IFilePath) {
        super.import(Tree_file);

        this.network.bosque = {
            nombre: "Base",
            hijos: []
        }

        console.log("-----------=============--------------------")
        console.log("-------------------------------")
        console.log("-------------------------------")

        console.log(this.network.index);

        const tree: ITreeNode = this.network.bosque;

        this.network.index.forEach(r => {

            console.log("Loop for row <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            console.log("The path", r.fk)
            console.log("The current state", this.network.bosque)
            this.recursiveRow((r.fk?.split("/").reverse() || []), tree);
            console.log("The final state", this.network.bosque)
            console.log("Loop for row <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

        })

        console.log("Procesado", this.network.bosque)
        console.log("-------------------------------")
        console.log("-------------------------------")
        console.log("-------------===============------------------")

    }

    export(): ISemanticNetworkModel {
        return super.export();
    }

    recursiveRow(rfk: string[], tree: ITreeNode): ITreeNode {

        const segment = rfk.pop();

        if (!segment) {
            return tree;
        }

        const child = tree.hijos.find(h => {
            console.log("comparanddo", h.nombre, segment)
            return h.nombre == segment
        });
        if (child) {
            console.log("encontrado", segment)
            return this.recursiveRow(rfk, child);
        } else {
            console.log("no encontrado", segment)
            const nuevo = {
                nombre: segment,
                hijos: []
            }
            tree.hijos.push(nuevo);
            console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Tras nuevo", tree);
            return this.recursiveRow(rfk, nuevo);
        }

    }

}
