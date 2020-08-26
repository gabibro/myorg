let { MessageEmbed } = require('discord.js')
let { typeCertification } = require('../../utils/dates')
let { embedColor, embedImage } = require('../../configuration').discordBot

let models = {
	guilds: require('../../database/models/guilds'),
	organizations: require('../../database/models/organizations')
}

let database = require('../../utils/database')

module.exports = {
	run: async(client, msg, args, api) => {

    let infoGuild = await models.guilds.findOne({ guildID: msg.guild.id })  
    if(!infoGuild) database.registGuild({ guildID: msg.guild.id })

    if(!infoGuild.organization.has) return msg.channel.send('No se encuentra establecido una organizacion principal.') 	

    let info_Org = await api.getORG(infoGuild.plataform, infoGuild.organization.id)

    console.log(info_Org)

    let embed = new MessageEmbed()
    .setTitle(info_Org.name)
    .setColor(embedColor)
    .setFooter('Mensaje enviado', embedImage)
    .setTimestamp()
    .addField('Certificado requerido:', typeCertification(info_Org.certification), true)
    .addField('ID:', info_Org.id)
    .addField('Numero de miembros:', info_Org.members_count, true)
    
    if(info_Org.members.length > 0) {
    let mapMembers = info_Org.members.map(m => '``'+m.name+' ('+m.user_id+')``\n').join('\n')	
    embed.addField('Miembros:', mapMembers)	
    }

    msg.channel.send({ embed: embed })

	}
}