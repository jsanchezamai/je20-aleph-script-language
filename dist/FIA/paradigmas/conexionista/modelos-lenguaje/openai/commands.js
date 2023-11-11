"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_COMMANDS = exports.PROMPTS = void 0;
var PROMPTS;
(function (PROMPTS) {
    PROMPTS["simple"] = "asd";
    PROMPTS["management"] = "dsa";
    PROMPTS["setIdentity"] = "dsa eres";
    PROMPTS["memory"] = "dsa memo";
    PROMPTS["memory_access"] = "dsa mem";
    PROMPTS["set"] = "set";
    PROMPTS["book"] = "book";
    PROMPTS["dbEdit"] = "dsa db";
    PROMPTS["in"] = "in";
    PROMPTS["out"] = "out";
})(PROMPTS || (exports.PROMPTS = PROMPTS = {}));
// dbEdit _-> para uso por consola... permite el mapeado entre json y dbsqlite
// dsa db out {nombre libro} -> exporta el libro al directorio de export con formatos json
// dsa db in {nombre libro} -> importa el libro del directorio de import con formatos json
exports.AI_COMMANDS = [
    {
        id: 120,
        content: PROMPTS.setIdentity,
        response: (message, bot, registry) => {
            bot.openai.setIdentity(message);
        }
    },
    {
        id: 121,
        content: PROMPTS.simple,
        response: (message, bot, registry) => {
            bot.openai.triggerPrompt(message);
        }
    },
    {
        id: 122,
        content: PROMPTS.memory,
        response: (message, bot, registry) => {
            bot.openai.getMemory(message);
        }
    },
    {
        id: 124,
        content: PROMPTS.memory_access,
        response: (message, bot, registry) => {
            bot.openai.lookUpOrSetMemory(message);
        }
    },
    {
        id: 125,
        content: PROMPTS.dbEdit,
        response: (message, bot, registry) => {
            bot.openai.dbEdit(message);
        }
    }
];
