/**
 * Este archivo define componentes simples y de uso frecuente.
 */

/**
 * Traduce el nombre de un rol a su id equivalente, es
 * importante que los ids sean los correctos.
 * @param {string} rol 
 */
const getIdRol = (rol) => {
	switch(rol) {
		case 'Cliente':
		  return 1
		case 'Administrador':
		  return 2
		case 'Gerente':
		  return 3
		default:
		  return null
	}
}

/**
 * Traduce las siglas de un tipo de documento (CC, CE, etc)
 * a su id correspondiente.
 * @param {string} type 
 */
const getTypeDoc = (type) => {

}

const getLocalTime = (string) => {
	const time = new Date()
	let offset = time.getTimezoneOffset() * 60 * 1000

	if (string === '120 años') {
		offset += 120*365*24*60*60*1000
	} else if (string === '18 años') {
		offset += 18*365*24*60*60*1000
	}

	const tlocal = new Date(time - offset)

	let iso = tlocal.toISOString()
	iso = iso.slice(0,10)
	console.log(iso)
	return iso
}


module.exports = {getLocalTime}