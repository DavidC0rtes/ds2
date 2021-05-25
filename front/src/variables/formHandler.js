/**
 * Este archivo define un componente de alto nivel
 * para manejar los eventos de un campo en formularios.
 * Actualiza el estado de react con los valores suministrados
 * por el usuario
 */

const FormHandler = (state, setState, event) => { 
	const key = event.target.id ? event.target.id : event.target.name
	const _copyState = JSON.parse(JSON.stringify(state))
	_copyState[key] = event.target.value
	console.log(event.target.name)
	console.log(event.target.value)
	console.log(event.target.id)
	setState(_copyState)
}

export default FormHandler