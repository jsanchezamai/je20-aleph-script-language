import { AppModelBundle } from "../app.model.bundle/app.model.bundle";
import { ChenLoader } from "../as-importers/chen-loader";
import { CollectionLoader } from '../as-importers/collection-loader';
import { DataLoader } from '../as-importers/data-loader';
import { IDatabaseSnapshot } from "../as-importers/loader";
import { AsSeed } from "../as-seed";
import { Log } from "../core/compiler";
import { AppDirectory, IFilePath } from "../core/file-model";
import { Model } from "../core/model";
import { ISemanticNetworkModel } from "../core/semantic-network-model";


export class AlephScriptBoilerplate {

    seed = new AsSeed();

    app: AppDirectory = {
        "id": "BoilerPlateApp",
        "baseFolder": " AlephScriptApps",
        "configFolder": "in/config",
    };

    private dataLoader: DataLoader;
    private networks: ISemanticNetworkModel[] = [];
    private snapshot: IDatabaseSnapshot = new Model();
    private appBundle: AppModelBundle;

    /**
     * Execute once in App lifecyce: create the seed
     */
    init() {

        console.log("AS_SEED: main sequence.Init");

        console.log("Creating app folder", this.app);
        this.seed.runIniter(this.app);

        console.log("Consuming config files");
        this.app = this.seed.runLoadConfig(this.app);

        console.log("Opened seed!");

    }

    /**
     * Execute on demand to process Chen or Collection
     * schemas. Import also mock data for those schemas.
     */
    runImportAction() {

        console.log("AS_SEED: main sequence. Loading source files");

        console.log("\t - Loading source files. Found chen files: 2");

        const chenLoader: ChenLoader = new ChenLoader(this.seed);
        const chenFile: IFilePath = this.app.chensFolder;

        console.log("\t - Loading source files. Found collection file: 1");

        const collectionLoader = new CollectionLoader(this.seed);
        const collectionFile: IFilePath = this.app.collectionsFolder;

        console.log("\t - Loading source files. Found data file: 1");

        const dataLoader = new DataLoader(this.seed);
        const dataFile: IFilePath = this.app.dataFolder;

        console.log("Executing loaders:");

        console.log("\t - Executing loaders. Loaded chen domains: 2");
        const chenNet = this.seed.runLoader(chenLoader, chenFile);

        console.log("\t - Executing loaders. Loaded collection domains: 1");
        const collectionNet = this.seed.runLoader(collectionLoader, collectionFile);

        console.log("\t - Executing loaders. Loaded chen domains: 2");
        const dataNet = this.seed.runLoader(dataLoader, dataFile);

        const logs = this.seed.runStore(this.app, [chenNet, collectionNet, dataNet]);

        logs.logs.forEach(
            (l: Log, index: number) => console.log("\t - STORE logs", index, l));

    }

    /**
     * Execute once after import-actions already finished.
     *
     * Use the dataLoader to train network over mock data
     */
    runCompileAction() {

        console.log("AS_SEED: main sequence. Training...");
        this.appBundle = this.seed.runTrainer(this.dataLoader, this.networks, this.snapshot);

        console.log("\t - trained!", this.appBundle);

        console.log("AS_SEED: main sequence. Compiling...");
        const compilerLogs = this.seed.runCompiler(this.app, this.appBundle);

        compilerLogs.logs.forEach(
            (l: Log, index: number) => console.log("\t - Compilation logs", index, l));

    }

    main() {

        console.log("AS_SEED: main sequence");

        this.init();

        console.log("AS_SEED: main sequence. STATE", this.app);

        this.runImportAction();

        console.log("AS_SEED: main sequence. STATE", this.app);

        this.runCompileAction();

    }

}