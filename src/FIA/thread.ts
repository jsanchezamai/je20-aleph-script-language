import { Runtime } from "./engine/kernel/runtime";
import { iFIA } from "./genesis-block";
import { i18 } from "./i18/labels";

import * as http from "http";

export function systemMessage(message: string) {
    return `${i18.ME_LABEL}> ${message}`;
}

export function agentMessage(agent: string, message: string) {
    return `${agent}> ${message}`;
}

export function menuOption(message: string) {
    return `\t - ${message}`;
}

const host = 'localhost';
const port = 8000;

const requestListener =  (req, res) => {
    res.writeHead(200);

    res.end("My first server!");
};

const server = http.createServer(requestListener);

server.on('error', (e) => {

  // Handle Error
  console.log(console.log("Thread Handle Error:", systemMessage(e.message)));

});
server.listen(port, async () => {

    console.log(systemMessage(i18.SISTEMA.STARTING_LABEL));

    const rt = new Runtime();
    rt.start();
    await rt.demo();

});



