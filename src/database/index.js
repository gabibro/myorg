let mongo = require('mongoose')
let { mongoURI } = require('../configuration')

module.exports = async() => { await mongo.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }) }