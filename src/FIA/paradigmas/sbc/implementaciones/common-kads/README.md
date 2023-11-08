# La metodología CommonKADS

[CommonKADS](https://commonkads.fnwi.uva.nl/) es evolución de KADS: Knowledge Acquisition and Design Structuring.

![](./docs/commonkads_tooling.gif)

De la página oficial:

(...) CommonKADS places the emphasis on the early stages of system development. Once you have a detailed specification of a knowledge model, CommonKADS provides you with a clear route to implementation. (...)

Técnicas de especificación de requisitos y análisis de objetivos propias de la Ingeniería del Software adaptadas a la la Ingeniería del Conocimiento. Por otro lado, propone modelos de representación del conocimiento completos con el objetivo de favorecer la reutilización en diferentes sistemas y da la spautas para transformar estos modelos en un sistema implementado.

## FIA SBC CommonKADS
Dados 6 [modelos](./modelos/) que se definirán como conjuntos de [Formularios](./nivel/formulario.ts):

- [Agentes](./modelos/agentes)
- [Organización](./modelos/organizacion)
- [Conocimiento](./modelos/conocimiento)
- [Comunicacion](./modelos/comunicacion)
- [Tareas](./modelos/tareas)
- [Diseño](./modelos/disenyo)

CommonKADS procede en 3 niveles consecutivos:

- [Nivel Contextual](./nivel/nivel-contextual.ts)
- [Nivel Conceptual](./nivel/nivel-conceptual.ts)
- [Nivel Artefactual](./nivel/nivel-artefactual.ts)

... generando un [Sistema](./sistema.ts) con [aplicaciones](./modelos/disenyo/aplicacion.ts) ejecutables.

La fase conceptual usa [CML](./nivel/cml.ts) y [UML](./modelos/conocimiento/uml.ts) como lenguajes de modelado:

- Conceptual Modeling Language (CML): es un lenguaje de representación que disocia "dominio" de "tareas de inferencia".

Resultado de este directorio, agregamos la [FIA_SBC_COMMON_KADS](fia-sbc-ck.ts) que usará una instancia [CK](./common-kads.ts) para lanzar aplicacióndummy:

```ts
export class FIA_SBC extends GenesisBlock implements iFIA {

    i18 = AS_SBC_I18;

    nombre = this.i18.NOMBRE;

    async instanciar(): Promise<string> {

        return new Promise(async (resolve, reject) => {

            console.log(agentMessage(this.nombre, this.i18.CABECERA));
            try {
                const ck = new SBC_CK();
                const resultado = await ck.instanciar();

                resolve(resultado);

            } catch(ex) {

                reject(ex.message);

            }
            console.log(agentMessage(this.nombre, this.i18.PIE));

        });

    }
}
```