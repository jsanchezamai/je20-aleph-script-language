## Log de salida Situada (eferencia/aferencia)

- [Fia Situada](https://github.com/jsanchezamai/je20-aleph-script-language/blob/alephscript_v0001/src/FIA/paradigmas/situada/paradigma.ts)
- [Estado](./situada/cadena-estado.ts): arranca la máquina, la mantiene funcionando y la detiene.
- [Automata](./situada/cadena-automata.ts): instanciará el mundo, esperará a su expiración y lo descargará.
  
```
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