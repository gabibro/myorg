module.exports = {
	typeCertification: function(args) {

    if(typeof args !== 'number') throw new Error('Indique un valor numerico.')

    let obj = {
    	0: 'Ninguna',
    	1: 'Basica',
        2: 'Normal',
        3: 'Completada'
    }
     
    return obj[args] 

	}
}