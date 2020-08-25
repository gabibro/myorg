let models = {
	guilds: require('../../database/models/guilds'),
	organizations: require('../../database/models/organizations')
}

let database = require('../../utils/database')

module.exports = {
	run: async(client, msg, args, api) => {

       let content = args[0]

       let infoOrg = await api.getORG('samp', content)
       console.log(infoOrg)
       
       let m = await msg.channel.send('¿Seguro que deseas establecer ``'+infoOrg.name+'`` como tu organizacion principal?')
       
       let filtro = m => m.author.id === msg.author.id

       msg.channel.awaitMessages(filtro, { max: 1, time: 60000, errors: ['time'] })
       .then(async (res) => {
        
        if(res.first().content.toLowerCase() === 'si'.toLowerCase()) {

        let has = await database.has('guild', msg.guild.id)
        if(!has) database.registGuild({ guildID: msg.guild.id })

        let infoGuild = await models.guilds.findOne({ guildID: msg.guild.id })
        	
        infoGuild.organization = { has: true, type: 'org', id: infoOrg.id }
        infoGuild.save()
        .then((data) => {
        	msg.channel.send('Se guardo la informacion correctamente!')
        	console.log(data)
        })

        } else {
        	msg.channel.send('Accion cancelada.')
        }

       })
     
}
}