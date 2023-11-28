import { Assistant } from "openai/resources/beta/assistants/assistants";
import { ASOracleAs, Trainer_clave } from "../../paradigmas/conexionista/modelos-lenguaje/oai/Trainer_key";
import { RTCache } from "../../engine/kernel/rt-cache";
import { agentMessage } from "../../agentMessage";

export interface AlephScriptIDE {

	nombre: string;

	arrancado: boolean;
	assistant: Assistant;
	projectName: string;

	motor: () => void;
	imprimir: () => void;
}

export class AlephScriptIDEImpl implements AlephScriptIDE {

	projectName = "AlephScriptIDE_Proyecto_1";
	assistant: Assistant;

	arrancado: boolean;

	constructor() {

		const c = new RTCache();
		this.assistant = (c.leer(Trainer_clave) as Assistant[])
			.find(a => a.id === ASOracleAs.id);

		console.log(agentMessage(this.assistant.name, this.assistant.name ? "¡Listo!" :  "Error al inicializar IDE!"));
	}
	nombre: string;

	motor() {
		console.log("Motor del ide");
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

		console.log("Examen:", this.obtenerSchemaReferencia(this.objetivo));

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
