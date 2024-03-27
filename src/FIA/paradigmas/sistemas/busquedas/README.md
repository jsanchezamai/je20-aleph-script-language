```ts
    const b = new PrimeroEnAnchura();
    b.test();

    const c = new PrimeroEnProfundidad();
    c.test();
```


Búsqueda no informada. Primero en anchura
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
Búsqueda no informada. Primero en profunidad
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