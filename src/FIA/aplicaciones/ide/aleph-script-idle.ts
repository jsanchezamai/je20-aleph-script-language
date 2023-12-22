import { Assistant } from "openai/resources/beta/assistants/assistants";
import { ASOracleAs, IDE_clave, Trainer_clave } from "../../paradigmas/conexionista/modelos-lenguaje/oai/Trainer_key";
import { RTCache } from "../../engine/kernel/rt-cache";
import { agentMessage } from "../../agentMessage";
import { Observable, Subject } from "rxjs";
import { IFase } from "../../paradigmas/sbc/implementaciones/common-kads/common-kads";
import { IDiccionarioI18 } from "../../genesis-block";
import { AS_IDE_i18 } from "./aleph-script-idle-i18";
import { Trainer } from '../../paradigmas/conexionista/modelos-lenguaje/oai/asisstant';

export interface AlephScriptIDE {

	i18: IDiccionarioI18;

	actionServer: Observable<IFase>;
	actionServerS: Subject<IFase>;

	nombre: string;

	arrancado: boolean;
	assistant: Assistant;
	projectName: string;

	motor: () => void;
	imprimir: () => void;
}

export class AlephScriptIDEImpl implements AlephScriptIDE {

	i18 = AS_IDE_i18;
	nombre = this.i18.IDE.NOMBRE;

	actionServer: Observable<IFase>;
	actionServerS: Subject<IFase>;

	projectName = "AlephScriptIDE_Proyecto_1";
	assistant: Assistant;
	trainer: Trainer = new Trainer();

	cache = new RTCache();

	arrancado: boolean;

	constructor() {

		const c = new RTCache();
		this.assistant = (c.leer(Trainer_clave) as Assistant[])
			.find(a => a.id === ASOracleAs.id);

		console.log(agentMessage(this.assistant.name, this.assistant.name ? "¡Listo!" :  "Error al inicializar IDE!"));
		this.actionServerS = new Subject<IFase>();
		this.actionServer = this.actionServerS.asObservable();

	}

	motor() {

		console.log(agentMessage(this.assistant.name, "¡Listo para recibir peticiones de ayuda!"));
		this.actionServer.subscribe(async f => {

			console.log(agentMessage(this.nombre, `${this.i18.IDE.ASISTENTE.CK.SOLICITUD}: ${f.fase}`))

			const mensaje = f.imprimir();

			if (!mensaje) {
				return
			}

			console.log(agentMessage(this.nombre, `${this.i18.IDE.ASISTENTE.CK.SOLICITUD}: Mensaje ${mensaje}`));
			const res = await this.trainer.crearHilo({ assistant_id: this.assistant.id, solicitud: mensaje });

			if (res.ok) {
				const data = res.data.data.map(m => m.content.map(mm => JSON.stringify(mm)));
				console.log(agentMessage(this.nombre, res.data));
				console.log(agentMessage(this.nombre, data));
				console.log(data)
			} else {
				console.log(agentMessage(this.nombre, res.data));
				console.log(res)
			}
		});

	}

	imprimir() {

		return this.projectName;
	}


}

export class Asistentizador<T> {

	constructor(public objetivo: T) {

	}

	filtroComunes = ["i18", "dominio"];

	// TODO
	obtenerSchemaReferencia(clase: any): Record<string, any> {

		const schemaReferencia: Record<string, any> = {};

		const esquema = clase.obtenerSchemaReferencia();
		console.log("Conocida", clase.constructor.name, esquema);

		schemaReferencia.esquema = esquema;

/*
		// Obtener los nombres de los métodos de la interfaz
		const nombresMetodos = Object.getOwnPropertyNames(Object.getPrototypeOf(clase)).filter(name => name !== 'constructor');
		console.log("Los metodos", nombresMetodos, clase)
		// Iterar sobre los métodos y obtener información sobre sus parámetros
		for (const nombreMetodo of nombresMetodos) {

			const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(clase), nombreMetodo);
			console.log("\t - el descriptor de", nombreMetodo, descriptor)

			if (descriptor && typeof descriptor.value === 'function') {

				const parametros = Reflect.getMetadata('design:paramtypes', clase[nombreMetodo]) || [];

				// Crear un objeto de referencia JSON Schema para el método
				schemaReferencia[nombreMetodo] = {
					type: 'function',
					esquema,
					parameters: parametros.map((param: any) => ({ type: param.name.toLowerCase() }))
				};
			}
		}
*/
		
		return schemaReferencia;
	}
// TODO
	examinarClase() {

		const isf = (functionToCheck) => {
			return Object.prototype.toString.call(functionToCheck) === '[object Function]';
		}

		const iso = (functionToCheck) => {
			return Object.prototype.toString.call(functionToCheck) === '[object Object]';
		}

		// console.log("Examen:", this.obtenerSchemaReferencia(this.objetivo));

		const propiedades = Object.getOwnPropertyNames(this.objetivo);
		console.log("Empieza el examen", propiedades )
		Object.keys(this.objetivo).filter(f => this.filtroComunes.indexOf(f) == -1).forEach(c => {
			console.log("\t - Examinar miembro", c);

			const m = this.objetivo[c];

			const f = isf(this.objetivo[c]);

			if (f) {
				const propiedades = Object.getOwnPropertyNames(m);

				console.log("\t\t - FuncionEncontrada:", c,  propiedades, m.toString()
					.match(/\((.*?)\)/)?.[1]
					.split(',')
					.map(param => param.trim()) || []
				);
				return;
			}

			const o = iso(this.objetivo[c]);

			if (o) {
				// console.log("\t\t - Objecto encontrado. Reasistentizando", c);
				// new Asistentizador(m).examinarClase();
				return;
			}

		});
	}
// TODO
	comoHerramientaFuncion(): Assistant.Function {

		return {
			"type": "function",
			"function": {
				"name": "getCurrentWeather",
				"description": "Get the weather in location",
				"parameters": {
					"type": "object",
					"properties": {
						"location": {"type": "string", "description": "The city and state e.g. San Francisco, CA"},
						"unit": {"type": "string", "enum": ["c", "f"]}
					},
					"required": ["location"]
				}
			}
		}
	}
// TODO
	comoFunciones(): Assistant.Function {

        const f: Assistant.Function = {
            function: {
                name: "",
                parameters: {
                    type: "object",
                    properties: {},
					required: []
                }
            },
            type: "function"
        }
        return f;
    }
}
