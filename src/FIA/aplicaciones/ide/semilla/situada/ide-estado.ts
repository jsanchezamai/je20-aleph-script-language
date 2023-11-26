import { agentMessage } from "../../../../agentMessage";
import { RTCache } from "../../../../engine/kernel/rt-cache";
import { Trainer, Trainer_key } from '../../../../paradigmas/conexionista/modelos-lenguaje/oai/asisstant';
import { EstadoT } from "../../../../paradigmas/situada/estado";
import { IDEModelo } from "../modelo/ide-modelo";

export enum IDEEstados {
	PARADA = "PARADA",
	ARRANCAR = "ARRANCAR",
	AVANZAR = "AVANZAR",
	PARAR = "PARAR",
	FUERA_SERVICIO = "FUERA_SERVICIO"
}

export class IDEEstado<IDEEstados> extends EstadoT<IDEEstados> {

	tag = "esetadoid"

	modelo: IDEModelo;

	async transicion(): Promise<void> {

		switch(this.modelo.estado) {

			case IDEEstados.PARADA:

				const c = new RTCache();
				c.recuperar();

				const as = c.leerLista(Trainer_key);

				if (as.length > 0) {
					this.modelo.estado = IDEEstados.ARRANCAR;
					console.log(agentMessage(this.modelo.nombre, "Autómata listo." + new Trainer().imprimir(as)));
				} else {
					const s = new Trainer();
					const r = await s.run([]);
					if (r.ok) {
						c.guardar(Trainer_key, r.data);
						c.persistir();
					}
				}
				break;
			default:
				console.log(agentMessage(this.modelo.nombre, "Paso 0: " + this.modelo.estado));
				this.modelo.estado = IDEEstados.FUERA_SERVICIO;
		}
	}
}