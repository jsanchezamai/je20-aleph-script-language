# App: Simulación cadena de montaje con inteligencia fundamental de tipo Situada

La aplicación implementa una [IA Situada](src/FIA/paradigmas/situada) para modelar una cadena de montaje.

El producto mínimo viable no implementa toda la funcionalidad (Ver bajo enunciado).

- [Modelo](src/FIA/aplicaciones/cadena/cadena-modelo.ts): define una cinta con n posiciones. Una bombilla (2 estados). Un motor (5 estados).
- [Estado](src/FIA/aplicaciones/cadena/cadena-estado.ts): arranca la máquina, la mantiene funcionando y la detiene.
- [Mundo](src/FIA/aplicaciones/cadena/cadena-mundo.ts): instancia para el tiempo de ejecución.
- [Automata](src/FIA/aplicaciones/cadena/cadena-automata.ts): instanciará el mundo, esperará a su expiración y lo descargará.
- [FIA Situada](src/FIA/aplicaciones/cadena/cadena-fia.ts): implementa la aplicación.


## Log de salida Situada

**sistema>** Escoge:
         - [0]: Modelo: FIA
         - [1]: Modelo: FIA_Genesis
         - [2]: Modelo: debil
         - [3]: Modelo: fuerte
         - [4]: Modelo: simbolica
         - [5]: Modelo: situada (Autómata CP)

**sistema>** Transfiriendo el prompt a: **Autómata CP**
**Autómata CP**> Hola soy un autómata situado. Voy a ejemplificar mi forma de razonar. Para ello operaré un serie de pasos recibiendo señales con mis sensores y enviando acciones.
**Autómata CP**> ¡Mundo iniciado!
**Autómata CP**> Hoy es el día: 1
**situada>** El mundo envía una aferencia. Voy a realizar la transición de estado.
**situada>** ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
**Autómata CP**> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 1
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 0
                 -motor: PARADA
**Autómata CP**> Hoy es el día: 2
**situada>** El mundo envía una aferencia. Voy a realizar la transición de estado.
**situada>** ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
**Autómata CP**> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 2
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 0
                 -motor: ARRANCAR
**Autómata CP**> Hoy es el día: 3
**situada>** El mundo envía una aferencia. Voy a realizar la transición de estado.
**situada>** ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
**Autómata CP**> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 3
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 0
                 -motor: AVANZAR
**Autómata CP**> Hoy es el día: 4
**situada>** El mundo envía una aferencia. Voy a realizar la transición de estado.
**situada>** ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
**Autómata CP**> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 4
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 1
                 -motor: AVANZAR
                 -iluminacion: true
**Autómata CP**> Hoy es el día: 5
**situada>** El mundo envía una aferencia. Voy a realizar la transición de estado.
**situada>** ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
**Autómata CP**> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 5
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 2
                 -motor: AVANZAR
                 -iluminacion: false
**Autómata CP**> Hoy es el día: 6
**situada>** El mundo envía una aferencia. Voy a realizar la transición de estado.
**situada>** ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
**Autómata CP**> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 6
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 3
                 -motor: AVANZAR
                 -iluminacion: true
**Autómata CP**> Hoy es el día: 7
**situada>** El mundo envía una aferencia. Voy a realizar la transición de estado.
**situada>** ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
**Autómata CP**> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 7
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 4
                 -motor: AVANZAR
                 -iluminacion: false
**Autómata CP**> Hoy es el día: 8
**situada>** El mundo envía una aferencia. Voy a realizar la transición de estado.
**situada>** ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
**Autómata CP**> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 8
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 5
                 -motor: PARAR
                 -iluminacion: true
**Autómata CP**> Hoy es el día: 9
**situada>** El mundo envía una aferencia. Voy a realizar la transición de estado.
**situada>** ¡Hecho! Le devuelvo el nuevo estado al mundo con una eferencia.
**Autómata CP**> El mundo ha recibido una eferencia. Actualizando modelo. nombre: Cadena de producción
                 -dia: 9
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 0
                 -motor: FUERA_SERVICIO
                 -iluminacion: false
**Autómata CP**> ¡Mundo acabado!
**Autómata CP**> Modelo resultante:nombre: Cadena de producción
                 -dia: 9
                 -muerte: 9
                 -pulso: 1000
                 -posicion: 0
                 -motor: FUERA_SERVICIO
                 -iluminacion: false
**Autómata CP**> ¡Simulación finalizada!
```

# [x] Implementar demo del autómata en [FIA Situada](src/FIA/paradigmas/situada)

En la versión 0.0.1, el menú da acceso a la FIA Situada:

```
**sistema>** Cargando FIAs disponibles, por favor espera... 
**sistema>** Escoge:
         - [0]: Modelo: FIA
         - [1]: Modelo: FIA_Genesis
         - [2]: Modelo: debil
         - [3]: Modelo: fuerte
         - [4]: Modelo: simbolica
         - [5]: Modelo: situada                 <============
         - [6]: Modelo: conexionista
         - [99]: Not today! ¡Cerrar!, please, bye!
