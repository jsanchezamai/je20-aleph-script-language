"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuOption = exports.agentMessage = exports.systemMessage = void 0;
const runtime_1 = require("./engine/kernel/runtime");
const labels_1 = require("./i18/labels");
const http = __importStar(require("http"));
function systemMessage(message) {
    return `${labels_1.i18.ME_LABEL}> ${message}`;
}
exports.systemMessage = systemMessage;
function agentMessage(agent, message) {
    return `${agent}> ${message}`;
}
exports.agentMessage = agentMessage;
function menuOption(message) {
    return `\t - ${message}`;
}
exports.menuOption = menuOption;
const host = 'localhost';
const port = 8000;
const requestListener = (req, res) => {
    res.writeHead(200);
    res.end("My first server!");
};
const server = http.createServer(requestListener);
server.on('error', (e) => {
    // Handle Error
    console.log(console.log("Thread Handle Error:", systemMessage(e.message)));
});
server.listen(port, async () => {
    console.log(systemMessage(labels_1.i18.SISTEMA.STARTING_LABEL));
    const rt = new runtime_1.Runtime();
    rt.start();
    await rt.demo();
});
