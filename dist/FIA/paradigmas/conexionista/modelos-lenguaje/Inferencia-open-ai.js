"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InferenciaOpenAI = void 0;
const openai_1 = require("openai");
const dominio_1 = require("../../../mundos/dominio");
const inferencia_modelo_lenguaje_1 = require("./inferencia-modelo-lenguaje");
const api_1 = require("./oai/api");
class InferenciaOpenAI extends inferencia_modelo_lenguaje_1.InferenciaModeloLenguaje {
    constructor() {
        super();
        this.api = new api_1.Api();
        this.claveDominio = "inferencias.openai";
        this.dominio = new dominio_1.Dominio({});
    }
    configurar(b, parametros) {
        // console.log(agentMessage('InferenciaOpenAI.evaluar', 'configurar base'), b);
        this.mensajes = this.obtenerPromptBase(b, parametros.base);
    }
    obtenerPromptBase(b, datos) {
        const roles = openai_1.ChatCompletionRequestMessageRoleEnum;
        return [
            { role: roles.System, content: datos.system.background },
            { role: roles.System, content: datos.system.format },
            { role: roles.Assistant, content: datos.assistant.cache },
            { role: roles.Assistant, content: datos.assistant.archive },
            { role: roles.User, content: datos.user.analytics },
            { role: roles.User, content: datos.user.prompt.replace("<estado.modelo>", JSON.stringify(b.modelo)) }
        ];
    }
    async evaluar() {
        // this.dominio.base[this.claveDominio] = [ 'Correcto' ];
        // return this;
        if (InferenciaOpenAI.occupy == 50) {
            process.exit();
            console.log("Cancelando request openai");
            return this;
        }
        this.dominio.base[this.claveDominio] = {
            respuesta: "Todo bien."
        };
        //return this;
        InferenciaOpenAI.occupy++;
        const response = await this.queryToApi();
        // console.log(agentMessage('InferenciaOpenAI.evaluar', 'raw api response:'), response?.result);
        try {
            this.dominio.base[this.claveDominio] = JSON
                .parse(response.result.replace(/\\n/g, ""));
        }
        catch (ex) {
            this.dominio.base[this.claveDominio] = response;
        }
        // console.log("oai.the domain now has value", this.dominio.base[this.claveDominio]);
        return this;
    }
    async queryToApi() {
        let result;
        /* console.log(
            agentMessage('InferenciaOpenAI.evaluar', 'raw api request:'),
            this.mensajes.map(m => (m as IOpenAiApiMessage).content)
        ); */
        const completion = await this.api.send(this.mensajes);
        if (completion.ok) {
            result = { result: completion.data };
        }
        else {
            result = { result: 'An error occurred during your request.' };
        }
        return result;
    }
}
exports.InferenciaOpenAI = InferenciaOpenAI;
InferenciaOpenAI.occupy = 0;
