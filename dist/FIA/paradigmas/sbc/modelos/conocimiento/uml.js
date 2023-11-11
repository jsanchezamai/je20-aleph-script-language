"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UML = void 0;
const dominio_1 = require("../../../../mundos/dominio");
const modelo_1 = require("../../../../mundos/modelo");
class UML {
    constructor() { }
    modelar(f) {
        const modelo = new modelo_1.Modelo();
        const dominio = new dominio_1.Dominio(modelo);
        dominio.base["Common.Kads.uml"] = {};
        const inferencias = [];
        const tareas = [];
        return {
            dominio,
            inferencias,
            tareas
        };
    }
}
exports.UML = UML;
