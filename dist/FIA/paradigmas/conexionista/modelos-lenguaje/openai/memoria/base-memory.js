"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BM = exports.ERROR_TOPIC = exports.MEMORY_PROMPT = exports.EMPTY_MEMORY = exports.MEMORY_BREAK = void 0;
const hub_1 = require("../state/hub");
const lite_1 = require("./lite");
exports.MEMORY_BREAK = "\n\n **Estado de la memoria**: \n";
exports.EMPTY_MEMORY = [{ "topic": "Empty" }];
exports.MEMORY_PROMPT = "Usa la siguiente memoria para contextualizar tu respuesta: %memory.";
exports.ERROR_TOPIC = "Error handling";
class BM extends lite_1.Lite {
    static setEmpty() {
        this.memory = exports.EMPTY_MEMORY;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new BM();
        }
        return this.instance;
    }
    static setAnalytics(newAnalytics) {
        // console.log("Updating Memory: ");
        if (newAnalytics.topic == exports.ERROR_TOPIC) {
            console.warn("ERROR_TOPIC found, skipping...");
            return;
        }
        hub_1.ApiStateHub.i().setApiState(hub_1.SET_MEMORY);
        this.memory[0] = JSON.stringify(newAnalytics);
    }
    static getMemAsString() {
        if (this.memory && this.memory[0] && this.memory[0].topic && this.memory[0].topic == "Empty") {
            return "";
        }
        return JSON.stringify(this.memory[0]);
    }
    static getMemAsChunkChain(chunkSize) {
        return this.getDataAsChunkChain(chunkSize, this.getMemAsString());
    }
    static getDataAsChunkChain(chunkSize, data) {
        const chunks = [];
        let i = 0, n = data.length;
        while (i < n) {
            chunks.push(data.slice(i, i += chunkSize));
        }
        return chunks;
    }
    static getAsJsonMarkdown() {
        return "```json \n" + this.getMemAsString() + "\n```";
    }
    static getMemAsPrompt() {
        return this.getMemAsString() ?
            exports.MEMORY_PROMPT.replace("%memory", BM.getMemAsString()) :
            "";
    }
    static setMemoryFromStringifiedKeys(keys, debugInfo) {
        let foundMemory = false;
        try {
            this.memory = [JSON.parse(keys)];
            foundMemory = true;
            hub_1.ApiStateHub.i().setApiState(hub_1.SET_MEMORY);
        }
        catch (error) {
            console.warn("Invalid data at:", debugInfo, keys);
        }
        return foundMemory;
    }
    static setMemoryFromMergeRequest(reply) {
        this.memory[0] = this.parseResultToJson(reply);
        hub_1.ApiStateHub.i().setApiState(hub_1.SET_MEMORY);
    }
    static parseResultToJson(result) {
        try {
            return JSON.parse(result);
        }
        catch (error) {
            // console.log("Failed to parse Result Analytics", result);
            return {};
        }
    }
}
exports.BM = BM;
BM.memory = exports.EMPTY_MEMORY;
