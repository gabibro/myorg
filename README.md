---

<h2 align="center">Nota importante</h2>

Debido al cierre de la comunidad de SA:MP [UnPlayer](https://unplayer.com), el repositorio deja de actualizar y pierde su uso, no se borrara o archivar<

---

# MyOrg
 Plantilla de bot discord, dedicado a obtener datos de los miembros de UP.
 
 Con esta plantilla, puedes configurar tu organizacion, obtener informacion, crear roles para cada rango, etc.

 Esta plantilla da uso al lenguaje Javascript, usando NodeJS, junto con Packages como: discord.js (Manejo de la API de discord), mongoose (herramienta de modelado de MongoDB), node-fetch (Realizar peticiones HTTP), entre otros. este proyecto usa archivos separados, para tener una mejor organizacion del mismo

# Caracteristicas
> Configuracion de organizacion principal

> Obtener datos de jugadores

> Guardar la informacion en una base de datos

> Creacion de roles

> Sistema de roles y nombre automatico

# Configuraciones
 La aplicacion requiere de 3 claves principales: Las 2 claves de la pagina de [UN Player](https://unplayer.com/settings/keys), y la clave del bot de [Discord](https://discord.com/developers/applications/me)
 El resto, es de la configuracion del bot, y la clave de la URI de MongoDB (uso obligatorio)
 Este archivo se ubica en ``src/configuration.js``
 
 ```js
 exports.token = { 
	key: 'key-here',
	privated: 'key-private-here'
}

exports.discordBot = { 
	token: 'client-token-here',
	prefix: 'my!',
	embedColor: 'BLUE',
	embedImage: 'image-url',
	roleColor: 'GREEN'
}

 exports.mongoURI = 'mongoURI-here'
 ```
 
# Preguntas y respuestas
 > ¿Puedo usarlo y modificarlo libremente?
 
 **Asi es!**, esta plantilla es de uso libre gratutio, y modificable (incluye algunas configuraciones y funciones personalizadas)
 
 > ¿Puedo decir que el proyecto es mio?
 
 **Nop**
 
 > Si surge un error, ¿donde puedo consultarlo?
 
  Puedes contactarme por Discord (gabi_bro_#9951) o por [Twitter](https://twitter.com/cheemsislive)
  
 > No me se los comandos disponibles, ¿donde los encuentro?
 
  Usando esta [mini-guia](https://github.com/gabibro/myorg/blob/master/docs/commands.md#lista-de-comandos) con la lista de comandos disponibles
  
  # Instalacion
   Luego de descargar los archivos, deberas de contar con NodeJS (v12 o superior), despues de esto, tendras que abrir una consola en la carpeta inicial y escribir ``npm i`` (Instala los archivos necesarios de los modulos), luego de eso, y de configurar con la claves y otros, escribir en la misma consola ``node .``
   
   **!Un saludo¡** 🍞
