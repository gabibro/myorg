module.exports = {
	loadCommands: function(client, pth) {
     
    let count = 0
    let cmds = []

      let { readdirSync } = require('fs')
       
      readdirSync(pth).forEach(sub => {

        let pt = require('path').join(pth, sub)

        readdirSync(pt).forEach(file => {

           if(!file.endsWith('.js')) return undefined;

           let name = file.split('.')[0]
 
           cmds.push({ name: name, path: `./${sub}/${file}` })

        })

      }) 

      cmds.map(c => {

        try {

        let cmd = require('../cmds' + c.path.slice(1))

        client.commands.set(c.name, cmd)
 
 
        } catch(err) {
          console.error(err)
        } finally {
          count++
        }
   
     })

     console.log(`Fueron cargados ${count} comandos correctamente`)

	},
  loadDatabase: require('../database/index')
}