import { Assistant, AssistantListParams } from "openai/resources/beta/assistants/assistants";
import { Api, ApiReply } from "./api";

export class Trainer extends Api {

	async asistente(ASOracleAs: Partial<Assistant>): Promise<ApiReply> {

		try {

			const response = await this.openai.beta.assistants.retrieve(ASOracleAs.id);
			const data = response;

			return {
				ok: true,
				data
			};

		} catch(error) {

			// Consider adjusting the error handling logic for your use case
			if (error.response) {
				console.error(error.response.status, error.response.data);
				return { ok: false, data: error.response.data.error.message }
			} else {
				console.error(`Error with OpenAI API request: ${error.message}`);
				return { ok: false, data: 'An error occurred during your request.' }
			}

		}

	}

    async run (messages: any[]): Promise<ApiReply> {
		try {

			const query: AssistantListParams = {
            };

			const response = await this.openai.beta.assistants.list(query);
			const data = response.data;

			return {
				ok: true,
				data
			};

		} catch(error) {

			// Consider adjusting the error handling logic for your use case
			if (error.response) {
				console.error(error.response.status, error.response.data);
				return { ok: false, data: error.response.data.error.message }
			} else {
				console.error(`Error with OpenAI API request: ${error.message}`);
				return { ok: false, data: 'An error occurred during your request.' }
			}

		}
	}

	imprimir(lista: Assistant[]) {
		return `Asistentes: ${lista.length}
			${lista.map(a => "\n\t --> " + this.imprimirAsistente(a)).join("")}
		`;
	}

	imprimirAsistente(a: Assistant) {
		return `Asistente: ${a.name}, ${a.model}, \n ${a.instructions}
			${a.tools.map(a => "\n\t\t --> " + a.type).join("")}
			${a.file_ids.map(a => "\n\t\t --> " + a).join("")}
		`;
	}
}