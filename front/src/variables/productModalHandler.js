/**
 * Este archivo define un componente de alto nivel
 * para manejar los eventos de un campo en formularios.
 * Actualiza el estado de react con los valores suministrados
 * por el usuario
 */

 const ProductModalHandler = (state, setState, event, catId) => {
	const key = event.target.id ? event.target.id : event.target.name
	const _copyState = JSON.parse(JSON.stringify(state))
    if (event.target.id == "iva" || event.target.name == "iva"){
        _copyState[key] = event.target.value 
        setState(_copyState)
    } else{
        _copyState[key] = event.target.value
        _copyState["categoria"] = catId
        setState(_copyState)
    } 

}

export default ProductModalHandler