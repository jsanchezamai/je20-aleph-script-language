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

# Búsqueda no informada. Primero en anchura
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Sucesor q:  D
         - Sucesor q:  E
         - Abierta:  3
         - Nodo n:  B
         - Abierta:  2
         - Nodo n:  D
         - Sucesor q:  C
         - Abierta:  2
         - Nodo n:  E
         - Sucesor q:  F
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
         - Abierta:  3
         - Nodo n:  E
         - Sucesor q:  F
         - Abierta:  3
         - Nodo n:  F
         - Abierta:  2
         - Nodo n:  D
         - Sucesor q:  C
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
         - Abierta:  3
         - Nodo n:  B
         - Abierta:  2
         - Nodo n:  E
         - Sucesor q:  F
         - Abierta:  2
         - Nodo n:  D
         - Sucesor q:  C
         - Abierta:  2
         - Nodo n:  F
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

# Búsqueda no informada. Primero en anchura iterativa. (derecha_a_izquierda)
Búsqueda no informada. Primero en anchura iterativa. Anchura 0
Búsqueda no informada. Primero en anchura
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  E
         - Abierta:  1
         - Nodo n:  E
         - Sucesor q:  F
         - Abierta:  1
         - Nodo n:  F
Búsqueda no informada. Primero en anchura iterativa. Anchura 1
Búsqueda no informada. Primero en anchura
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Sucesor q:  D
         - Abierta:  2
         - Nodo n:  B
         - Abierta:  1
         - Nodo n:  D
         - Sucesor q:  C
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

# Búsqueda no informada. Primero en Profundidad Iterativa (izquierda_a_derecha)
Búsqueda no informada. Primero en profunidad. Max Prof: 1
         - Abierta:  1
         - Nodo n:  A
Búsqueda no informada. Primero en profunidad. Max Prof: 2
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  E
         - Sucesor q:  D
         - Sucesor q:  B
         - Abierta:  3
         - Nodo n:  B
         - Abierta:  2
         - Nodo n:  D
         - Abierta:  1
         - Nodo n:  E
Búsqueda no informada. Primero en profunidad. Max Prof: 3
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Sucesor q:  D
         - Sucesor q:  E
         - Abierta:  3
         - Nodo n:  E
         - Sucesor q:  F
         - Abierta:  3
         - Nodo n:  F
         - Abierta:  2
         - Nodo n:  D
         - Sucesor q:  C
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