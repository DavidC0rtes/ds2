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