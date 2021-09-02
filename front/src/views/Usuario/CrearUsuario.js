/**
 * Este archivo actúa igual que SignUp.js, la diferencia es que este 
 * es solo para administradores y gerentes ya que permite
 * crear usuarios con distintos roles.
 */
import React from "react";
// @material-ui/core components
import userService from '../../services/users'

import FormNewUser from '../../components/FormNewUser'
import Toast from '../../components/Toast'
import FormHandler from '../../variables/formHandler'


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

export default function CreateUser() {
  const [state, setState] = React.useState({})
  const [message, setMessage] = React.useState(null)
  
  const addUser = async (event) =>{
    event.preventDefault()
    // Verificación todo está lleno
    if (Object.keys(state).length === 5) {
      const emailInUse = await userService.getByEmail(state.email)
      
      if (emailInUse) {
        const _copyState = JSON.parse(JSON.stringify(state))
        _copyState.errorEmail = 'Correo electrónico en uso'
        setState(_copyState)
      } else {
        // Objeto del nuevo usuario
        const newUser = {
          email: state.email,
          id_rol: getIdRol(state.rol),
          password: state.password,
          info: {
            primer_nombre: state.firstName,
            primer_apellido: state.lastName
          }
        }

        try {
          const result = await userService.create(newUser)
          setMessage('Usuario creado correctamente')

        } catch (err) {
          setMessage('Algo ha salido mal')
          console.error(err)
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
      <FormNewUser
        handleFieldChange={(event) => FormHandler(state, setState, event)}
        handleSubmit={addUser}
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