import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import SimpleSelect from '../Select'
import Button from '@material-ui/core/Button'

import FormHandler from '../../variables/formHandler'
import userService from '../../services/users'

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
 * Se encarga de construir y manejar el formulario que se le presenta al usuario
 * en /perfil
 * 
 * @param {props} user, recibe como props un objeto con la información del usuario 
 * @returns formulario del pérfil del usuario
 */
const ProfileForm = ({user}) => {
	/**
	 * state se encarga de guardar la información
	 * insertada en el formulario. Su valor inicial
	 * es la información del usuario traída desde la db.
	 */
	const [state, setState] = useState(user)
	const [disable, setDisable] = useState(true)

	// Actualizar state cada que el prop user cambie.
	useEffect(() => setState(user), [user])

	// Se llama cuando se unde "guardar"
	const handleSubmit = async (event) => {
		event.preventDefault()
		const toSend = {}

		// Añadir a toSend solo los campos que han cambiado
		Object.keys(state).forEach((key) => {
			if (state[key] !== user[key])
				toSend[key] = state[key]
		})
		const result = await userService.update(toSend, user.id_user)
		if (result.status === 200) {
			console.log('Actualizado con exito')
		}
		setDisable(true)
	}

	/**
	 * Maneja el intercambio entre editar/cancelar edición
	 * Cuando se cancela la edición el formulario debe volver
	 * a su estado inicial.
	 * @param {object} event 
	 */
	const toggleEdit = (event) => {
		event.preventDefault()
		if (disable === false) {
			setState(user)
			setDisable(true)
		} else {
			setDisable(false)
		}
	}

	const handleFieldChange = (event) => FormHandler(state, setState, event) 

	return (
		<>
		<form validate="true" onSubmit={handleSubmit} style={{padding: '1%'}} autoComplete="off">
			<Grid container spacing={2}>
				<Grid item xs={12} md={6} >
					<TextField
						name="primer_nombre"
						label="Primer nombre"
						InputLabelProps={{ shrink: true }}
						error={state.errorFirstname && true}
						value={state.primer_nombre || ''}
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12} md={6} >
					<TextField
						name="segundo_nombre"
						label="Segundo nombre"
						InputLabelProps={{ shrink: true }}
						error={state.errorMiddlename && true}
						value={state.segundo_nombre || ''}
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12} md={6} >
					<TextField
						name="primer_apellido"
						label="Primer apellido"
						InputLabelProps={{ shrink: true }}
						error={state.errorLastname && true}
						variant="filled"
						value={state.primer_apellido || ''}
						disabled={disable}
						onChange={handleFieldChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} md={6} >
					<TextField
						name="segundo_apellido"
						label="Segundo apellido"
						InputLabelProps={{ shrink: true }}
						error={state.errorSA && true}
						autoFocus
						value={state.segundo_apellido || ''}
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="email"
						label="Correo electrónico"
						InputLabelProps={{ shrink: true }}
						error={state.errorEmail && true}
						autoFocus
						value={state.email || ''}
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
					/>
				</Grid>
				
				<Grid item xs={2} md={2}>
					<SimpleSelect
						values={['CC', 'CE']}
						errors={state.errorTipoDoc}
						handleChange={() => 1+1}
						state={state.tipo_doc || 'CC'}
						label='Tipo documento'
						name='tipo_doc'
						disable={disable}
						onChange={handleFieldChange}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>
				<Grid item xs={10} md={5}>
					<TextField
						name="num_documento"
						label="No. identificación"
						type="tel"
						value={state.num_documento || ''}
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>
				<Grid item xs={12} md={5}>
					<TextField
						name="birthday"
						label="Fecha de cumpleaños"
						type="date"
						value={state.birthday || '2000-01-01'}
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>
				<Grid item xs={12} md={7}>
					<TextField
						name="direccion"
						label="Residencia"
						disabled={disable}
						value={state.direccion || ''}
						fullWidth
						variant="filled"
						onChange={handleFieldChange}
						InputLabelProps={{ shrink: true }}
					/>

				</Grid>
				<Grid item xs={12} md={5}>
					<TextField
						name="telefono"
						label="Teléfono"
						disabled={disable}
						value={state.telefono || ''}
						fullWidth
						variant="filled"
						onChange={handleFieldChange}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="password"
						type="password"
						label="Contraseña"
						InputLabelProps={{ shrink: true }}
						error={state.errorPassword && true}
						helperText="Llena este campo solo si deseas cambiar tu contraseña"
						autoFocus
						value={state.password || ''}
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={2}>
					<Button variant="contained" color="secondary" onClick={toggleEdit}>
						{disable ? 'Editar' : 'Cancelar'}
					</Button>
				
				</Grid>
				{!disable && 
					<Grid item xs={2}>
						<Button variant="contained" type="submit" color="primary">Guardar</Button>
					</Grid>	
				}
			</Grid>
		</form>
		</>
	)
}

export default ProfileForm