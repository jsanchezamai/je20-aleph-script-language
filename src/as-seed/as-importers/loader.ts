import { AsSeed } from "../as-seed";
import { IFilePath } from "../core/file-model";
import { ID, IModel } from "../core/model";
import { ISemanticNetworkModel } from "../core/semantic-network-model";

export interface IDatabaseSnapshot extends IModel {
    id: ID;
}

export interface StructuredDataLoader {

    seed: AsSeed;
    network: ISemanticNetworkModel;

    model: IModel;

    import(file: IFilePath): void;
    export(): ISemanticNetworkModel;

}

export class StructuredDataLoader implements StructuredDataLoader {

    network: ISemanticNetworkModel;

    model: IModel;

    constructor(public seed: AsSeed) {

    }

    import(file: IFilePath) {
        console.log("\t \t - Loader for file", file);
    }

    export(): ISemanticNetworkModel {
        return this.network;
    }

}