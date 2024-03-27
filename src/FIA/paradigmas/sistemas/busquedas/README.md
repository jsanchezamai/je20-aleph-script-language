NOTA: SIN REVISAR, PUEDE CONTENER ERRORES

![](arbol.png)

- (2a) Búsqueda Primero en Anchura (de izquierda a derecha)
- (2b) Búsqueda Primero en Profundidad (de derecha a izquierda)
- (2c) Búsqueda de Coste Uniforme
- (2d) Búsqueda en Anchura Iterativa (de derecha a izquierda)
- (2e) Búsqueda en Profundidad Iterativa (de izquierda a derecha)

```ts
    const b = new PrimeroEnAnchura("Primero en anchura", PrimeroEnAnchura.sucesores);
    b.test();

    const c = new PrimeroEnProfundidad();
    c.test();

    const u = new CosteUniforme("CosteUniforme", CosteUniforme.sucesores);
    u.test();

    const bI = new PrimeroEnAnchuraIterativa("Primero en anchura", PrimeroEnAnchura.sucesores);
    bI.derecha_a_izquierda = true;
    bI.test();

    const cI = new PrimeroEnProfundidadIterativa();
    cI.izquierda_a_derecha = true;
    cI.test();
```
sistema> Arrancando el sistema

# Búsqueda no informada. Primero en anchura
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Sucesor q:  D
         - Sucesor q:  E
                 - Abierta [ 'B', 'D', 'E' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - '
]
         - Abierta:  3
         - Nodo n:  B
                 - Abierta [ 'D', 'E' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - '
]
         - Abierta:  2
         - Nodo n:  D
         - Sucesor q:  C
                 - Abierta [ 'E', 'C' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[D]->[C]: coste(inicio, n): 9 - p:  - '
]
         - Abierta:  2
         - Nodo n:  E
         - Sucesor q:  F
                 - Abierta [ 'C', 'F' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[D]->[C]: coste(inicio, n): 9 - p:  - ',
  '[E]->[F]: coste(inicio, n): 5 - p:  - '
]
         - Abierta:  2
         - Nodo n:  C
         - esObjetivo:  C
         - Camino desde/a:  A C
                 - ruta:  D
                 - ruta:  A
 >>  C 3 9
 >>  D 2 5
 >>  A 1 0
Test:  true



# Búsqueda no informada. Primero en profunidad. Max Prof: 10
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Sucesor q:  D
         - Sucesor q:  E
                 - Abierta [ 'B', 'D', 'E' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[E]: coste(inicio, n): 3 - p: 1'
]
         - Abierta:  3
         - Nodo n:  E
         - Sucesor q:  F
                 - Abierta [ 'B', 'D', 'F' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[E]->[F]: coste(inicio, n): 5 - p: 2'
]
         - Abierta:  3
         - Nodo n:  F
                 - Abierta [ 'B', 'D' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[E]->[F]: coste(inicio, n): 5 - p: 2'
]
         - Abierta:  2
         - Nodo n:  D
         - Sucesor q:  C
                 - Abierta [ 'B', 'C' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[E]->[F]: coste(inicio, n): 5 - p: 2',
  '[D]->[C]: coste(inicio, n): 9 - p: 2'
]
         - Abierta:  2
         - Nodo n:  C
         - esObjetivo:  C
         - Camino desde/a:  A C
                 - ruta:  D
                 - ruta:  A
 >>  C 3 9
 >>  D 2 5
 >>  A 1 0
Test:  true


# Búsqueda no informada. CosteUniforme
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Sucesor q:  E
         - Sucesor q:  D
                 - Abierta [ 'B', 'E', 'D' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - '
]
         - Abierta:  3
         - Nodo n:  B
                 - Abierta [ 'E', 'D' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - '
]
         - Abierta:  2
         - Nodo n:  E
         - Sucesor q:  F
                 - Abierta [ 'D', 'F' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - ',
  '[E]->[F]: coste(inicio, n): 5 - p:  - '
]
         - Abierta:  2
         - Nodo n:  D
         - Sucesor q:  C
                 - Abierta [ 'F', 'C' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - ',
  '[E]->[F]: coste(inicio, n): 5 - p:  - ',
  '[D]->[C]: coste(inicio, n): 9 - p:  - '
]
         - Abierta:  2
         - Nodo n:  F
                 - Abierta [ 'C' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - ',
  '[E]->[F]: coste(inicio, n): 5 - p:  - ',
  '[D]->[C]: coste(inicio, n): 9 - p:  - '
]
         - Abierta:  1
         - Nodo n:  C
         - esObjetivo:  C
         - Camino desde/a:  A C
                 - ruta:  D
                 - ruta:  A
 >>  C 3 9
 >>  D 2 5
 >>  A 1 0
