let { Schema, model } = require('mongoose')

let organizationSchema = new Schema({
	id: { type: Number, required: true },
	guildID: { type: Number, required: true },
	name: { type: String, required: true },
	memberCount: { type: Number, required: true, default: 0 },
	members: { type: Array, required: true, default: [] },
	ranks: { type: Array, required: true, default: [] },
	roles: { type: Array, required: true, default: [] }
})

module.exports = model('organization', organizationSchema)