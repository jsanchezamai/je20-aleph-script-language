// AlephScriptIDE.ts
interface AlephScriptIDE {
	currentState: string;
	createProject(): void;
	designProject(): void;
	buildProject(): void;
	runProject(): void;
}

class AlephScriptIDEImpl implements AlephScriptIDE {

	currentState: string;
	projectName: string;
	calculatorOperations: string[];

	constructor() {
		this.currentState = "crear proyecto";
		this.projectName = "";
		this.calculatorOperations = [];
	}

	createProject(): void {
	console.log("Estado actual: crear proyecto");

	// Solicitar el nombre del proyecto
	this.projectName = "Calculadora";

	console.log(`Nombre del proyecto: ${this.projectName}`);

	// Solicitar las operaciones de la calculadora
	this.calculatorOperations = ["sumar", "restar", "multiplicar", "dividir"];

	console.log("Operaciones de la calculadora:");
	this.calculatorOperations.forEach((operation) => {
		console.log(`- ${operation}`);
	});

	// Cambiar al estado "diseñar proyecto"
	this.currentState = "diseñar proyecto";
		console.log("Cambiando al estado: diseñar proyecto");
	}

	designProject(): void {
	console.log("Estado actual: diseñar proyecto");

	// Lógica para diseñar el proyecto

	// Cambiar al estado "construir proyecto"
	this.currentState = "construir proyecto";
		console.log("Cambiando al estado: construir proyecto");
	}

	buildProject(): void {
		console.log("Estado actual: construir proyecto");

		// Lógica para construir el proyecto

		// Cambiar al estado "ejecutar proyecto"
		this.currentState = "ejecutar proyecto";
		console.log("Cambiando al estado: ejecutar proyecto");
	}

	runProject(): void {
		console.log("Estado actual: ejecutar proyecto");

		// Lógica para ejecutar el proyecto
		console.log("El proyecto de la calculadora está en funcionamiento.");
		console.log("Puedes realizar cálculos utilizando las operaciones definidas.");
	}
}
const ide = new AlephScriptIDEImpl();