Test:  true


# Búsqueda no informada. Primero en anchura iterativa.
## Búsqueda no informada. Primero en anchura iterativa. Anchura 0
### Búsqueda no informada. Primero en anchura
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  E
                 - Abierta [ 'E' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - '
]
         - Abierta:  1
         - Nodo n:  E
         - Sucesor q:  F
                 - Abierta [ 'F' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[E]->[F]: coste(inicio, n): 5 - p:  - '
]
         - Abierta:  1
         - Nodo n:  F
                 - Abierta []
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[E]->[F]: coste(inicio, n): 5 - p:  - '
]



# Búsqueda no informada. Primero en anchura iterativa. Anchura 1
## Búsqueda no informada. Primero en anchura
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Sucesor q:  D
                 - Abierta [ 'B', 'D' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[E]->[F]: coste(inicio, n): 5 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - '
]
         - Abierta:  2
         - Nodo n:  B
                 - Abierta [ 'D' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[E]->[F]: coste(inicio, n): 5 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - '
]
         - Abierta:  1
         - Nodo n:  D
         - Sucesor q:  C
                 - Abierta [ 'C' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p:  - ',
  '[E]->[F]: coste(inicio, n): 5 - p:  - ',
  '[A]->[B]: coste(inicio, n): 2 - p:  - ',
  '[A]->[D]: coste(inicio, n): 5 - p:  - ',
  '[D]->[C]: coste(inicio, n): 9 - p:  - '
]
         - Abierta:  1
         - Nodo n:  C
         - esObjetivo:  C
         - Camino desde/a:  A C
                 - ruta:  D
                 - ruta:  A
 >>  C 3 9
 >>  D 2 5
 >>  A 1 0
Test:  true


# Búsqueda no informada. Primero en Profundidad Iterativa
## Búsqueda no informada. Primero en profunidad. Max Prof: 1
         - Abierta:  1
         - Nodo n:  A
                 - Abierta []
                 - Tabla_A [ '[ - ]->[A]: coste(inicio, n): 0 - p:  - ' ]
## Búsqueda no informada. Primero en profunidad. Max Prof: 2
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  E
         - Sucesor q:  D
         - Sucesor q:  B
                 - Abierta [ 'E', 'D', 'B' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[B]: coste(inicio, n): 2 - p: 1'
]
         - Abierta:  3
         - Nodo n:  B
                 - Abierta [ 'E', 'D' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[B]: coste(inicio, n): 2 - p: 1'
]
         - Abierta:  2
         - Nodo n:  D
                 - Abierta [ 'E' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[B]: coste(inicio, n): 2 - p: 1'
]
         - Abierta:  1
         - Nodo n:  E
                 - Abierta []
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[B]: coste(inicio, n): 2 - p: 1'
]
## Búsqueda no informada. Primero en profunidad. Max Prof: 3
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Sucesor q:  D
         - Sucesor q:  E
                 - Abierta [ 'B', 'D', 'E' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[B]: coste(inicio, n): 2 - p: 1'
]
         - Abierta:  3
         - Nodo n:  E
         - Sucesor q:  F
                 - Abierta [ 'B', 'D', 'F' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[B]: coste(inicio, n): 2 - p: 1',
  '[E]->[F]: coste(inicio, n): 5 - p: 2'
]
         - Abierta:  3
         - Nodo n:  F
                 - Abierta [ 'B', 'D' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[B]: coste(inicio, n): 2 - p: 1',
  '[E]->[F]: coste(inicio, n): 5 - p: 2'
]
         - Abierta:  2
         - Nodo n:  D
         - Sucesor q:  C
                 - Abierta [ 'B', 'C' ]
                 - Tabla_A [
  '[ - ]->[A]: coste(inicio, n): 0 - p:  - ',
  '[A]->[E]: coste(inicio, n): 3 - p: 1',
  '[A]->[D]: coste(inicio, n): 5 - p: 1',
  '[A]->[B]: coste(inicio, n): 2 - p: 1',
  '[E]->[F]: coste(inicio, n): 5 - p: 2',
  '[D]->[C]: coste(inicio, n): 9 - p: 2'
]
         - Abierta:  2
         - Nodo n:  C
         - esObjetivo:  C
         - Camino desde/a:  A C
                 - ruta:  D
                 - ruta:  A
 >>  C 3 9
 >>  D 2 5
 >>  A 1 0
Test:  true
