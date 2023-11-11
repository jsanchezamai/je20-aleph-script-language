"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = exports.ANALYTICS_MERGE_PROMPT = exports.ANALYTICS_PROMPT_REQUERY_KEYS = exports.ANALYTICS_PROMPT = exports.ANALYTICS_DEFINITION = exports.ANALYTICS_DATA = exports.ANALYTICS_KEYS = exports.ANALYTICS_MARK = void 0;
const base_memory_1 = require("./memoria/base-memory");
const api_1 = require("./api");
const fs_1 = require("fs");
const hub_1 = require("./state/hub");
const lite_1 = require("./memoria/lite");
const auth = require('../../package.json');
exports.ANALYTICS_MARK = "**Análisis:**";
exports.ANALYTICS_KEYS = ["Topic:", "Context:", "Intent:", "Named Entities:", "Keywords:", "Sentiment:"];
exports.ANALYTICS_DATA = "Topic, context, intent, named entities, keywords, y sentiment";
exports.ANALYTICS_DEFINITION = "un análisis del Prompt que usando NLP devuelva: " + exports.ANALYTICS_DATA + ". No incluyas comentarios del análisis, solo la lista de puntos.";
exports.ANALYTICS_PROMPT = "Añade al final de tu respuesta la marca " + exports.ANALYTICS_MARK + " y tras ella agrega " + exports.ANALYTICS_DEFINITION;
exports.ANALYTICS_PROMPT_REQUERY_KEYS = "Crea un json con los campos de" + exports.ANALYTICS_DEFINITION + " El prompt para analizar es: %prompt.";
exports.ANALYTICS_MERGE_PROMPT = "Fusiona estas dos analíticas: [%A1] y [%A2]. Fusiona ambas estadísticas usando NLP y devuelve " + exports.ANALYTICS_DATA + ". En la fusión debe discriminarse positivamente la segunda estadística.";
class Analytics {
    constructor() {
        this.mb = base_memory_1.BM.getInstance();
        this.api = new api_1.Api();
        if (!(0, fs_1.existsSync)(auth.openai.memory)) {
            (0, fs_1.mkdirSync)(auth.openai.memory);
        }
    }
    getAnalyticsFromResponse(response) {
        let newAnalytics = null;
        const newData = response.split("\n");
        newData.forEach((line) => {
            exports.ANALYTICS_KEYS.forEach((key) => {
                if (line.toLocaleLowerCase().indexOf(key.toLowerCase()) > -1) {
                    if (!newAnalytics)
                        newAnalytics = {};
                    newAnalytics[key.replace(":", "")] = line.replace('- ' + key + ': ', "").replace(key, "").replace("-  ", "").replace("- ****", "") + "\n";
                }
            });
        });
        return newAnalytics;
    }
    async memoryIsEmpty(promptText, newAnalytics, response, mood, book) {
        // console.log("Current memory state...");
        if (!base_memory_1.BM.getMemAsString() || base_memory_1.BM.memory.length == 0) {
            // console.log("Current memory state... EMPTY");
            // console.log(" ");
            console.warn("First time, new memory:\n", JSON.stringify(newAnalytics, null, "\t"));
            // console.log(" ");
            base_memory_1.BM.setAnalytics(newAnalytics);
            await this.mb.add(book, new lite_1.cEntry({
                who: mood,
                timestamp: new Date(),
                prompt: promptText,
                keys: JSON.stringify(newAnalytics),
                mem: "",
                content: response
            }));
            return true;
        }
        // console.log("Current memory state... USED");
        return false;
    }
    async hasAnalytics(promptText, newAnalytics, response, mood, book) {
        if (!newAnalytics || (newAnalytics === null || newAnalytics === void 0 ? void 0 : newAnalytics.topic) == base_memory_1.ERROR_TOPIC) {
            console.warn("- ", new Date().toTimeString(), "analyticsIsEmpty!!!");
            await this.mb.add(book, new lite_1.cEntry({
                who: mood,
                timestamp: new Date(),
                prompt: promptText,
                keys: "",
                mem: base_memory_1.BM.getMemAsString(),
                content: response
            }));
            return false;
        }
        return true;
    }
    async processAnalytics(promptText, newAnalytics, response, mood, book) {
        // console.log("Processing analytics...");
        const needToMerge = await this.memoryIsEmpty(promptText, newAnalytics, response, mood, book);
        if (needToMerge) {
            // console.log("Memory is new son no need to merge... ");
            return;
        }
        else {
            // console.log("Memory is not new so we need to merge... ");
        }
        // console.log(" ");
        // console.log("The new analytics memory to merge:\n"/*, newAnalytics*/);
        // console.log(" ");
        const prompt = exports.ANALYTICS_MERGE_PROMPT
            .replace("%A1", base_memory_1.BM.getMemAsString()).replace("%A2", JSON.stringify(newAnalytics, null, "\t"));
        try {
            const messages = [
                { "role": ChatCompletionRequestMessageRoleEnum.System, "content": prompt }
            ];
            const completion = await this.api.send(messages);
            if (completion.ok) {
                const result = completion.data;
                // console.log(" ");
                // console.log("Prompting memory MERGE result:\n"/*, result*/);
                // console.log(" ");
                base_memory_1.BM.setMemoryFromMergeRequest(result);
                await this.mb.add(book, new lite_1.cEntry({
                    who: mood,
                    timestamp: new Date(),
                    prompt: promptText,
                    keys: JSON.stringify(newAnalytics),
                    mem: base_memory_1.BM.getMemAsString(),
                    content: response
                }));
                // console.log(" ");
                // console.log("Memory updated:\n", /*BM.memory*/);
                // console.log(" ");
                return true;
            }
        }
        catch (error) {
            // Consider adjusting the error handling logic for your use case
            if (error.response) {
                console.error(error.response.status, error.response.data);
            }
            else {
                console.error(`Error with OpenAI API request: ${error.message}`);
            }
            await this.mb.add(book, new lite_1.cEntry({
                who: mood,
                timestamp: new Date(),
                prompt: promptText,
                keys: JSON.stringify(newAnalytics),
                mem: base_memory_1.BM.getMemAsString(),
                content: response
            }));
        }
        return false;
    }
    async requeryAnalyticKeys(requested, response) {
        try {
            const prompt = exports.ANALYTICS_PROMPT_REQUERY_KEYS.replace("%prompt", response);
            const messages = [
                { "role": ChatCompletionRequestMessageRoleEnum.User, "content": prompt }
            ];
            hub_1.ApiStateHub.i().setApiState(hub_1.MERGING);
            // console.log("-", new Date().getTime(), "Prompting memory REQUERY keys:\n");
            const completion = await this.api.send(messages);
            if (completion.ok) {
                const result = completion.data;
                // console.log(" ");
                // console.log("Prompting memory REQUERY result:\n"/*, result*/);
                // console.log(" ");
                requested.keys = base_memory_1.BM.parseResultToJson(result);
            }
            return Object.keys(requested.keys).length > 0;
        }
        catch (error) {
            // console.log("Error REQUERYING keys", error.message);
            return false;
        }
    }
}
exports.Analytics = Analytics;
