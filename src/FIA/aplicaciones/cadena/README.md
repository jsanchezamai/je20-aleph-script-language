# App: Simulación "cadena de montaje" (con lenguaje AlephScript)

Contenido del documento:

- Logs: "Entrada al sistema"
- Diseño de la aplicación
   - La app y las FIAs
   - AlephScript i18 "internacionalización"
- Logs "Arrancando la aplicación"
- Mundo
- **Primera FIA: Situada**. Gemelo digital de la cinta transportadora
   - El autómata y la máquina de estados
   - La máquina de estados
   - El autómata
   - Una FIA Situada con un autómata y una máquina de estados
   - Cadena de producción: la cinta transportadora
- Logs "El motor de la cinta de transporte, FIA Situada"

- **Segunda FIA: Simbólica**. Red semántica de la cadena de producción
   - Modelo semántico de la cadena de producción: entidades
   - Arcos Estructurales: de instancia, subclase y parte
   - Arcos Descriptivos
   - La red semántica
- Logs "FIA Simbolica arrancando..."
   - Logs "FIA Simbolica creando el grafo a partir del dominio..."
- Logs FIASimbolicaFormalRedSemantica.imprimir()
- Logs "FIA Simbolica creando el grafo a partir del dominio..."

Usando varios tipos de IA conjugados, la [modelización de la cadena](modelo[) situada en el contexto de [un mundo](mundo), permitirá instanciar 1 o n objetos de:
- [IA Situada](./situada), para modelar IAs como [autómatas](./situada/cadena-automata.ts) (máquina de [estados](./situada/cadena-estado.ts)) con aferencia/eferencia (suscriptores/publicadores) desde/hacia el [mundo](./mundo/cadena-mundo.ts).
- [IA Simbolica](./simbolica), para representar el negocio de la aplicación mediante [redes semánticas](./simbolica/formal/cadena-fia-red-semantica.ts), marcos...
- [IA Conexionista](./conexionista), para acoplar modelos pre-entrenados [redes neuronales](./conexionista/cadena-fia-red-neuronal.ts) bayesianas.

El producto mínimo viable no implementa toda la funcionalidad (Ver bajo enunciado).

## Logs: "Entrada al sistema"

```
[INFO] 16:42:00 ts v. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.2.2)
sistema> Arrancando el sistema
sistema> Cargando FIAs disponibles, por favor espera...
sistema> Escoge:
	 - [0]: Modelo: FIA
	 - [1]: Modelo: FIA_Genesis
	 - [2]: Modelo: debil
	 - [3]: Modelo: fuerte
	 - [4]: Modelo: simbolica
	 - [5]: Modelo: situada
	 - [6]: Modelo: conexionista
	 - [7]: Modelo: cadena-app                      <----------- Escoger app
	 - [99]: Not today! ¡Cerrar!, please, bye!
Escribe: _
```

## Diseño de la aplicación

### La app y las FIAs

La creación de una aplicación en lenguaje AlephScript pasa por **extender la [clase App](../../engine/apps/app.ts)** y preparar la carga de las FIAs necesarias creando una [App propia: "Cadena"](./cadena-app.ts).

```ts
import { i18 } from "../../i18/labels";
import { agentMessage } from "../../thread";
import { App } from "../../engine/apps/app";

// import { CadenaFIASituada } from "./situada/cadena-fia-situada";
// import { CadenaFIARedSemantica } from "./simbolica/formal/cadena-fia-red-semantica";
// import { CadenaFiaRedNeuronal } from "./conexionista/cadena-fia-red-neuronal";


export class CadenaApp extends App {

   runAsync: true;

   constructor() {
      super();
      this.nombre = i18.APPS.CADENA.NOMBRE;
   }

   async instanciar(): Promise<string> {

      console.log(agentMessage(this.nombre, i18.APPS.CADENA.SIMULATION_START));

      /**
      * APLICACIÓN PARA EL ESTUDIO DEL APRENDIZAJE INTELIGENTE
      *
      */

      // this.situada = new CadenaFIASituada();
      // this.simbolica = new CadenaFIARedSemantica();
      // this.conexionista = new CadenaFiaRedNeuronal();

      const salidas = await Promise.all(
         [
               // this.situada.instanciar(),
               // this.simbolica.instanciar(),
               // this.conexionista.instanciar()
         ]
      );

      return `${salidas.join("\n\t - ")}${i18.APPS.CADENA.SIMULATION_END}`;
   }
}
```

### AlephScript i18 "internacionalización"

AlephScript usa un patron JSON para todos los **textos sensibles de internacionalización**. A parte de importar las [traducciones de AlephScript-i18](../../i18/aleph-script-i18.ts), nuestra aplicación inicializa una raíz para su espacio de traducciones: [cadena-app-i18](./cadena-app-i18.ts).

Igualmente, las traducciones i18 de todas FIAs que se programen en la aplicación deberán estar enlazadas a este nodo raíz, por ejemplo:

```ts
import { CADENA_MUNDO_i18 } from "./mundo/cadena-mundo-i18";
import { CADENA_SITUADA_i18 } from "./situada/cadena-situada-i18";
import { CADENA_SIMBOLICA_i18 } from "./simbolica/cadena-simbolica-i18";
import { CADENA_CONEXIONISTA_i18 } from "./conexionista/cadena-conexionista-i18";

export const APP_CADENA_i18 = {

   CADENA: {

      NOMBRE: "cadena-app",

      SIMULATION_START: "Modelización cadena de producción. ¡Arrancando simulación!",
      SIMULATION_BODY: "Modelo resultante",
      SIMULATION_END: "¡La aplicación ha concluído y se cierra!",

      TEST: {
         PROBAR_START_LABEL: "¡Arrancando secuencia de pruebas!",
         PROBAR_END_LABEL: "¡La secuencia de pruebas ha concluído!",

         CASO: {
               START_LABEL: "\n\t - Lanzando caso: ",
               BODY_LABEL: "\n\t - Evaluando caso: ",
               END_LABEL: "\n\t - Resultado caso: ",

               BUCLE: {
                  CREAR_REGLA_LABEL: "Creada regla:"
               }
         }

      },

      ...CADENA_MUNDO_i18,

      ...CADENA_SITUADA_i18,
      ...CADENA_SIMBOLICA_i18,
      ...CADENA_CONEXIONISTA_i18
   }
}
```

## Logs "Arrancando la aplicación"

```
[INFO] 16:42:00 ts v. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.2.2)
sistema> Arrancando el sistema
sistema> Cargando FIAs disponibles, por favor espera...
sistema> Escoge:
	 - [0]: Modelo: FIA
	 - [1]: Modelo: FIA_Genesis
	 - [2]: Modelo: debil
	 - [3]: Modelo: fuerte
	 - [4]: Modelo: simbolica
	 - [5]: Modelo: situada
	 - [6]: Modelo: conexionista
	 - [7]: Modelo: cadena-app                      <----------- Escogida app
	 - [99]: Not today! ¡Cerrar!, please, bye!
Escribe: 7

sistema> Transfiriendo el prompt a: cadena-app
cadena-app> Modelización cadena de producción. ¡Arrancando simulación!
cadena-app> ¡La aplicación ha concluído y se cierra!
```

## Mundo

En AlephScript se añade un mundo a la aplicación **[instanciando la clase Mundo](../../mundos/mundo.ts)**. Cualquier actividad de la aplicación transcurrirá asociada a un Mundo, que, para esta aplicación, **sin originalidad, puede llamarse [CadenaMundo](./mundo/cadena-mundo.ts)**. Y tendrá todos sus textos internacionalizados en su nodo de **traducciones** [cadena-mundo-i18](./mundo/cadena-mundo-i18.ts). Por definición:

- Un mundo es un contexto con un tiempo de ejecución circadiano. Contexto compartido por todas las FIAs. Único para la aplicación. Los mundos, con estructura fractal, pueden expandirse internamente.

La simulación de esta aplicación considera **un contexto circadiano donde ubicar los gemelos digitales de la cadena de producción: operadores, máquinas, unidades de producción, la propia cinta, iluminación y otras condiciones de climatización**. Una primera aproximación al concepto de mundo apropiado para la aplicación cadena de producción podría ser determinar **una nave industrial** donde se ubica. A partir de esta determinación, podrá configurarse un modelo que represente la concreción de la cadena.

El mundo tendrá la responsabilidad de **emitir su pulso y publicar su estado**; así como **recibir actualizaciones del mismo**.

En lo concerniente al **mantenimiento del estado**, la aplicación necesitará que se habilite una cadena de bloques [no implementado] para funcionalidad de trazabilidad modo *history*. Será interesante para un operador regresar sobre el histórico para comprender o analizar el tráfico en la cadena de producción. El mundo será responsable de mantener su propia blockchain así como identificarse en la blockchain que la invocó, la de las FIAs a partir del [FIA GenesisBlock](../../genesis-block.ts).

**NOTA:** PUNTO: **APRENDIZAJE**: 

- Será objetivo de esta aplicación usar las **cadenas de bloques**, el histórico, para "enseñar" en el entrenado de FIAs que, con posterioridad, nazcan o aterricen en el mundo. Este proceso de entrenamiento en tiempo de ejecución supondría que **un Mundo le entrega una cadena de bloques a una FIA para inicializarlo**, y así invocarlo en su interior con un aprendizaje. La FIA procesa la cadena-de-bloques desplegando la información contenida transformándola en su pauta de configuración, puesta en marcha y ciclo de funcionamiento.

## Primera FIA: Situada. Gemelo digital de la cinta transportadora

Acometida, en los pasos anteriores, la creación de una app, es posible agregar tantas FIAs como se requieran para la solución. Por su **sencillez a la par que versatilidad, las FIAs Situadas** son candidato principal para comenzar a construir el sistema.

Para crear un [autómata](./situada/cadena-automata.ts) situado (aferente/eferente), **en AlephScript se instancia la clase [FIASituada](../../paradigmas/situada/fia-situada.ts)**. Funcionando como **máquina de estados**, esta FIA inicializa un Mundo y se suscribe al ciclo circadiano. A cada pulso del ciclo, hará una **transición gestionando el motor de la cinta transportadora** según se especifique en la [definición de estados](./situada/cadena-estado.ts).

```ts
export enum CadenaEstados {
   PARADA = "PARADA",
   ARRANCAR = "ARRANCAR",
   AVANZAR = "AVANZAR",
   PARAR = "PARAR",
   FUERA_SERVICIO = "FUERA_SERVICIO"
}
```

### El autómata y la máquina de estados

En AlephScript se extiende la clase [EstadoT<T>](../../paradigmas/situada/estado.ts) y se implementa la **función de transición** según la conveniencia de la lógica de negocio. En esta transición, el mundo envía y recibe una instantánea o un fragmento de su modelo. El autómata puede entonces mutarlo antes de devolverlo. 

Por ejemplo, la **función de transición** dummy del [Autómata](../../paradigmas/situada/automata.ts) base de AlephScript es una transición por defecto de pulso:

```ts
export class Automata<T> implements IAutomataT<T> {

// (...)

    async inicializar() {

      this.mundo.eferencia.subscribe((m) => {

         console.log(agentMessage(this.nombre,
            i18.SITUADA.AUTOMATA.RECEPCION_AFERENCIA_LABEL));

         /**
         * Procesar aferencia: Modelo (m)
         * */

         const aferencia = new EstadoT<T>(m.modelo);

         /**
         * Ejecución de las transiciones de ciclo
         * */
         this.estado.transicion(aferencia);

         this.mundo.modelo = this.estado.comoModelo();

         /**
         * Lanzar eferencia de regreso al mundo
         * */
         console.log(agentMessage(this.nombre,
            i18.SITUADA.AUTOMATA.ENVIO_EFERENCIA_LABEL));
         this.eferencia.next(this.mundo);

      });

      // Invocación génesis...
      // pone en marcha al mundo (o se suma si no estaba parado)
      // queda esperando a que el mundo complete la promesa await
      // escuchando en el observable de arriba.
      await this.mundo.ciclo();
   }

}
```

### La máquina de estados

Como se vio en el punto anterior, el autómata ejecutará la función de transición del estado en curso. Esta misma [**función de transición**](./situada//cadena-estado.ts) escrita para la aplicación de la cadena, **codificaría los estados de la cinta transportadora** arriba enumerados.

A continuación se ejemplifica una dummy **función de transición**. La máquina de estados gemelo digital del motor de la cinta transportadora pasará por los distintos estados mediante una estructura de flujo de tipo SWITCH.

**Nota**: no se aconseja agregar la lógica de negocio en el switch de estado. La FIA Situada ofrece rxjs pub/sup event-driven para recibir las actualizaciones en otros componentes. La FIA Situada ejecuta **Promise.all** para que **todos los consumidores procesen la aferencia y devuelvan su transición del modelo para la eferencia**; la lista de actualizaciones será devuelta sin o con transformación (concat, merge, accum,...) al mundo.

```ts
export class CadenaEstado<CadenaEstados> extends EstadoT<CadenaEstados> {

   modelo: CadenaModelo;

   transicion(): void {

      switch(this.modelo.motor) {
         case CadenaEstados.PARADA:
            this.modelo.motor = CadenaEstados.ARRANCAR;
            break;
         case CadenaEstados.ARRANCAR:
            this.modelo.motor = CadenaEstados.AVANZAR;
            break;
         case CadenaEstados.AVANZAR:

            /**
             * Procesar la aferencia
             **/

            // La cinta trabajará con la luz apagada la primera mitad del día
            // y con la luz encendida la segunda.
            const iluminacion = this.modelo.dia % 2 == 0;

            /**
             *  Construir la eferencia
             **/
            this.modelo.posicion++;
            this.modelo.iluminacion = iluminacion;

            /**
             * Construir la condición de salida
             **/

            // El autómata detendrá la simulación
            // con tiempo de parar la máquina;
            // teniendo en cuenta el tiempo de arranque y de parada
            const tiempoArranque = 2;
            const tiempoParada = 2;
            if (this.modelo.posicion === (
               this.modelo.muerte - tiempoArranque - tiempoParada
            )) {
               this.modelo.motor = CadenaEstados.PARAR;
            }

            break;
         case CadenaEstados.PARAR:
            this.modelo.posicion = 0;
            this.modelo.iluminacion = false;
            this.modelo.motor = CadenaEstados.FUERA_SERVICIO;
            break;
         default:
            this.modelo.iluminacion = false;
            this.modelo.motor = CadenaEstados.PARADA;
         }
      }
   }
}
```

### El autómata

Instanciando la [clase Automata](../../paradigmas/situada/automata.ts) se ha creado [uno para la FIA Situada](./situada/cadena-automata.ts), autómata para manejar los estados del motor de la cinta en la cadena de producción.

Este autómata será creado de tipo T "[CadenaEstados](./situada/cadena-estado.ts)" con la especificación particular de los estados por los que transita el motor de la cinta.

A partir de los elementos de arriba, el [autómata](./situada/cadena-automata.ts) de la aplicación podrá inicializar creando (o a partir de) un [mundo](./mundo/cadena-mundo.ts) [nótese: compartido con el resto de FIAs de la aplicación]. Mundo a su vez, que tendrá un [modelo](./modelo/cadena-modelo.ts) mutable en el proceso aferencia/eferencia.

```ts
export class CadenaAutomata<CadenaEstados> extends Automata<CadenaEstados> {

   nombre = i18.APPS.CADENA.SITUADA.AUTOMATA.NOMBRE;

   configurar(): void {

      this.mundo = new CadenaMundo();
      this.mundo.modelo = new CadenaModelo();
      this.mundo.nombre = i18.APPS.CADENA.SITUADA.NOMBRE;
      this.mundo.modelo.muerte = TOPE_POSICION;

      this.estado = new CadenaEstado<CadenaEstados>(this.mundo.modelo);

      this.nombre = i18.APPS.CADENA.SITUADA.AUTOMATA.NOMBRE;

      super.configurar();

   }
}
```

### Una FIA Situada con un autómata y una máquina de estados 

Una vez armada la inteligencia de la aplicación, podemos completar una FIA Situada, gemelo digital del motor de la cinta de producción, que, al inicializarse, instancie al autómata, que este instancia un mundo nuevo (en otros casos podría entregársele uno creeado), y arranque su ciclo circadiano.

```ts
export class CadenaFIASituada extends FIASituada implements IFIASituada {

   nombre = i18.APPS.CADENA.SITUADA.NOMBRE;
   runAsync = true;

   /**
    * Definición de la máquina de estados
    */
   automata = new CadenaAutomata<CadenaEstados>();

   async instanciar(): Promise<string> {

      console.log(agentMessage(this.nombre, i18.SITUADA.SIMULATION_START));

      /**
       * Autómata que representa la cinta transportadora de la cadena de producción
       */
      this.automata.configurar();
      await this.automata.inicializar();

      console.log(
            agentMessage(this.nombre,
            `${i18.SITUADA.SIMULATION_BODY}:${this.automata.mundo.modelo.imprimir()}`)
      );
      console.log(i18.SISTEMA.ENTER_PARA_SEGUIR);
      return `${i18.SITUADA.SIMULATION_END}`;
   }
}

```

### Cadena de producción: la cinta transportadora

El último paso, antes de regresar a la consola para ejecutar la aplicación, consistirá en agregar la nueva FIA Situada a la piscina de promesas de la app.

```ts
import { i18 } from "../../i18/aleph-script-i18";
import { agentMessage } from "../../thread";
import { App } from "../../engine/apps/app";

import { CadenaFIASituada } from "./situada/cadena-fia-situada";
// import { CadenaFIARedSemantica } from "./simbolica/formal/cadena-fia-red-semantica";
// import { CadenaFiaRedNeuronal } from "./conexionista/cadena-fia-red-neuronal";


export class CadenaApp extends App {

   runAsync: true;

   constructor() {
      super();
      this.nombre = i18.APPS.CADENA.NOMBRE;
   }

   async instanciar(): Promise<string> {

      console.log(agentMessage(this.nombre, i18.APPS.CADENA.SIMULATION_START));

      /**
      * APLICACIÓN PARA EL ESTUDIO DEL APRENDIZAJE INTELIGENTE
      *
      */

      this.situada = new CadenaFIASituada();
      // this.simbolica = new CadenaFIARedSemantica();
      // this.conexionista = new CadenaFiaRedNeuronal();

      const salidas = await Promise.all(
         [
               this.situada.instanciar(),
               // this.simbolica.instanciar(),
               // this.conexionista.instanciar()
         ]
      );

      return `${salidas.join("\n\t - ")}${i18.APPS.CADENA.SIMULATION_END}`;
   }
}
```

## Logs "El motor de la cinta de transporte, FIA Situada"

```
sistema> Transfiriendo el prompt a: cadena-app
cadena-app> Modelización cadena de producción. ¡Arrancando simulación!
cadena.situada> Hola soy un autómata situado. Voy a ejemplificar mi forma de razonar. 
...Para ello operaré un serie de pasos recibiendo señales con mis sensores y enviando acciones.
cadena.situada> ¡Mundo iniciado!
cadena.situada> Hoy es el día: 1
cadena.situada.automata> El mundo envía una aferencia. Voy a realizar la transición de estado.
cadena.situada.automata> ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
cadena.situada> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 1
                 -muerte: 6
                 -pulso: 1000
                 -posicion: 0
                 -iluminacion: false
                 -motor: PARADA
cadena.situada> Hoy es el día: 2
cadena.situada.automata> El mundo envía una aferencia. Voy a realizar la transición de estado.
cadena.situada.automata> ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
cadena.situada> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 2
                 -muerte: 6
                 -pulso: 1000
                 -posicion: 0
                 -iluminacion: false
                 -motor: ARRANCAR
cadena.situada> Hoy es el día: 3
cadena.situada.automata> El mundo envía una aferencia. Voy a realizar la transición de estado.
cadena.situada.automata> ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
cadena.situada> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 3
                 -muerte: 6
                 -pulso: 1000
                 -posicion: 0
                 -iluminacion: false
                 -motor: AVANZAR
cadena.situada> Hoy es el día: 4
cadena.situada.automata> El mundo envía una aferencia. Voy a realizar la transición de estado.
cadena.situada.automata> ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
cadena.situada> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 4
                 -muerte: 6
                 -pulso: 1000
                 -posicion: 1
                 -iluminacion: true
                 -motor: AVANZAR
cadena.situada> Hoy es el día: 5
cadena.situada.automata> El mundo envía una aferencia. Voy a realizar la transición de estado.
cadena.situada.automata> ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
cadena.situada> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 5
                 -muerte: 6
                 -pulso: 1000
                 -posicion: 2
                 -iluminacion: false
                 -motor: PARAR
cadena.situada> Hoy es el día: 6
cadena.situada.automata> El mundo envía una aferencia. Voy a realizar la transición de estado.
cadena.situada.automata> ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
cadena.situada> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 6
                 -muerte: 6
                 -pulso: 1000
                 -posicion: 0
                 -iluminacion: false
                 -motor: FUERA_SERVICIO
cadena.situada> ¡Mundo acabado!
cadena.situada> Modelo resultante.
:nombre: Cadena de producción
                 -dia: 6
                 -muerte: 6
                 -pulso: 1000
                 -posicion: 0
                 -iluminacion: false
                 -motor: FUERA_SERVICIO
PULSA ENTER PARA CONTINUAR 
```

## Segunda FIA: Simbolica. Red semántica de la cadena de producción

AlephScript permite superponer tantas FIAs como sea necesario para cubrir la solución. En el presente tutorial, agregaremos [una segunda inteligencia artificial](./simbolica/cadena-fia-simbolica.ts), en este caso, para modelizar el problema con una [red semántica](./simbolica/formal/cadena-fia-red-semantica.ts).

Crearemos una instancia de [FIA Simbolica](../../paradigmas/simbolica), de modelo [Formal](../../paradigmas/simbolica/modelos/formal), que implementa un sistema representacional de [Red Semántica](../../paradigmas/simbolica/modelos/formal/sistema/semantica/).

Por definición: una [red remántica](../../paradigmas/simbolica/modelos/formal/sistema/semantica/red) es un [grafo dirigido](../../paradigmas/simbolica/modelos/formal/sistema/semantica/grafo.ts) cuyas aristas son [arcos](../../paradigmas/simbolica/modelos/formal/sistema/semantica/arco.ts) con [etiquetas](../../paradigmas/simbolica/modelos/formal/sistema/semantica/etiqueta.ts) que, mediante una [regla](../../paradigmas/simbolica/modelos/formal/sistema/semantica/regla.ts) establecen una relación.

## El modelo semántico de la cadena de producción: entidades

La construcción de la red puede iniciarse fuera del entorno AlephScript. Dado que la red es un cuerpo mutante, se necesita **un lenguaje de etiquetado capaz de codificar la estructura**. La FIA Simbolica leerá la red en lenguaje etiquetado y la venteará dinámicamente para poder lanzar inferencias sobre esa base de conocimiento. Proceso que consistirá en la búsqueda de "caminos" dentro del grafo.

Nota: Para **definir el modelo**, AlephScript en su v. 0000 opta por **JSON, clave/valor** (con posibilidad de que valor sea, a su vez, *clave/valor*). Sería interesante extender la compatibilidad otros lenguaje de etiquetado (xsd, gltf ...).

¿Qué **entidades podrían ser los primeros nodos de una red semántica que modele una nave industrial** dentro de la cual hay una cinta transportadora que mueve unidades-de-trabajo desde el almacén de entrada al almacén de salida; siendo estas unidades interceptadas por PLCs de robots que harán trabajos sobre ellas?

```json
ENTIDADES: {
   robot: "robot",
   objeto: "objeto",
   propiedad: "propiedad",
   cadena: "cadena",
   almacen: "almacen",
   tarea: "tarea",
}
```
AlephScript considera tarea interna de la [FIA Simbolica.Forma.Semantica.Red](./simbolica/formal/cadena-fia-red-semantica.ts) mantener la [descripción de la red en formato i18](./simbolica/formal/cadena-dominio.ts) como traducciones.

La definción del **dominio** deberá registar **entidades** y **arcos**. A su vez, entre estos, **arcos descriptivos** y **estructurales**. Y entre estos, de **parte** o de **subclase** o de **instancia**.

```ts
export const CADENA_DOMINIO_i18 = {

   DOMINIO: {

      ENTIDADES: {
         tarea: "tarea",
         robot: "robot",
         objeto: "objeto",
         propiedad: "propiedad",
         cadena: "cadena",
         almacen: "almacen",
      },
      ARCOS: {
         DESCRIPTIVOS: {},
         ESTRUCTURALES: {
               INSTANCIA: {},
               PARTE: {},
               SUBCLASE: {}
         }
      }
   }
}
```

### Arcos Estructurales: de instancia, subclase y parte

La red de semántica debe definir las naturalezas de las entidades implicadas y relacionarlas entre ellas mediante reglas de **subclase** o de **parte**. Definida la ontología de la red, podrán crearse tantas **instancias** como se requieran.

La aplicación requiere **instanciar** a la cadena de producción (con la cinta transportadora).

Para facilitar la aplicación, definimos una relación dummy de entidades y relaciones:

Mínimo un **almacen de entrada y otro de salida**. Las unidades-de-trabajo serán transportadas de uno a otro almacén por la **cinta**.

Instancia de un **robot reponedor** y quizás otro que saque de la cinta.

Más los robots funcionales apostados en la cinta, que actuarán sobre esas **unidades-de-trabajo** (objetos).

Para el ejemplo, habrá un par de **robots, 1 y 2**, cuya funcionalidad será:

- Criptosellar (agregar una firma a una unidad-de-trabajo).

Otro par de **robots, 3 y 4**, que hagan:

- Parsear los datos que vienen en la unidad-de-trabajo, de hexa a decimal.

Para ello, el dominio definirá...

- cuatro **objetos: 2 parseables, 1 criptosellable**. Y **compuesto** que admite ambas actuaciones.

Los objetos criptosellables necesitarán...

- una **propiedad "cripta"**.

Los parseables:

- una **propiedad "estado"**.

Por último, la red contendrá la información de operativa que permitirá a los distintos FIAs obtener órdenes precisas sobre el estado de la cadena. Definimos Entidades Tarea, y las nombramos según los parámetros que necesiten para ejecutarse. Por ejemplo, AlephScript permite definir: 

- algunas **tareas** tipo, con claves como: "tarea_cadena_robot_objeto"...

... una instancia de este tipo podría ser:

- Un *robot* examina la *cadena* (cinta) y toma un *objeto* de ella cuando localiza una unidad-de-trabajo (*objeto*) afín a sus capacidades.

Nótese: En la actual implementación (en previsión de integrar Marcos en la aplicación) las terminaciones de los pares clave/valor son strings dummy (deberán ser ejecutables).

A continuación se indican los arcos estructurales para la implementación dummy:

(léase: 'clave' es subclase de 'valor')
[CADENA_DOMINIO_i18](./simbolica/formal/cadena-dominio.ts).DOMINIO.ARCOS.ESTRUCTURALES.SUBCLASE...

```json
{
   texto: "<clave> es subclase de <valor>",

   reponedor: { robot: "robot" },
   criptoselladora: { robot: "robot" },
   parseadora: { robot: "robot" },

   objeto_criptosellable: { objeto: "objeto" },
   objeto_parseable: { objeto: "objeto" },

   objeto_compuesto: { objeto: "objeto" }
}
```

(léase: 'clave' tiene la parte: 'valor')
[CADENA_DOMINIO_i18](./simbolica/formal/cadena-dominio.ts).DOMINIO.ARCOS.ESTRUCTURALES.PARTE...

```json
{
   texto: "<clave> tiene la parte: <valor>",
   objeto: {
      propiedad_estado: "propiedad"
   },
   objeto_criptosellable: {
      propiedad_cripta: "propiedad"
   },
   objeto_parseable: {
      propiedad_cadena: "propiedad"
   },
   objeto_compuesto: {
      objeto_parseable: "objeto",
      objeto_criptosellable: "objeto"
   },
   robot: {
      tarea_cadena_robot_objeto: "tarea",
      tarea_robot_objeto: "tarea",
      tarea_robot_objeto_propiedad: "tarea",
   }
}
```
(léase: 'clave' es instancia de 'valor')
[CADENA_DOMINIO_i18](./simbolica/formal/cadena-dominio.ts).DOMINIO.ARCOS.ESTRUCTURALES.INSTANCIA...

```json
{
   texto: "<clave> es instancia de <valor>",

   cadena_1: { cadena: "cadena" },

   almacen_1: { almacen: "almacen" },

   entrada: { almacen: "almacen" },
   salida: { almacen: "almacen" },
   basura: { almacen: "almacen"},

   reponerdor: { reponedor: "reponedor"},

   robot_1: { criptoselladora: "criptoselladora"},
   robot_2: { criptoselladora: "criptoselladora"},

   robot_3: { parseadora: "parseadora"},
   robot_4: { parseadora: "parseadora"},

   objeto_1: { objeto_parseable: "objeto_parseable"},
   objeto_2: { objeto_criptosellable: "objeto_criptosellable"},
   objeto_3: { objeto_parseable: "objeto_parseable"},
   objeto_4: { objeto_compuesto: "objeto_compuesto"},

   propiedad_cripta: { propiedad: "propiedad"},
   propiedad_cadena: { propiedad: "propiedad"},
   propiedad_estado: { propiedad: "propiedad" }
}
```

### Arcos Descriptivos

En esta aplicación, usamos algunas definiciones con arcos descriptivos que permitirán relacionar las tareas con las entidades que participarán en ella. 

Por ejemplo, una FIA Situada que está produciendo en la cadena (**una criptoselladora**) puede consultar la red semántica para saber si **debe o no coger un objeto** que le llega en la cadena de producción. 

La FIA le indicaría a la red semántica sus capacidades y la red le aclararía si el objeto que llega es una tarea válida para sus capacidades. Si existe un camino que salga de la clave y halle todos los valores.

(léase: según el valor de las definiciones.)
[CADENA_DOMINIO_i18](./simbolica/formal/cadena-dominio.ts).DOMINIO.ARCOS.DESCRIPTIVOS...
```json
{
   tarea_cadena_robot_objeto_almacen: {
      parametros: {
         tarea: "",
         cadena: "",
         robot: "",
         objeto: "",
         almacen: ""
      },
      desencadenar: "Tarea: <clave>. Agente <robot>: <tarea> <objeto> entre <almacen> y <cadena>.",
      encadenar: "Tarea: <clave>. Agente <robot>: <tarea> <objeto> entre <almacen> y <cadena>."
   },
   tarea_robot_objeto_almacen:  {
      parametros: {
         robot: "",
         objeto: "",
         almacen: ""
      },
      deshechar: "Tarea: <clave>. Agente <robot>: <tarea>: <objeto> al lugar <almacen>.",
   },
   tarea_robot_objeto_propiedad:  {
      parametros: {
         robot: "",
         objeto: "",
         propiedad: ""
      },
      operar: "Tarea: <clave>. Agente <robot>: <tarea>: <propiedad> de <objeto>",
   }
}
```
### La red semántica

Procediendo de forma homóloga a la primera FIA, instalamos esta nueva FIA en la [app](./cadena-app.ts). Como es habitual, todos los textos se configurarán según requerimientos en el conjunto [cadena-simbolica-i18](./simbolica/cadena-simbolica-i18.ts).

El [método **instanciar** de la FIA](./simbolica/formal/cadena-fia-red-semantica.ts), en **esta aplicación dummy cargará la red a partir del dominio**. Y, a renglón seguido, **lanzará un juego de pruebas dummy**, haciendo inferencias sobre la relación entre las entidades.

```ts
import { i18 } from "../../../../i18/aleph-script-i18";
import { Grafo } from "../../../../paradigmas/simbolica/modelos/formal/sistema/semantica/grafo";
import { RedSemantica } from "../../../../paradigmas/simbolica/modelos/formal/sistema/semantica/red";
import { agentMessage } from "../../../../thread";
import { CadenaFIASimbolica } from "../cadena-fia-simbolica";

export class CadenaGrafo extends Grafo {}

export class CadenaFIARedSemantica extends CadenaFIASimbolica {

    modelo = new RedSemantica();
    nombre = i18.APPS.CADENA.SIMBOLICA.RED.NOMBRE;

    constructor() {

        super();

        const grafo = new CadenaGrafo();

        this.modelo.nombre = i18.APPS.CADENA.SIMBOLICA.SEMANTICA.NOMBRE;
        this.modelo.base = grafo;

    }

    async instanciar(): Promise<string> {

        console.log(agentMessage(this.nombre, i18.APPS.CADENA.SIMBOLICA.SIMULATION_START));

        await this.cargaRed();

        console.log(
            agentMessage(this.nombre, `${i18.APPS.CADENA.SIMULATION_BODY}:${this.imprimir()}`)
        );

        await this.probar();

        return `${i18.APPS.CADENA.SIMBOLICA.SIMULATION_END}`;
    }

    async cargaRed() {

        const red = i18.APPS.CADENA.SIMBOLICA.DOMINIO;
        this.modelo.cargar(red);

    }

    imprimir(): string {}

    async probar(): Promise<void> { /* (...) * /}
}

```

## Logs "FIA Simbolica arrancando..."

Tras escoger la aplicación en el menú de sistema, la consola muestra:

```
sistema> Transfiriendo el prompt a: cadena-app
cadena-app> Modelización cadena de producción. ¡Arrancando simulación!
cadena.simbolica.red> Creando la red semántica...
```

### La creación del Grafo a partir del Dominio

El método cargar de la Red Semántica procesa el dominio e instancia el grafo. En el código siguiente:

red = [CADENA_DOMINIO_i18](./simbolica/formal/cadena-dominio.ts).DOMINIO;

```ts
export class RedSemantica extends Formal implements IRedSemantica {

   entidades: IGrafo[] = [];

   nombre = i18.SIMBOLICA.SEMANTICA.NOMBRE;

   base = new Grafo();
   motor = new MotorInferencia();

   cargar(red: any) {
      const entidades = this.entidades; // árbol a grafo

     /**
      * Añadir entidades maestras
      */
      Object.keys(red.ENTIDADES).forEach(i => { /* (...) */

      /**
      * Añadir entidades del arco "subclase-de"
      */
      Object.keys(red.ARCOS.ESTRUCTURALES.SUBCLASE).forEach(clase_hija => { /* (...) */

      /**
      * Añadir entidades del arco "subclase-de"
      */
      Object.keys(red.ARCOS.ESTRUCTURALES.SUBCLASE).forEach(clase_hija => { /* (...) */

      /**
       * Añadir entidades del arco "instancia-de"
       */
      Object.keys(red.ARCOS.ESTRUCTURALES.INSTANCIA).forEach(clase_hija => { /* (...) */

     /**
      * Añadir entidades del arco "descriptivo"
      */
      Object.keys(red.ARCOS.DESCRIPTIVOS).forEach(clase_padre => {

         /* (...) */

         const relacion = new RelacionDescriptiva();
         relacion.nombre =  new Traductor().crearTextoAyuda(clase_hijo, parametros, etiqueta_texto);;

         const etiqueta = new EtiquetaDescriptiva();
         etiqueta.estado = relacion;

         const arco = new ArcoDescriptivo();
         arco.destino = grafoPadre;
         arco.etiqueta = etiqueta;
         grafoHijo.arcos.estado.push(arco);

         console.log(agentMessage(this.nombre,
            `${i18.APPS.CADENA.SIMBOLICA.AGREGANDO_ARCOS_DESCRIPTIVOS_LABEL}
             ${grafoHijo.nombre}/${grafoPadre.nombre}`

         /* (...) */


     /**
      * Convertir las entidades hoja en hijas de un nodo raíz
      */
      this.base = new Grafo();

      this.entidades.forEach(
         e =>
         {
               const relacion = new RelacionEstructural();

               relacion.nombre =  "relacion.raiz";

               const etiqueta = new EtiquetaEstructural();
               etiqueta.estado = relacion;

               const arco = new ArcoEstructural();
               arco.destino = e;
               arco.etiqueta = etiqueta;
               this.base.arcos.estado.push(arco);
      });

```

## Logs "FIA Simbolica creando el grafo a partir del dominio..."

```
cadena.simbolica.red> Creando la red semántica...
cadena.simbolica.semantica.red> Agregando entidad: tarea
cadena.simbolica.semantica.red> Agregando entidad: robot
cadena.simbolica.semantica.red> Agregando entidad: objeto
cadena.simbolica.semantica.red> Agregando entidad: propiedad
cadena.simbolica.semantica.red> Agregando entidad: cadena
cadena.simbolica.semantica.red> Agregando entidad: almacen
cadena.simbolica.semantica.red> Agregando arco subclase/clase: reponedor/robot
cadena.simbolica.semantica.red> Agregando arco subclase/clase: criptoselladora/robot
cadena.simbolica.semantica.red> Agregando arco subclase/clase: parseadora/robot
cadena.simbolica.semantica.red> Agregando arco subclase/clase: objeto_criptosellable/objeto
cadena.simbolica.semantica.red> Agregando arco subclase/clase: objeto_parseable/objeto
cadena.simbolica.semantica.red> Agregando arco subclase/clase: objeto_compuesto/objeto
cadena.simbolica.semantica.red> Agregando arco parte/clase: tarea_cadena_robot_objeto/robot
cadena.simbolica.semantica.red> Agregando arco parte/clase: tarea_robot_objeto/robot
cadena.simbolica.semantica.red> Agregando arco parte/clase: tarea_robot_objeto_propiedad/robot
cadena.simbolica.semantica.red> Agregando arco parte/clase: propiedad_estado/objeto
cadena.simbolica.semantica.red> Agregando arco parte/clase: propiedad_cripta/objeto_criptosellable
cadena.simbolica.semantica.red> Agregando arco parte/clase: propiedad_cadena/objeto_parseable
cadena.simbolica.semantica.red> Agregando arco parte/clase: objeto_parseable/objeto_compuesto
cadena.simbolica.semantica.red> Agregando arco parte/clase: objeto_criptosellable/objeto_compuesto
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: cadena/cadena_1
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: almacen/almacen_1
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: almacen/entrada
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: almacen/salida
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: almacen/basura
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: reponedor/reponerdor
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: criptoselladora/robot_1
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: criptoselladora/robot_2
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: parseadora/robot_3
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: parseadora/robot_4
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: objeto_parseable/objeto_1
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: objeto_criptosellable/objeto_2
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: objeto_parseable/objeto_3
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: objeto_compuesto/objeto_4
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: propiedad/propiedad_cripta
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: propiedad/propiedad_cadena
cadena.simbolica.semantica.red> Agregando arco instancia hija/padre: propiedad/propiedad_estado
cadena.simbolica.semantica.red> Agregando arco descriptivo destino/origen: desencadenar/tarea_cadena_robot_objeto_almacen
cadena.simbolica.semantica.red> Agregando arco descriptivo destino/origen: encadenar/tarea_cadena_robot_objeto_almacen
cadena.simbolica.semantica.red> Agregando arco descriptivo destino/origen: deshechar/tarea_robot_objeto_almacen
cadena.simbolica.semantica.red> Agregando arco descriptivo destino/origen: operar/tarea_robot_objeto_propiedad
```

### Logs FIASimbolicaFormalRedSemantica.imprimir()

```
cadena.simbolica.red> Modelo resultante:
	 - (grafo) -tarea; arcos
	 - (grafo) -robot; arcos
	 - (grafo) -objeto; arcos
	 - (grafo) -propiedad; arcos
	 - (grafo) -cadena; arcos
	 - (grafo) -almacen; arcos
	 - (grafo) -reponedor; arcos
		 - <reponedor> es subclase de <robot>
	 - (grafo) -criptoselladora; arcos
		 - <criptoselladora> es subclase de <robot>
	 - (grafo) -parseadora; arcos
		 - <parseadora> es subclase de <robot>
	 - (grafo) -objeto_criptosellable; arcos
		 - <objeto_criptosellable> es subclase de <objeto>
		 - <objeto_compuesto> tiene la parte: <objeto_criptosellable>
	 - (grafo) -objeto_parseable; arcos
		 - <objeto_parseable> es subclase de <objeto>
		 - <objeto_compuesto> tiene la parte: <objeto_parseable>
	 - (grafo) -objeto_compuesto; arcos
		 - <objeto_compuesto> es subclase de <objeto>
	 - (grafo) -tarea_cadena_robot_objeto; arcos
		 - <robot> tiene la parte: <tarea_cadena_robot_objeto>
	 - (grafo) -tarea_robot_objeto; arcos
		 - <robot> tiene la parte: <tarea_robot_objeto>
	 - (grafo) -tarea_robot_objeto_propiedad; arcos
		 - <robot> tiene la parte: <tarea_robot_objeto_propiedad>
	 - (grafo) -propiedad_estado; arcos
		 - <objeto> tiene la parte: <propiedad_estado>
		 - <propiedad_estado> es instancia de <propiedad>
	 - (grafo) -propiedad_cripta; arcos
		 - <objeto_criptosellable> tiene la parte: <propiedad_cripta>
		 - <propiedad_cripta> es instancia de <propiedad>
	 - (grafo) -propiedad_cadena; arcos
		 - <objeto_parseable> tiene la parte: <propiedad_cadena>
		 - <propiedad_cadena> es instancia de <propiedad>
	 - (grafo) -cadena_1; arcos
		 - <cadena_1> es instancia de <cadena>
	 - (grafo) -almacen_1; arcos
		 - <almacen_1> es instancia de <almacen>
	 - (grafo) -entrada; arcos
		 - <entrada> es instancia de <almacen>
	 - (grafo) -salida; arcos
		 - <salida> es instancia de <almacen>
	 - (grafo) -basura; arcos
		 - <basura> es instancia de <almacen>
	 - (grafo) -reponerdor; arcos
		 - <reponerdor> es instancia de <reponedor>
	 - (grafo) -robot_1; arcos
		 - <robot_1> es instancia de <criptoselladora>
	 - (grafo) -robot_2; arcos
		 - <robot_2> es instancia de <criptoselladora>
	 - (grafo) -robot_3; arcos
		 - <robot_3> es instancia de <parseadora>
	 - (grafo) -robot_4; arcos
		 - <robot_4> es instancia de <parseadora>
	 - (grafo) -objeto_1; arcos
		 - <objeto_1> es instancia de <objeto_parseable>
	 - (grafo) -objeto_2; arcos
		 - <objeto_2> es instancia de <objeto_criptosellable>
	 - (grafo) -objeto_3; arcos
		 - <objeto_3> es instancia de <objeto_parseable>
	 - (grafo) -objeto_4; arcos
		 - <objeto_4> es instancia de <objeto_compuesto>
	 - (grafo) -tarea_cadena_robot_objeto_almacen; arcos
	 - (grafo) -desencadenar; arcos
		 - Tarea: <desencadenar>. Agente <robot>: <tarea> <objeto> entre <almacen> y <cadena>.
	 - (grafo) -encadenar; arcos
		 - Tarea: <encadenar>. Agente <robot>: <tarea> <objeto> entre <almacen> y <cadena>.
	 - (grafo) -tarea_robot_objeto_almacen; arcos
	 - (grafo) -deshechar; arcos
		 - Tarea: <deshechar>. Agente <robot>: <tarea>: <objeto> al lugar <almacen>.
	 - (grafo) -operar; arcos
		 - Tarea: <operar>. Agente <robot>: <tarea>: <propiedad> de <objeto>
```

### Lanzando inferencias a la red: en busca de un camino

Una vez cargada la red, la FIA Simbolica Red Semantica lanzara un juego de pruebas. El mecanismo  para inferir la red se aplica instanciando la [clase ReglaRed](../../paradigmas/simbolica/modelos/formal/sistema/semantica/regla.ts) que a su vez extiende a la [clase InferenciaRelacion](../../paradigmas/simbolica/modelos/formal/sistema/semantica/regla.ts).

Si la FIA Situada incorporaba un autómata, la FIA Semántica por el momento incluye una cola de reglas en [un motor simple de procesamiento secuencial](src/FIA/paradigmas/simbolica/modelos/formal/sistema/semantica/motor-inferencia.ts): tomar regla de la cola, evaluarla, repetir.

```ts
export class MotorInferencia implements IMotorInferencia {

   reglas: Inferencia[] = []

   arrancar(log: (string) => void): void {

      this.reglas.forEach(regla => {

         const inferencia = regla.evaluar();

         log(inferencia);

      })
   }

   trasDetenerse(log: (string: any) => void): void {
      log("MotorInferencia.Detenido");
   }
}
```

Una implementación simple del proceso test, usaría el método probar de para lanzar casos de prueba:

```ts

import { i18 } from "../../../../i18/aleph-script-i18";
import { Grafo } from "../../../../paradigmas/simbolica/modelos/formal/sistema/semantica/grafo";
import { RedSemantica } from "../../../../paradigmas/simbolica/modelos/formal/sistema/semantica/red";
import { agentMessage } from "../../../../thread";
import { CadenaFIASimbolica } from "../cadena-fia-simbolica";

export class CadenaGrafo extends Grafo {}

export class CadenaFIARedSemantica extends CadenaFIASimbolica {

    modelo = new RedSemantica();
    nombre = i18.APPS.CADENA.SIMBOLICA.RED.NOMBRE;

    constructor() { /* (...) */ }

    async instanciar(): Promise<string> { /* (...) */ }

    async cargaRed() { /* (...) */}

    imprimir(): string { /* (...) */ }

    async probar(): Promise<void> {

        const red = i18.APPS.CADENA.SIMBOLICA.DOMINIO;

        const casos = [];

        await this.modelo.probar(casos);

    }
}

```

Los casos propuestos son:

- ¿Es robot_1 instancia de robot? Esperado: Sí.
- ¿Es robot_1 subclase de criptoselladora? Esperado: Sí
- ¿Es propiedad_cripta parte de objeto_1? Esperado: Sí.
- ¿Puede el robot_1 de la cadena_1 ejecutar la encadenar con id tarea_1 en la que están implicados el objeto_1 y el almacen_1? Esperado: Sí.

```ts
const casos = [
   {
         instancia: {
            robot_1: { robot: "robot" }
         }
   },
   {
         subclase: {
            robot_1: { criptoselladora: "criptoselladora" }
         }
   },
   {
         parte: {
            propiedad_cripta: { objeto_1: "objeto_1" }
         }
   },
   {
         tarea_cadena_robot_objeto: {
            encadenar : {
               tarea_1: "tarea",
               cadena_1: "cadena",
               robot_1: "robot",
               objeto_1: "objeto",
               almacen_1: "almacen"
            }
         }
   }
];

```
Para implementar las reglas, la red semántica transforma los casos en Reglas. Las reglas, por definición, son evaluables. La red deberá asegurar que la regla carga tanto los parámetros de inferencia como el propio dominio semántico.

```ts
export class RedSemantica extends Formal implements IRedSemantica {

   // (...)

    cargar(red: any) { /* // (...) */}

    probar(casos: object[]) {

        return new Promise((resolve, reject) => {

            console.log(agentMessage(this.nombre, `${i18.APPS.CADENA.TEST.PROBAR_START_LABEL}:${""}`));

            /**
             *  Encolado de casos a probar
             * */
            casos.forEach((c, index) => {

                console.log(agentMessage(this.nombre, `${i18.APPS.CADENA.TEST.CASO.START_LABEL}:${index}`));

                const regla = new ReglaRed();
                const parametros = new Dominio(c);

                regla.configurar(this.base, parametros);

                console.log(agentMessage(this.nombre,
                    `${i18.APPS.CADENA.TEST.CASO.BUCLE.CREAR_REGLA_LABEL}:${index} con ${regla.imprimir()}`
                ));

                this.motor.reglas.push(regla);

            });

            /**
             *  Arrancar la cola de inferencias
             * */
            this.motor.arrancar((info) => {
                console.log(
                    agentMessage(this.nombre,
                        `${i18.APPS.CADENA.TEST.CASO.BODY_LABEL}:${info}`));
            });

            /**
             *  Capturar evento de parada
             * */
            this.motor.trasDetenerse(() => {
                console.log(agentMessage(this.nombre, `${i18.APPS.CADENA.TEST.PROBAR_END_LABEL}:${""}`));
                resolve("> forma.sistema.semantica.paradigma.RedSemantica.probar, finalizó con éxito");
            });

            /**
             *  Condición de salida
             * */
            setTimeout(
                () => reject("forma.sistema.semantica.paradigma.RedSemantica.probar, tiempo expirado!")
                , 5000
            );


        });

    }

}
```

Las pruebas se codifican, como es usual mediante JSON. Se procesarán en paralelo.

```
cadena.simbolica.semantica.red> ¡Arrancando secuencia de pruebas!:
cadena.simbolica.semantica.red>
	 - Lanzando caso: :0
cadena.simbolica.semantica.red> Creada regla::0 con "instancia"
cadena.simbolica.semantica.red>
	 - Lanzando caso: :1
cadena.simbolica.semantica.red> Creada regla::1 con "subclase"
cadena.simbolica.semantica.red>
	 - Lanzando caso: :2
cadena.simbolica.semantica.red> Creada regla::2 con "parte"
cadena.simbolica.semantica.red>
	 - Lanzando caso: :3
cadena.simbolica.semantica.red> Creada regla::3 con "tarea_cadena_robot_objeto"

```

La resolución de la regla, pasa por:

- Cargar el domino de la red (grafo)
- Cargar el conjunto de parámetros
- Cargar el grafo semántico
- Operar la búsqueda en el grafo.

```ts

export class ReglaRed extends InferenciaRelacion implements IReglaRed {

    async evaluar(): Promise<IInferencia> {

        const activar = this.activar();

        const tipo = Object.keys(activar.parametros)[0];

        const agentes = Object.keys(activar.parametros[tipo]);

        const sujetos = Object
            .keys(activar.parametros[tipo])
            .map(parametro => activar.parametros[tipo][parametro])
            .map(sujeto => {
                return Object.keys(sujeto);
            })
            .flat();

        const entidades = activar
            .contexto
            .arcos
            .estado
            .map(arco => arco.destino)
            .filter(destino => agentes.concat(sujetos).indexOf(destino.nombre) > -1)
            .flat();

        const traductor = new Traductor();

        console.log(
            i18.SIMBOLICA.SEMANTICA.REGLA + ">",
            i18.SIMBOLICA.SEMANTICA.INFERENCIA
                .replace("<clave>", tipo)
                .replace("<agentes>", agentes.join(" - "))
                .replace("<sujetos>", sujetos.join(" - "))
                .replace("<entidades>", entidades.map(e => e.nombre).join(" - ")),
        );

        switch(tipo) {
            case "instancia":
            case "subclase":
            case "parte":

               /* (...) */

               // Búsquedas ad hoc en el grafo
                break;
            default:


        }
        return this;
    }
}
```
Un ejemplo dummy de búsqueda simple recursiva:

```ts

export class ReglaRed extends InferenciaRelacion implements IReglaRed {

    async evaluar(): Promise<IInferencia> {

        /* (...) */

        switch(tipo) {
            case "instancia":
            case "subclase":
            case "parte":

                const agente = agentes[0];
                const sujeto = sujetos[0];

                console.log(
                    i18.SIMBOLICA.SEMANTICA.REGLA + ">",
                    i18.SIMBOLICA.SEMANTICA.INFERENCIA_NATURAL_LABEL
                        .replace("agente", agente)
                        .replace("sujeto", sujeto)
                        .replace("arco", tipo),
                );

                const busqueda_inicio = entidades.find(e => e.nombre === agente);
                console.log("Empieza la búsqueda en", busqueda_inicio.nombre);

                const camino = [];
                const buscar = await busqueda_inicio.encontrar(sujeto, tipo, camino);

                console.log("Resultado búsqueda:", buscar?.nombre);
                break;
            default:
               //
        }
        return this;
    }
}
```

## Logs (dummys): FIASimbolicaFormalRedSemantica.inferir()

Logs del caso 1:

```ts
const casos = [
   {
         instancia: {
            robot_1: { robot: "robot" }
         }
   }
];
```

Busqueda parcial, logs inválidos:

```
regla.de.red.semantica>
	 - Tipo de inferencia: instancia
	 - agentes: robot_1
	 - sujetos: robot
	 - Entidades: robot - robot_1
regla.de.red.semantica> ¿Existe un camino que lleve desde <robot_1> hasta <robot> pasando por <instancia>
Empieza la búsqueda en robot_1...
      - Avance a nodo criptoselladora...
RelacionEstructural {
  nombre: '<robot_1> es instancia de <criptoselladora>',
  valor: 'instancia'
}
   - Avance a nodo robot...
RelacionEstructural {
  nombre: '<criptoselladora> es subclase de <robot>',
  valor: 'subclase'
}
Fin de rama. El destino: robot fallido.
```

