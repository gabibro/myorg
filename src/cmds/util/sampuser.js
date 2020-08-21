let { embedColor, embedImage } = require('../../configuration').discordBot
let { typeCertification } = require('../../utils/dates')
let { MessageEmbed } = require('discord.js')

module.exports = {
	run: async(client, msg, args, api) => {

    let id = args[0]

    if(!id || isNaN(id)) return msg.channel.send('Por favor, coloca una ID valida')

    let userInfo = await api.getSAMPUser(id)

    if(userInfo.error) return msg.channel.send('No se encontro ningun usuario con esa ID.')	

    console.log('usuario', userInfo)    
 
    let embed = new MessageEmbed()
    .setFooter('Mensaje enviado', embedImage)
    .setTimestamp(Date.now())
    .addField('Nombre', userInfo.name, true)
    .addField('Nivel', userInfo.level, true)
    .addField('¿Usuario baneado?', userInfo.banned ? 'Si' : 'No')
    .addField('Tiempo jugado', require('moment')(userInfo.played_time).format('hh, mm, ss'), true)
    .addField('Certificado', typeCertification(userInfo.certification), true)
    .setColor(embedColor)

    msg.channel.send({ embed: embed })

	}
}