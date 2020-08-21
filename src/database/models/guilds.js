let { Schema, model } = require('mongoose')

let guildSchema = new Schema({
	guildID: { type: String, required: true },
	prefix: { type: String, required: true, default: require('../../configuration').discordBot.prefix },
	plataform: { type: String, required: true },
	organization: { type: Object, required: true, default: {
		has: false,
		type: 'org',
		id: null
	}}
})

module.exports = model('guilds', guildSchema)