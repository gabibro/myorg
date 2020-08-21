let { Schema, model } = require('mongoose')

let usersSchema = new Schema({
	userID: { type: String, required: true },
	id: { type: Number, required: true, default: null },
	name: { type: String, required: false },

})

module.exports = model('users', usersSchema)