"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alternativa = exports.CKNivelContextual = exports.FormularioOTA1 = void 0;
const modelo_1 = require("../../../../../mundos/modelo");
const estudio_1 = require("../../../estudio");
const agente_1 = require("../modelos/agentes/agente");
const organizacion_1 = require("../modelos/organizacion/organizacion");
const tarea_1 = require("../modelos/tareas/tarea");
const formulario_1 = require("./formulario");
class FormularioOTA1 extends formulario_1.Formulario {
    constructor() {
        super(...arguments);
        this.nombre = "OTA-1";
    }
    comoValoracion() {
        return this;
    }
}
exports.FormularioOTA1 = FormularioOTA1;
class CKNivelContextual {
    constructor() {
        this.organizacion = new organizacion_1.Organizacion();
        this.tareas = new tarea_1.Tarea();
        this.agentes = new agente_1.Agente();
        this.formularios = () => {
            return [
                ...this.organizacion.formularios,
                ...this.tareas.formularios,
                ...this.agentes.formularios
            ];
        };
    }
    estudioViabilidad(m) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo = m;
        this.organizacion
            .formularios
            .forEach(formulario => estudio.estudiar(formulario));
        const alternativa = new Alternativa();
        alternativa.organizacion = this.organizacion;
        return [alternativa];
    }
    estudioImpactoYMejoras(a) {
        let estudio = new estudio_1.Estudio();
        estudio.modelo = new modelo_1.Modelo();
        estudio
            .modelo
            .dominio
            .base = a.map(alt => {
            return {
                alternativa: alt
                    .organizacion
                    .formularios
                    .map(f => f.dominio)
            };
        });
        [
            ...this.tareas.formularios,
            ...this.agentes.formularios
        ]
            .forEach(formulario => estudio.estudiar(formulario));
        return {
            ...this,
            conclusiones: this.conclusiones
        };
    }
    recursos() {
        return this.organizacion
            .formularios
            .map(f => f.dominio.base['common-kads.recursos']);
    }
    conclusiones() {
        const estudio = new estudio_1.Estudio();
        const ota = new FormularioOTA1();
        estudio.estudiar(ota);
        this.formularios()
            .reduce((ota, f) => {
            estudio.estudiar(f);
            ota.dominio.base[estudio_1.Estudio.claveDominio].push(f);
            return ota;
        }, ota);
        return ota;
    }
}
exports.CKNivelContextual = CKNivelContextual;
class Alternativa extends CKNivelContextual {
    constructor() {
        super(...arguments);
        this.nombre = "alternativa";
    }
}
exports.Alternativa = Alternativa;
