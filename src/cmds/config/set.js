let models = {
	guilds: require('../../database/models/guilds'),
	organizations: require('../../database/models/organizations')
}

let database = require('../../utils/database')

module.exports = {
	run: async(client, msg, args, api) => {

     let type = args[0]
     if(!type || !['type', 'id', 'roles'].includes(type)) return msg.channel.send('Indica el tipo de opcion a usar.')

     if(type === 'id') {

       let content = args[1]

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
     } else if(type === 'roles') {
     
     //Obtener datos guilds
     let infoGuild = await models.guilds.findOne({ guildID: msg.guild.id })
     let infoOrg = await api.getORG(infoGuild.plataform, infoGuild.organization.id)

     console.log(infoGuild, infoOrg)

     let mapRanks = infoOrg.ranks.map(r => '``Nombre: ``'+r.name+'\n``ID: ``'+r.id+'').join('\n')

     let toCreateRanks = [{ rank_id: null, role_id: undefined, name: '[Rangos]' }]

     infoOrg.ranks.map(r => {
      toCreateRanks.push({ rank_id: r.id, role_id: 0, name: r.name })
     })

     console.log(toCreateRanks)

     msg.channel.send(mapRanks)

     }

	}
}