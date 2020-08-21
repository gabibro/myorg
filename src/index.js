//Variables, configuraciones, otros

let { Client, Collection } = require('discord.js') //Clases de cliente y colecciones

let { token, prefix } = require('./configuration').discordBot //Token bot

let api = require('./utils/api') //Obtenemos la clase del cliente
let database = require('./utils/database')

let {
  loadCommands,
  loadDatabase
} = require('./utils/functions')

let client = new Client({ disableEveryone: true }) //Crear un nuevo cliente

client.commands = new Collection() //Una coleccion de comandos

client.login(token) //Iniciamos sesion con el bot a la API de discord

//Eventos

client.on('ready', () => {
	console.log('Cliente iniciado correctamente')
  client.user.setActivity('organizaciones', { type: 'WATCHING' })
  loadCommands(client, './src/cmds')
  loadDatabase().then(() => console.log('Base de datos conectada correctamente.'))
})

client.on('message', async (msg) => {

  //Condicionales para evitar errores y otros problemas inecesarios.

  if(msg.author.bot) return undefined;

  let has = await database.has('guild', msg.guild.id)

  if(!has) return database.registGuild({ guildID: msg.guild.id }).then(() => console.log('Nuevo servidor registrado.'))

  if(!msg.content.startsWith(prefix)) return undefined;

  if(msg.content.indexOf(prefix) !== 0) return undefined;

  //Creacion de argumentos

  let args = msg.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase()

  let command = client.commands.get(cmd)

  if(!command) return msg.channel.send('No se encontro ningun comando con ese nombre').then(m => m.delete({ timeout: 5000 }))
  	else {

      command.run(client, msg, args, api)

  	}

})