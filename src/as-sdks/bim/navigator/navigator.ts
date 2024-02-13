import { ITreeNode } from "../../../as-seed/as-importers/tree-loader";
import { IRow } from "../../../as-seed/core/model";

export class Navigator {
    constructor(public index: IRow[], public bosque: ITreeNode) {

    }
}