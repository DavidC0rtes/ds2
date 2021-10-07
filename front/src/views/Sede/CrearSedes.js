/**
 * Este archivo actúa igual que SignUp.js, la diferencia es que este 
 * es solo para administradores y gerentes ya que permite
 * crear usuarios con distintos roles.
 */
import React from "react";
// @material-ui/core components
import SedeService from '../../services/sedes'

import FormNewSede from '../../components/FormNewSede'
import Toast from '../../components/Toast'
import FormHandler from '../../variables/formHandler'

export default function CreateSede() {
  const [state, setState] = React.useState({})
  const [message, setMessage] = React.useState(null)
  
  const addSede = async (event) =>{
    event.preventDefault()
    // Verificación todo está lleno
    if (Object.keys(state).length === 4) {
      const direccionInUse = await SedeService.getByDireccion(state.direccion)
      
      if (direccionInUse) {
        const _copyState = JSON.parse(JSON.stringify(state))
        _copyState.errorDireccion = 'Direccion ya existente'
        setState(_copyState)
      } else {
        // Objeto del nuevo usuario
        const newSede = {
            direccion: state.direccion,
            hora_apertura: state.hora_apertura,
            hora_cierre: state.hora_cierre,
            descripcion:  state.descripcion,
            latitud: state.latitud,
            longitud: state.longitud
        }

        try {
          const result = await SedeService.create(newSede)
          setMessage('Sede creada correctamente')

        } catch (err) {
          setMessage('Algo ha salido mal')
          console.log(err)
        }
        // Quitar el mensaje despues de 4 segundos
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      }
    } else  {
      setMessage('Hay campos sin rellenar')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }
  return (
    <React.Fragment>
      <FormNewSede
        handleFieldChange={(event) => FormHandler(state, setState, event)}
        handleSubmit={addSede}
        state={state}
      />
      <Toast
        message={message}
        vertical='bottom'
        horizontal='center' 
      />
    </React.Fragment>
  );
}