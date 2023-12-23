import { Runtime } from "./engine/kernel/runtime";
import { i18 } from "./i18/aleph-script-i18";

import * as http from "http";
import { systemMessage } from "./systemMessage";
import { PC1, PC2 } from "./aplicaciones/cadena/simbolica/mock-base-experta";
import { CabeceraPC } from "./paradigmas/simbolica/modelos/formal/sistema/base-experta/dominio/Cabecera";
import { Aferencia, CargadorBaseExperta as CargadorBaseExperta } from "./paradigmas/simbolica/modelos/formal/sistema/base-experta/cargador";

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

    const procesador = new CargadorBaseExperta({
      cabecera: CabeceraPC,
      lineas: [PC1, PC2],
      red: null
    });

    const GuidSensor = "temperatura";
    const Lectura = 50;

    const estado: Aferencia = {
      GuidSensor,
      Lectura
    }
    procesador.aferencia(estado);

    const rt = new Runtime();
    rt.start();
    await rt.demo();

});



