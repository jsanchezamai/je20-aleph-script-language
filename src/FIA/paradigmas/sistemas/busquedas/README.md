```ts
    const b = new PrimeroEnAnchura("Primero en anchura", PrimeroEnAnchura.sucesores);
    b.test();

    const c = new PrimeroEnProfundidad();
    c.test();

    const u = new CosteUniforme("CosteUniforme", CosteUniforme.sucesores);
    u.test();

    const cI = new PrimeroEnProfundidadIterativa();
    cI.test();

    const bI = new PrimeroEnAnchuraIterativa("Primero en anchura Iterativa", PrimeroEnAnchura.sucesores);
    bI.test();
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


# Búsqueda no informada. Primero en profunidad
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
         - Sucesor q:  B Coste:  2
         - Sucesor q:  E Coste:  3
         - Sucesor q:  D Coste:  5
         - Abierta:  3
         - Nodo n:  B
         - Abierta:  2
         - Nodo n:  E
         - Sucesor q:  F Coste:  2
         - Abierta:  2
         - Nodo n:  D
         - Sucesor q:  C Coste:  4
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


# Búsqueda no informada. Primero en Profundidad Iterativa

Búsqueda no informada. Primero en profunidad. Max Prof: 1
         - Abierta:  1
         - Nodo n:  A
Búsqueda no informada. Primero en profunidad. Max Prof: 2
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Sucesor q:  D
         - Sucesor q:  E
         - Abierta:  3
         - Nodo n:  E
         - Abierta:  2
         - Nodo n:  D
         - Abierta:  1
         - Nodo n:  B
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

# Búsqueda no informada. Primero en anchura iterativa.
Búsqueda no informada. Primero en anchura iterativa. Anchura 0
Búsqueda no informada. Primero en anchura
         - Abierta:  1
         - Nodo n:  A
         - Sucesor q:  B
         - Abierta:  1
         - Nodo n:  B
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