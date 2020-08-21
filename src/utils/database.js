let models = {
	guilds: require('../database/models/guilds'),
	organizations: require('../database/models/organizations')
}

module.exports = {
	registGuild: async function({ guildID, plataform = 'samp' }) {

      if(!guildID || isNaN(guildID)) throw new Error('Indique la ID del servidor.')

      	let newGuild = new models.guilds({
      		guildID: guildID,
      		plataform: plataform
      	})

      let guildPromise = new Promise(async (res, req) => {

        res(await newGuild.save())

      })

      return guildPromise

	},
	createOrganization: function({ id, guildID, name, memberCount, members = [], ranks = [] }) {

      if(!id || !name || !membercount) throw new Error('Debes indicar todos los valores requeridos.')

      let newOrganization = new models.organizations({
      	id: id,
            guildID: guildID,
      	name: name,
      	memberCount: membercount,
      	members: members,
      	ranks: ranks
      })	
 
      let organizationPromise = new Promise(async (res, req) => {

        res(await newOrganization.save())

      })

      return organizationPromise

	},
      has: async function(type, guildID, ...others) {

      if(!guildID || isNaN(guildID) ) throw new Error('Indica una ID valida.')
      
       let mmm;

       if(type === 'org') mmm = await models.organizations.findOne({ guildID: guildID, id: others[0] })
         else if(type === 'guild') mmm = await models.guilds.findOne({ guildID: guildID })  

       return mmm ? true : false 

      },
	getOrganization: async function(id) {

      if(!id || isNaN(id)) throw new Error('Indica la ID de la organizacion')

      let getOrganization = await models.organizations.findOne({ id: id })

      return getOrganization	

	}
}