# Simulación con FIA Simbólica (mediante red semántica)

- Basda en el objeto [FIA Simbolica. Red semántica](../../../paradigmas/simbolica/modelos/formal/sistema/semantica) del lenguaje AlephScript, la app instancia una red concreta que modeliza el problema.
  
Aunque el grafo de la red semántica puede construirse de distintas manera, se ha implementado una modelización sin código, vía json.

La implementación actual define la red semántica en el [fichero de traducciones i18](../../../i18/labels.ts) ver nodo APPS.CADENA.SIMBOLICA.DOMINIO.

En la inicialización, la [FIA Red Semántica](./simbolica/formal/cadena-fia-red-semantica.ts) interpreta el fichero y monta la red base.

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

Una vez cargada la red, puede usarse el [método probar del modelo](./simbolica/formal/cadena-fia-red-semantica.ts) inferencias con el formato de ejemplo de abajo. Las inferencias se lanzarán una a una.

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
## Log FIA Semantica

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