Escribe: 
```

La implementación actual implementa "**La Cadena de Montaje**". El autómata de la FIA Situada deberá mantener el **estado** y sus **transiciones** para 50 **unidades de trabajo** que desfilaran por una cadena de montaje con 100 posiciones, a la que están conectadas 5 **máquinas** con retención de unidad de trabajo (sin obstaculizar la cadena) de 2 segundos. Las 5 máquinas ejecutan la misma acción. Pero la nº5 ejecuta además un proceso especial obligado todas las unidades de trabajo.

Para cada pulso del ciclo (movimiento de la cinta), el estado deberá indicar:

- unidades de trabajo en almacen
- posiciones de la cadena ocupadas por las unidades de trabajo
- unidades de trabajo retenidas en máquina
- para cada subciclo de retención en máquina: unidad de trabajo, porcentaje trabajado.
- unidades de trabajo acabadas

En la implementación actual se incluye:

- [FIA Situada](src/FIA/paradigmas/situada/paradigma.ts): Autómata con funcionalidad eferencia/aferencia (estado de entrada, transición, estado de salida).
- [Mundo::Cadena Produccion](src/FIA/mundos/cadena-produccion.ts): Contexto de ejecución con: a) pulso absoluto (cuenta de a uno), b) pulso relativo (configurable).

Completar la ejecución implementando con logs la funcionalidad:

>
>
**sistema>** Transfiriendo el prompt a: situada
**situada>** Hola soy un autómata situado. Voy a ejemplificar mi forma de razonar. Para ello operaré un serie de pasos recibiendo señales con mis sensores y enviando acciones.
cadena> ¡Mundo iniciado!
cadena> Hoy es el día: 1
cadena> Hoy es el día: 2
cadena> Hoy es el día: 3
cadena> Hoy es el día: 4
cadena> ¡Mundo acabado!
**situada>** Modelo resultante:Modelo base. 10 días; pulso: 1 segundo
**situada>** Final de ejecución 


# APP: Simulación con Red Simbólica.Semantica Red

Aunque el grafo de la red semántica puede construirse de distintas manera, se ha implementado una modelización sin código, vía json.

La implementación actual define la red semántica en el [fichero de traducciones i18](src/FIA/i18/labels.ts) ver nodo APPS.CADENA.SIMBOLICA.DOMINIO.

En la inicialización, la [FIA RedSemántica](src/FIA/paradigmas/simbolica/modelos/formal/sistema/semantica.ts) interpreta el fichero y monta la red base.

La red inicializa los nodos hoja y sus arcos principales:

```ts
    cargar(red: any, entidades: IGrafo[]) {
        /**
         * Añadir entidades maestras
         */
        Object.keys(red.ENTIDADES).forEach(i => {

        /**
         * Añadir entidades del arco "subclase-de"
         */
        Object.keys(red.ARCOS.ESTRUCTURALES.SUBCLASE).forEach(clase_hija => {

        /**
        * Añadir entidades del arco "parte-de"
        */
        Object.keys(red.ARCOS.ESTRUCTURALES.PARTE).forEach(clase_padre => {

        /**
        * Añadir entidades del arco "instancia-de"
        */
        Object.keys(red.ARCOS.ESTRUCTURALES.INSTANCIA).forEach(clase_hija => {


        /**
        * Añadir entidades del arco "descriptivo"
        */
        Object.keys(red.ARCOS.DESCRIPTIVOS).forEach(clase_padre => {

    }

```

Una vez cargada la red, puede usarse el [método probar del modelo](src/FIA/aplicaciones/cadena/simbolica/formal/cadena-fia-red-semantica.ts) inferencias con el formato de ejemplo de abajo. Las inferencias se lanzarán una a una.

```ts
const casos = [
            {
                instancia: {
                    robot_1: "robot"
                }
            },
            {
                subclase: {
                    robot_1: "criptoselladora"
                }
            },
            {
                parte: {
                    propiedad_cripta: "objeto_1"
                }
            },
            {
                tarea_cadena_robot_objeto: {
                    encadenar : {
                        tarea: "tarea_1",
                        cadena: "cadena_1",
                        robot: "robot_1",
                        objeto: "objeto_1",
                        almacen: "almacen_1"
                    }
                }
            }
        ];

        await this.modelo.probar(casos);
```
## Log 

```
cadena.simbolica.semantica.red> Se van a lanzar una serie de inferencias sobre la red...:
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
regla.de.red.semantica>
	 - Tipo de inferencia: instancia
	 - agentes: robot_1
	 - sujetos: robot
	 - Entidades: robot - robot_1
regla.de.red.semantica> ¿Existe un camino que lleve desde <robot_1> hasta <robot> pasando por <instancia>
Empieza la búsqueda en robot_1

			 - Comparando criptoselladora:
			 - ...con <robot_1> es instancia de <criptoselladora>: y instancia
RelacionEstructural {
  nombre: '<robot_1> es instancia de <criptoselladora>',
  valor: 'instancia'
}

			 - Comparando robot:
			 - ...con <criptoselladora> es subclase de <robot>: y subclase
RelacionEstructural {
  nombre: '<criptoselladora> es subclase de <robot>',
  valor: 'subclase'
}
Fin de rama. El destino: robot fallido.
cadena.simbolica.semantica.red>
	 - Evaluando caso: :[object Promise]
regla.de.red.semantica>
	 - Tipo de inferencia: subclase
	 - agentes: robot_1
	 - sujetos: criptoselladora
	 - Entidades: criptoselladora - robot_1
regla.de.red.semantica> ¿Existe un camino que lleve desde <robot_1> hasta <criptoselladora> pasando por <subclase>
Empieza la búsqueda en robot_1

			 - Comparando criptoselladora:
			 - ...con <robot_1> es instancia de <criptoselladora>: y instancia
RelacionEstructural {
  nombre: '<robot_1> es instancia de <criptoselladora>',
  valor: 'instancia'
}

			 - Comparando robot:
			 - ...con <criptoselladora> es subclase de <robot>: y subclase
RelacionEstructural {
  nombre: '<criptoselladora> es subclase de <robot>',
  valor: 'subclase'
}
Fin de rama. El destino: robot fallido.
cadena.simbolica.semantica.red>
	 - Evaluando caso: :[object Promise]
regla.de.red.semantica>
	 - Tipo de inferencia: parte
	 - agentes: propiedad_cripta
	 - sujetos: objeto_1
	 - Entidades: propiedad_cripta - objeto_1
regla.de.red.semantica> ¿Existe un camino que lleve desde <propiedad_cripta> hasta <objeto_1> pasando por <parte>
Empieza la búsqueda en propiedad_cripta

			 - Comparando objeto_criptosellable:
			 - ...con <objeto_criptosellable> tiene la parte: <propiedad_cripta>: y parte
RelacionEstructural {
  nombre: '<objeto_criptosellable> tiene la parte: <propiedad_cripta>',
  valor: 'parte'
}

			 - Comparando objeto:
			 - ...con <objeto_criptosellable> es subclase de <objeto>: y subclase
RelacionEstructural {
  nombre: '<objeto_criptosellable> es subclase de <objeto>',
  valor: 'subclase'
}
Fin de rama. El destino: objeto fallido.

			 - Comparando objeto_compuesto:
			 - ...con <objeto_compuesto> tiene la parte: <objeto_criptosellable>: y parte
RelacionEstructural {
  nombre: '<objeto_compuesto> tiene la parte: <objeto_criptosellable>',
  valor: 'parte'
}

			 - Comparando objeto:
			 - ...con <objeto_compuesto> es subclase de <objeto>: y subclase
RelacionEstructural {
  nombre: '<objeto_compuesto> es subclase de <objeto>',
  valor: 'subclase'
}
Fin de rama. El destino: objeto fallido.

			 - Comparando propiedad:
			 - ...con <propiedad_cripta> es instancia de <propiedad>: y instancia
RelacionEstructural {
  nombre: '<propiedad_cripta> es instancia de <propiedad>',
  valor: 'instancia'
}
Fin de rama. El destino: propiedad fallido.
cadena.simbolica.semantica.red>
	 - Evaluando caso: :[object Promise]
regla.de.red.semantica>
	 - Tipo de inferencia: tarea_cadena_robot_objeto
	 - agentes: encadenar
	 - sujetos: tarea_1 - cadena_1 - robot_1 - objeto_1 - almacen_1
	 - Entidades: cadena_1 - almacen_1 - robot_1 - objeto_1 - encadenar
cadena.simbolica.semantica.red>
	 - Evaluando caso: :[object Promise]
cadena.simbolica.semantica.red> Test de la red semántica finalizado:
Resultado búsqueda: undefined
cadena-app> ¡Simulación finalizada!¡La aplicación ha concluído y se cierra!
si
```

# Log Conexionista Red Neuronal (onnx)

sistema> Transfiriendo el prompt a: cadena-app
cadena-app> Esta aplicación simula una cadena de producción. ¡Arrancando simulación!
cadena.conexionista.red> Creando la red neuronal...
cadena.conexionista.red> Modelo resultante:Lista para recibir inferencia, envía tensores que te devuelvo ídem. Usa una canalación.
red-neuronal> Creando sesión de inferencia para el modelo: :/Users/morente/Desktop/DRIVE/taller_tc/JE20/je20/fia/dist/FIA/aplicaciones/cadena/conexionista/model.onnx
red-neuronal> Tensores de entrada: :1,2,3,4,5,6,7,8,9,10,11,12, 10,20,30,40,50,60,70,80,90,100,110,120
red-neuronal> La inferencia acabó con éxito, tensor de salida: :700,800,900,1580,1840,2100,2460,2880,3300
cadena.conexionista.red> ¡Simulación finalizada!
cadena-app> ¡La aplicación ha concluído y se cierra!
sistema> Escoge:
	 - [0]: Modelo: FIA
	 - [1]: Modelo: FIA_Genesis
	 - [2]: Modelo: debil
	 - [3]: Modelo: fuerte
	 - [4]: Modelo: simbolica
	 - [5]: Modelo: situada
	 - [6]: Modelo: conexionista
	 - [7]: Modelo: cadena-app
	 - [99]: Not today! ¡Cerrar!, please, bye!
Escribe:
