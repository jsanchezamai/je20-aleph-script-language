"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAI = exports.userLabels = void 0;
const openai_1 = require("openai");
const lite_1 = require("./memoria/lite");
const fs_1 = require("fs");
const analytics_1 = require("./analytics");
const base_memory_1 = require("./memoria/base-memory");
const api_1 = require("./api");
const book_1 = require("./book");
const commands_1 = require("./commands");
const story_1 = require("./story");
const hub_1 = require("./state/hub");
const logger_1 = require("./logger");
const states_1 = require("./state/states");
var userLabels;
(function (userLabels) {
    userLabels["CANT_ACCESS_MEMORY"] = "La memoria no se puede leer:";
    userLabels["EMPTY_MEMORY"] = "La memoria est\u00E1 vac\u00EDa";
    userLabels["MEMORY_NOT_FOUND"] = "No se ha encontrado la memoria";
    userLabels["BOOK_SELECTED"] = "El libro actual ha sido cambiado a: ";
    userLabels["BOOK_NAME_INVALID"] = "No se ha indicado o incorrecto el nombre de libro: solo letras y n\u00FAmeros.";
    userLabels["MEMORY_MENU"] = "Men\u00FA de memoria::";
    userLabels["MENU_TITLE_PAGES_LIST"] = "- **Lista p\u00E1ginas** (%items):";
    userLabels["MENU_TITLE_BOOK_LIST"] = "- **Lista libros** (%items): \n";
    userLabels["BOOKS_INDEX"] = "Men\u00FA de libros";
    userLabels["OPTIONS_MENU_SHORT"] = "Ayuda: (usa **amabot ?**)";
    userLabels["OPTIONS_MENU"] = "\n - Para inicializar la memoria con un personaje: (usa **dsa eres {nombre}**).\n - Para hablar: (usa **asd {prompt}**).\n - Para listar libros: (usa **dsa mem book**).\n - Para seleccionar/crear uno: (usa **dsa mem book {nombre}**).\n - Para listar las p\u00E1ginas del libro actual: (usa **dsa mem {\u00EDndice_lista}**).\n - Para descargar la p\u00E1gina: (usa **dsa mem**).\n - Para instalar una memoria: (usa **dsa mem set {\u00EDndice}**).\n - Para ver la memoria actual: (usa **dsa memo**).\n \n - Exclusivo admin: dsa db in|out {book.title} Exporta/Importa la db via json";
    userLabels["BOOK_ENTRIES_INDEX"] = "\n - Libro actual: **%book**.";
    userLabels["MEMORY_SCREEN"] = "soy: %mood. \n```json \n %memory \n```  \n";
    userLabels["PROMPT_TIP"] = "Para invocar: asd ";
})(userLabels || (exports.userLabels = userLabels = {}));
class OpenAI {
    constructor() {
        this.api = new api_1.Api();
        this.mood = "Amabot, un bot conversacional";
        this.book = new book_1.Book("1888");
        this.lite = new lite_1.Lite();
        this.analytic = new analytics_1.Analytics();
        logger_1.LG.subscribeState(hub_1.ApiStateHub.i());
    }
    // function that receives a mood and stores it in class attribute
    async setIdentity(message) {
        this.mood = message.content.replace(commands_1.PROMPTS.setIdentity, "");
        message.content = story_1.HELLO_PROMPT2;
        base_memory_1.BM.setEmpty();
        hub_1.ApiStateHub.i().setApiState(hub_1.SET_ID);
        await this.triggerPrompt(message);
    }
    async getMemory(message) {
        const chunks = base_memory_1.BM.getMemAsChunkChain(1700);
        const mem = chunks.length > 0 ? chunks[0] : '';
        if (mem) {
            message.content = userLabels.MEMORY_SCREEN
                .replace("%mood", this.mood)
                .replace("%memory", mem);
            message.reply(message.content);
        }
        if (chunks.length > 1) {
            message.content = chunks[1];
            message.reply(message.content);
        }
    }
    async lookUpOrSetMemory(message) {
        // await this.lite.exportMarkdown(this.book);
        let prompt = message.content.replace(commands_1.PROMPTS.memory_access + " ", "");
        const isASetMemoryOrder = prompt.indexOf(commands_1.PROMPTS.set) > -1;
        if (isASetMemoryOrder) {
            prompt = prompt.replace(commands_1.PROMPTS.set, "");
            const key = parseInt(prompt);
            // console.log("Getting PAGE for", key ? key : "", "isSet", isASetMemoryOrder);
            await this.doSetMemory(message, key);
            return;
        }
        else {
            //  // console.log("Checking if is a book memory order", prompt);
            const isABookMemoryOrder = prompt.indexOf(commands_1.PROMPTS.book) > -1;
            if (isABookMemoryOrder) {
                // console.log("Is a book memory order", isABookMemoryOrder);
                prompt = prompt.replace(commands_1.PROMPTS.book, "").trim();
                const key = prompt;
                // console.log("Getting BOOK for", key ? key : "");
                await this.replyBookCommand(message, key);
                return;
            }
        }
        const key = parseInt(prompt);
        if (!key) {
            // console.error("No key found in", prompt);
        }
        // console.log("Loading PAGE or Listing. Page key?", prompt ? prompt : "");
        await this.replyPageCommand(message, key);
    }
    async triggerPrompt(message) {
        hub_1.ApiStateHub.i().setApiState(hub_1.TRIGGER);
        const prompt = message.content.replace(commands_1.PROMPTS.simple, "");
        const response = await this.queryToApi(story_1.MOOD_PROMPT.replace("%mood", this.mood), prompt);
        // console.log("** Prompting is back from API");
        const totalMessage = response.result + base_memory_1.MEMORY_BREAK + base_memory_1.BM.getAsJsonMarkdown();
        if (totalMessage.length > 1900) {
            // console.log("Original message with lenght", totalMessage.length, "croping to 2 chunks of 1900");
            let finalMessage = totalMessage.substring(0, 1900);
            message.reply(finalMessage || "");
            finalMessage = totalMessage.substring(1900);
            if (totalMessage.length > 1900) {
                finalMessage = totalMessage.substring(1900, 3800);
                try {
                    message.reply(finalMessage || "");
                }
                catch (error) {
                    // console.log("Response too long to send to chat", error.message);
                }
            }
            else {
                message.reply(finalMessage || "");
            }
        }
        else {
            message.reply(totalMessage || "");
        }
        await this.registerAnalytics(prompt, response.result, message);
    }
    async dbEdit(message) {
        hub_1.DB_MANAGEMENT.state = states_1.STATES.DB_MANAGEMENT;
        // DB_MANAGEMENT.request.messages.push(message);
        hub_1.ApiStateHub.i().setApiState(hub_1.DB_MANAGEMENT);
        const prompt = message.content.replace(commands_1.PROMPTS.dbEdit + " ", "");
        let response;
        let result;
        const isIn = prompt.indexOf(commands_1.PROMPTS.in) > -1;
        if (isIn) {
            const key = prompt.replace(commands_1.PROMPTS.in, "");
            result = await this.lite.importJson(new book_1.Book(key));
            response = "Imported book " + key;
        }
        else {
            const key = prompt.replace(commands_1.PROMPTS.out, "");
            result = await this.lite.exportJson(new book_1.Book(key));
            response = "Exported book " + key;
        }
        if (!result) {
            response += ". Missing book or params.";
        }
        if (message.reply)
            message.reply(response);
        hub_1.DB_MANAGEMENT.state = states_1.STATES.READY;
        hub_1.DB_MANAGEMENT.reply = {
            ok: result,
            data: response
        };
        hub_1.ApiStateHub.i().setApiState(hub_1.DB_MANAGEMENT);
    }
    async queryToApi(mood, prompt) {
        let result;
        // QUERY.reply.data = mood;
        hub_1.ApiStateHub.i().setApiState(hub_1.QUERY);
        const memory = base_memory_1.BM.getMemAsPrompt();
        prompt = story_1.MARKS_PROMPT.replace("%prompt", prompt);
        const messages = [
            { "role": openai_1.ChatCompletionRequestMessageRoleEnum.System, "content": story_1.STORY_PROMPT },
            { "role": openai_1.ChatCompletionRequestMessageRoleEnum.Assistant, "content": story_1.MEMORY_HISTORIC },
            { "role": openai_1.ChatCompletionRequestMessageRoleEnum.Assistant, "content": memory },
            { "role": openai_1.ChatCompletionRequestMessageRoleEnum.User, "content": analytics_1.ANALYTICS_PROMPT },
            { "role": openai_1.ChatCompletionRequestMessageRoleEnum.System, "content": story_1.MARKDOWN_PROMPT },
            { "role": openai_1.ChatCompletionRequestMessageRoleEnum.User, "content": mood + prompt }
        ];
        console.log("Final messages queue prompt \n", messages.map(m => m.content).join("\n"));
        const completion = await this.api.send(messages);
        if (completion.ok) {
            result = { result: completion.data };
        }
        else {
            result = { result: 'An error occurred during your request.' };
        }
        return result;
    }
    async registerAnalytics(promptText, response, message) {
        console.info("- ", new Date().toTimeString(), "Updating memory after IA request...");
        let newAnalytics = this.analytic.getAnalyticsFromResponse(response);
        const hasAnalytics = await this.analytic
            .hasAnalytics(promptText, newAnalytics, response, this.mood, this.book);
        // console.log("Has analytics?", hasAnalytics);
        if (!hasAnalytics) {
            // console.log("Has analytics? No, need to reprompt!");
            const requested = { keys: "" };
            const success = await this.analytic
                .requeryAnalyticKeys(requested, response);
            if (!success) {
                console.warn("- ", new Date().toTimeString(), "No analytics_mark found. ");
                base_memory_1.BM.getInstance().add(this.book, new lite_1.cEntry({
                    who: this.mood,
                    timestamp: new Date(),
                    prompt: promptText,
                    keys: "",
                    mem: base_memory_1.BM.getMemAsString(),
                    content: response
                }));
                return;
            }
            else {
                const data = "```json \n" + JSON.stringify(requested.keys, null, "\t") + "\n```";
                base_memory_1.BM.getDataAsChunkChain(1900, data).forEach((chunk) => message.reply(chunk));
            }
            newAnalytics = requested.keys;
        }
        ;
        // console.log("Has analytics? Yes, process and store!");
        this.analytic.processAnalytics(promptText, newAnalytics, response, this.mood, this.book);
    }
    async doSetMemory(message, key) {
        // console.log("**Requesting de memory for**", key);
        const row = await this.lite.getById(this.book, key);
        // console.log("Memory found", row);
        let reply = "";
        if (row) {
            // console.log("Memory found for role:", row.who);
            this.mood = row.who;
            let foundMemory = false;
            if (row.keys) {
                foundMemory = base_memory_1.BM.setMemoryFromStringifiedKeys(row.keys, key);
                if (!foundMemory) {
                    reply = userLabels.CANT_ACCESS_MEMORY + key + row.keys;
                }
            }
            else {
                // console.log("No keys found for", key)
            }
            if (!foundMemory && row.mem) {
                foundMemory = base_memory_1.BM.setMemoryFromStringifiedKeys(row.mem, key);
                if (!foundMemory) {
                    reply = userLabels.CANT_ACCESS_MEMORY + key + row.mem;
                }
            }
            else {
                // console.log("Already has keys or no mem found for", key)
            }
            if (!foundMemory) {
                console.warn("No memory found for", key);
                reply = userLabels.EMPTY_MEMORY + key;
            }
            else {
                this.getMemory(message);
                message.content = userLabels.PROMPT_TIP + row.prompt;
                message.reply(message.content);
                return;
            }
        }
        else {
            console.warn("No memory found for", key);
            reply = userLabels.MEMORY_NOT_FOUND + key;
        }
        message.reply(reply);
    }
    /**
     * Given a id number, retrieves the exported .md file that matches it.
     *
     * If not matches any, prints a menu of options.
     */
    async replyPageCommand(message, key) {
        if (key) {
            const row = await this.lite.getById(this.book, key);
            if (row) {
                // console.log("getById Resolved!", key);
                const pathToFile = this.book.getExportFilenameFullPath(row);
                let hasFile = (0, fs_1.existsSync)(pathToFile);
                if (!hasFile) {
                    hasFile = this.book.exportRowAsMarkdown(row);
                }
                if (hasFile) {
                    // console.log("Sending exported file for", pathToFile);
                    message.channel
                        .send(new MessageAttachment(pathToFile, this.book.rowAsExportFileName(row)))
                        .catch(console.error);
                    return;
                }
                else {
                    console.warn("No file could be created for", key);
                    return;
                }
            }
        }
        const rows = await this.lite.getAll(this.book);
        const list = await this.book.getBookEntries(rows);
        const chunks = base_memory_1.BM.getDataAsChunkChain(1900, this.getMenuList(userLabels.BOOK_ENTRIES_INDEX, list));
        const mem = chunks.length > 0 ? chunks[0] : '';
        if (mem) {
            if (message.reply) {
                message.content = mem;
                message.reply(message.content);
            }
            else {
                console.log("Menu result:", mem);
            }
        }
        if (chunks.length > 1) {
            if (message.reply) {
                message.content = chunks[1];
                message.reply(message.content);
            }
            else {
                console.log("chunk 1:", mem);
            }
        }
    }
    /**
     * Given a book title, loads the book and opens it for query.
     *
     * If not matches any, creates the book
     */
    async replyBookCommand(message, key) {
        const book = new book_1.Book(key);
        if (book.fsError) {
            const l = userLabels.BOOK_NAME_INVALID + key + "\n";
            const chunks = base_memory_1.BM.getDataAsChunkChain(1900, this.getMenuList(userLabels.BOOK_ENTRIES_INDEX, book_1.Book.getBooksList()));
            const mem = chunks.length > 0 ? chunks[0] : '';
            if (mem) {
                message.content = mem;
                message.reply(message.content);
            }
            if (chunks.length > 1) {
                message.content = chunks[1];
                message.reply(message.content);
            }
            return;
        }
        this.book = book;
        base_memory_1.BM.setEmpty();
        message.reply(userLabels.BOOK_SELECTED + key);
        message.content = "amabot mem";
        this.lookUpOrSetMemory(message);
    }
    getMenuList(subtitle, list) {
        return " **" + userLabels.MEMORY_MENU + "** " +
            userLabels.OPTIONS_MENU_SHORT +
            subtitle.replace("%book", this.book.title) +
            list;
    }
}
exports.OpenAI = OpenAI;
