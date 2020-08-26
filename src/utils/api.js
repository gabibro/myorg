let { key, privated } = require('../configuration').token

let fetch = require('node-fetch')

let config = {
	http: 'http://unplayer.com/api/1.0/'
}

let UnplayerApi = class UnplayerApi {
	constructor() {
		this.version = '0.10'
		this.methods = require('./dates')
	}

    static async getUser(user_id, type = 'discord') {

     let api = config.http + 'user?type='+type+'&user_id='+user_id+'' 

     let promise = await fetch(api, { headers: { Autorization: `${key}` } })

     return await promise.json()

    }

    static async getSAMPUser(id) {

      
      let api = config.http + 'samp/user/' + id.toString()

      let promise = await fetch(api, { headers: { Autorization: `${key}` } })
 
      return await promise.json()

    }

    static async getORG(type, id) {

     if(!type || !['samp', 'gtav'].includes(type) || !id || isNaN(id)) throw new Error('Indica bien los argumentos')

      let api = config.http + `${type}/org/${id}`

      let promise = await fetch(api, { headers: { Autorization: `${key}` } })

      return await promise.json()

    }
 
}

module.exports = UnplayerApi