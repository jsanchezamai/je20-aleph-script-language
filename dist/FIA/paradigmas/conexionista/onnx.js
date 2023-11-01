"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversorRedesNeuronales = exports.Backend = void 0;
const onnxruntime_web_1 = require("onnxruntime-web");
// import * as ort from 'onnxruntime-web/webgpu';
/*

https://onnxruntime.ai/docs/get-started/with-javascript.html

https://github.com/microsoft/onnxjs/blob/master/docs/migration-to-ort-web.md

https://github.com/microsoft/onnxruntime-inference-examples/tree/main/js

https://github.com/microsoft/onnxruntime-inference-examples/tree/main/js/quick-start_onnxruntime-node


load from ArrayBuffer/Uint8Array:
    - this is supported in both ONNX.js and ONNX Runtime Web. Just replace the URL string in the example above by a Uint8Array instance and it will work.
startProfiling() and endProfiling():
    - they are supported in both ONNX.js and ONNX Runtime Web.
*/
var Backend;
(function (Backend) {
    Backend["webgl"] = "webgl";
    Backend["wasm"] = "wasm"; // WebAssembly
})(Backend || (exports.Backend = Backend = {}));
/**
 * Cualquier (o la mayoría de modelos Red de Neuronal puede importarse a través
 * del conversor onnx)
 */
class ConversorRedesNeuronales {
    constructor() {
        this.opciones = {
            executionProviders: [Backend.webgl],
        };
        this.modelo_onnx = "https://example.com/models/myModel.onnx";
    }
    async iniciar() {
        const session = await onnxruntime_web_1.InferenceSession.create(this.modelo_onnx, this.opciones);
    }
}
exports.ConversorRedesNeuronales = ConversorRedesNeuronales;
