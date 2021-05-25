/**
 * Este archivo define un componente de alto nivel
 * para manejar los eventos de un campo en formularios.
 * Actualiza el estado de react con los valores suministrados
 * por el usuario
 */

//Solucion rápida pero medio hack para activar o desactivar una categoria durante su creación
 const CategoryModalHandler = (state, setState, event) => {
     if (typeof event === "boolean"){
         console.log(event)
        const _copyState = JSON.parse(JSON.stringify(state))
        _copyState["activo"] = (!event)
        setState(_copyState)

    } else {
        const key = event.target.id ? event.target.id : event.target.name
        const _copyState = JSON.parse(JSON.stringify(state))
        _copyState[key] = event.target.value
        console.log(state.activo)
        setState(_copyState)
    }

}

export default CategoryModalHandler