let { MessageEmbed } = require('discord.js')
let { embedColor, embedImage } = require('../../configuration').discordBot

module.exports = {
	run: async(client, msg, args, api) => {

      let type = args[0]
      let content = args[1]

      if(!['user', 'forum', 'gtav', 'samp', 'discord'].includes(type)) return msg.channel.send('Indica la plataforma a consultar\n``user, forum (foro), gtav, samp, discord``')
      if(!content) return msg.channel.send('Indique una id de la plataforma que indicaste')

      let userInfo = await api.getUser(content, type)

      if(userInfo.error) return msg.channel.send('No se encontro ningun usuario con esa ID.')

      let idsMap = Object.entries(userInfo.ids)
      let ids = Object.keys(userInfo.ids)
      let ids2 = Object.values(userInfo.ids)

      let idsType = {
      	'user': 'ID de usuario',
      	'forum': 'Perfil de foro',
      	'gtav': 'ID usuario GTA V',
      	'samp': 'ID usuario SA:MP',
      	'discord': 'ID Usuario de discord'
      }

      let ids2Type = {
         'user': ids2[0],
         'forum': 'https://foro.unplayer.com/member.php/' + ids2[1].toString(),
         'gtav': ids2[2] !== false ? ids2[2] : 'Ninguno',
         'samp': ids2[3] !== false ? ids2[3] : 'Ninguno',
         'discord': ids2[4] !== false ? ''+ids2[4]+'' : 'Ninguno'
      }

      let mapPlataforms = idsMap.map(id => {
      	return '``'+idsType[id[0]]+':`` '+ids2Type[id[0]]+''
      })

      let embed = new MessageEmbed()
      .setColor(embedColor)
      .setDescription(mapPlataforms)
      .setFooter('Lista de plataformas', embedImage)
 
       console.log(ids2)

      msg.channel.send({ embed: embed })

	}
}