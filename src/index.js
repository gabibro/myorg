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

client.on('guildMemberAdd', async (member) => {

  let infoUser = await api.getUser(member.user.id, 'discord')

  if(infoUser) {

  let userModel = require('./database/models/users')

  let findUser = await userModel.findOne({ id: infoUser.ids.user })

  if(!findUser) {
    let newUser = new userModel({
      userID: member.user.id,
      id: infoUser.ids.user,
      plataforms: {
        forum: infoUser.ids.forum,
        samp: infoUser.ids.samp,
        gtav: infoUser.ids.gtav
      },
      name: member.user.username
    })

    newUser.save()
    .then(() => console.log('Nuevo usuario registrado'))
  }

  if(infoUser.ids.samp !== false) {

  let SAMPuserInfo = await api.getSAMPUser(findUser.plataforms.samp)
  let findOrg = await (require('./database/models/organizations')).findOne({ guildID: member.guild.id })

  if(findOrg && SAMPuserInfo.orgs[0].org_id === findOrg.id) {

  let userRank = findOrg.roles.find(r => r.rank_id === SAMPuserInfo.orgs[0].rank_id)
  let role = member.guild.roles.cache.get(userRank.role_id)
  let roleGeneral = findOrg.roles.find(r => r.name === findOrg.name)

  member.roles.add([role, roleGeneral.role_id])

  }

  }

  }

})