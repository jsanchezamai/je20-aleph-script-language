import { i18 } from "../../../i18/labels";
import { RedNeuronalArtificial } from "../../../paradigmas/conexionista/red-neuronal";
import { agentMessage } from "../../../thread";
import { CadenaFIAConexionista } from "./cadena-fia-conexionista";

export class CadenaRedNeuronal extends RedNeuronalArtificial {}

export class CadenaFiaRedNeuronal extends CadenaFIAConexionista {

    modelo = new CadenaRedNeuronal();
    nombre = i18.APPS.CADENA.CONEXIONISTA.RED.NOMBRE;

    constructor() {

        super();

        this.modelo.nombre = i18.APPS.CADENA.CONEXIONISTA.NEURONAL.NOMBRE;

    }

    async instanciar(): Promise<string> {

        console.log(agentMessage(this.nombre, i18.APPS.CADENA.CONEXIONISTA.SIMULATION_START));

        await this.cargaRed();

        console.log(
            agentMessage(this.nombre, `${i18.APPS.CADENA.SIMULATION_BODY}:${this.imprimir()}`)
        );

        await this.probar();

        console.log(agentMessage(this.nombre, `${i18.APPS.CADENA.CONEXIONISTA.SIMULATION_END}`));
        return "";
    }

    async cargaRed() {}

    async probar(): Promise<void> {

        const dato_a = Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        const dato_b = Float32Array.from([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]);

        await this.modelo.clasificador.canalizacion.canalizarDe2Parametros({
            modelo: "/Users/morente/Desktop/DRIVE/taller_tc/JE20/je20/fia/dist/FIA/aplicaciones/cadena/conexionista/model.onnx" ,
            dato_a,
            dato_b
        })

    }
}


