# Log Conexionista Red Neuronal (onnx, inferencia de tensores)

- [FIA Conexionista. Red neuronal](https://github.com/jsanchezamai/je20-aleph-script-language/tree/alephscript_v0001/src/FIA/paradigmas/conexionista)
  
```
sistema> Transfiriendo el prompt a: cadena-app
cadena-app> Esta aplicación simula una cadena de producción. ¡Arrancando simulación!
cadena.conexionista.red> Creando la red neuronal...
cadena.conexionista.red> Modelo resultante:Lista para recibir inferencia, envía tensores que te devuelvo ídem. Usa una canalización.
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
```

# Consumo de modelos largos de lenguaje

Dentro del [paradigma conexionista](../../../paradigmas/conexionista), el lenguaje AlephScript incluye, junto con la posibilidad de inferir modelos locales (vía onnx) mediante [Canalizaciones](../../../paradigmas/conexionista/canalizacion.ts),  el acceso api a los grandes modelos servidos en la nube. En estos casos la canalización se realiza mediante lenguaje natural.

Como ejemplo dummy para la aplicación, trataremos de enviar la información que emiten tanto [FIA Situada](../situada/) como [FIA Simbólica](../simbolica/) a la [FIA Conexionista](./cadena-fia-conexionista.ts) que será responsable de evaluar, mediante una [Inferencia de Lenguaje Natural](./cadena-inferencia-lenguaje-natural.ts) el estado del [Modelo](../modelo/) e inferir transiciones en el [Mundo](../mundo/).
