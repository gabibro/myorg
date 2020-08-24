let models = {
	guilds: require('../../database/models/guilds'),
	organizations: require('../../database/models/organizations')
}

let database = require('../../utils/database')

module.exports = {
	run: async(client, msg, args, api) => {
	 //Obtener datos guilds
     let infoGuild = await models.guilds.findOne({ guildID: msg.guild.id })
     if(!infoGuild) return database.registGuild({ guildID: msg.guild.id })

     let dataOrg = await api.getORG(infoGuild.plataform, infoGuild.organization.id)
     if(!dataOrg) return msg.channel.send('No se encontro la organizacion indicada')

     let infOrg = await models.organizations.findOne({ guildID: msg.guild.id, id: infoGuild.organization.id })
     if(!infOrg) return database.createOrganization({ id: dataOrg, guildID: msg.guild.id, name: dataOrg.name})

     let toCreateRanks = []

     infoOrg.ranks.map(r => {
      toCreateRanks.push({ rank_id: r.id, role_id: 0, name: r.name })
     })

     console.log(toCreateRanks)

     msg.channel.send(mapRanks)

	}
}