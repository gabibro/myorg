let models = {
	guilds: require('../../database/models/guilds'),
	organizations: require('../../database/models/organizations')
}

let database = require('../../utils/database')

let { MessageEmbed } = require('discord.js')
let { embedColor, embedImage, roleColor } = require('../../configuration').discordBot

module.exports = {
	run: async(client, msg, args, api) => {
	 //Obtener datos modelo 'guilds'
     let infoGuild = await models.guilds.findOne({ guildID: msg.guild.id })
     if(!infoGuild) return database.registGuild({ guildID: msg.guild.id })
     //Obtener datos org
     let dataOrg = await api.getORG(infoGuild.plataform, infoGuild.organization.id)
     if(!dataOrg) return msg.channel.send('No se encontro la organizacion indicada')
     //Obtener datos modelo 'organizations'
     let infOrg = await models.organizations.findOne({ guildID: msg.guild.id, id: infoGuild.organization.id })
     if(!infOrg) return database.createOrganization({ id: dataOrg.id, guildID: msg.guild.id, name: dataOrg.name, memberCount: dataOrg.members_count})

     if(!args[0]) {

     let mapRanks = dataOrg.ranks.map(r => `**Nombre:** ${r.name}\n**ID:** ${r.id}`).join('\n')

     let embed = new MessageEmbed()
     .setDescription(mapRanks)
     .setColor(embedColor)
     .setFooter('Mensaje enviado', embedImage)

     await msg.channel.send({ embed: embed })

     } else if(args[0].toLowerCase() === 'roles'.toLowerCase()) {

     let roles = []
     let count = {
          total: 0,
          done: 0,
          rej: 0
     }

     let m = await msg.channel.send('Creando roles...')

     let hasPermission = msg.guild.me.permissions.has('MANAGE_ROLES')
     if(!hasPermission) return msg.channel.send('No tengo permisos para crear y editar roles')

     if(infOrg.roles.length - 1 === dataOrg.ranks.length) return msg.channel.send('Ya se encuentran creado los roles')     

     dataOrg.ranks.map(async rank => {

     try {

     let guildHasRole = msg.guild.roles.cache.find(x => x.name === rank.name) ? true : false
     if(guildHasRole) return undefined;

     let role = await msg.guild.roles.create({
          data: {
               name: rank.name,
               color: roleColor,
               position: count.total,
               mentionable: false
          },
          reason: 'Creacion de rangos (MyOrg)'
     })
     
     roles.push({ rank_id: rank.id, role_id: role.id, name: rank.name })
     count.total++
     count.done++
     
     } catch(err) {

     count.total++
     count.rej++
     console.error(err)

     } finally {

     if(count.total === dataOrg.ranks.length) {

      m.edit('¡Roles creados correctamente! ('+count.done+' correctamente, '+count.rej+' fallidos)')

      let rol = await msg.guild.roles.create({
          data: {
               name: dataOrg.name,
               color: roleColor,
               mentionable: true
          }
      })
 
      roles.push({ rank_id: null, role_id: rol.id, name: rol.name })

      infOrg.roles = roles
      infOrg.save().then(() => console.log('Roles de organizacion guardadas correctamente!'))

     }


     }

     })
 
  } 
 }
}