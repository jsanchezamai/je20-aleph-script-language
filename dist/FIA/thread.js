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
const runtime_1 = require("./engine/kernel/runtime");
const aleph_script_i18_1 = require("./i18/aleph-script-i18");
const http = __importStar(require("http"));
const systemMessage_1 = require("./systemMessage");
const host = 'localhost';
const port = 8000;
const requestListener = (req, res) => {
    res.writeHead(200);
    res.end("My first server!");
};
const server = http.createServer(requestListener);
server.on('error', (e) => {
    // Handle Error
    console.log(console.log("Thread Handle Error:", (0, systemMessage_1.systemMessage)(e.message)));
});
server.listen(port, async () => {
    console.log((0, systemMessage_1.systemMessage)(aleph_script_i18_1.i18.SISTEMA.STARTING_LABEL));
    const rt = new runtime_1.Runtime();
    rt.start();
    await rt.demo();
});
