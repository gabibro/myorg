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
 
    function getPlayedTime(time) {

        let horas = Math.floor(time / 60)
        let dias = Math.floor(time / 1440)
        let minutos = Math.floor(dias * 1440)

        horas = horas.toString().slice(0, 2)
        minutos = minutos.toString().slice(0, 2)  

      return `${dias}d ${horas}h ${minutos}m`

    }

    function getLastedPlayedTime(time) {

        let getTime = require('moment').duration(time)._data

        return 'Hace '+getTime.days+'d, '+getTime.hours+'m, '+getTime.seconds+'s'

    }

    let embed = new MessageEmbed()
    .setFooter('Mensaje enviado', embedImage)
    .setTimestamp(Date.now())
    .setColor(embedColor)
    .addField('Nombre', userInfo.name, true)
    .addField('Nivel', userInfo.level, true)
    .addField('¿Usuario baneado?', userInfo.banned ? 'Si' : 'No')
    .addField('Tiempo jugado', getPlayedTime(userInfo.played_time), true)
    .addField('Certificado', typeCertification(userInfo.certification), true)
    .addField('Estado', userInfo.online ? 'En linea' : 'Desconectado')

    if(!userInfo.online) {

     embed.addField('Ultima conexion', getLastedPlayedTime(userInfo.last_seen)) 

    }

    msg.channel.send({ embed: embed })

	}
}