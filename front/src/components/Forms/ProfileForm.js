import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import FormHandler from '../../variables/formHandler'
import userService from '../../services/users'
import Toast from '../Toast'
import AlertDialog from '../Dialog/AlertDialog'

import { makeStyles } from '@material-ui/core/styles';

/**
 * Estilos del formulario
 * @param {*} param0 
 * @returns 
 */
const useStyles = makeStyles({
	root:{
		'& input': {
			'&:disabled': {
				color: 'black',
				backgroundColor: 'white'
			}
		},
		padding: '1%',

		Button : {
			fontSize: '1rem'
		}
	},
	helperText: {
		color: 'red',
		fontWeight: 'bolder'
	}
})
/**
 * Se encarga de construir y manejar el formulario que se le presenta al usuario
 * en /perfil
 * 
 * @param {props} user, recibe como props un objeto con toda la información del usuario.
 * @returns formulario del pérfil del usuario
 */
const ProfileForm = ({ user }) => {
	/**
	 * state se encarga de guardar la información
	 * insertada en el formulario. Su valor inicial
	 * es la información del usuario traída desde la db.
	 */
	const [state, setState] = useState(user)
	const [message, setMessage] = useState(null)
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
		// Convertir cumpleaños a hora local
		if (toSend.birthday) {
			const date = toSend.birthday.split('-')
			toSend.birthday = new Date(...date)
		}

		const result = await userService.update(toSend, user.id)
		if (result.status === 200) {
			setMessage('¡Actualizado con éxito!')
		} else {
			setMessage('Ha ocurrido un error')
			console.error(result)
		}
		setTimeout(() => {
			setMessage(null)
		}, 5000)
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

	
	const toggleAccount = async (event) => {
		event.preventDefault()
				
		if (getState('activo') !== '') {

			const toSend = {
				activo: !user.activo
			}
			const result = await userService.update(toSend, user.id)
			if (result.status === 200) {
				setMessage('¡Actualizado con exito!')
			} else {
				setMessage('Ha ocurrido un error')
			}
			setTimeout(() => {
				setMessage(null)
			}, 4000)
		}
	}

	/**
	 * Retorna atributos del estado, debido a que el estado
	 * se popula con promesas asincronas hay momentos donde este estado
	 * puede ser undefined y tirar TypeError, por ende primero se hace la validación.
	 * @param {string} key 
	 * @returns 
	 */
	const getState = (key) => {
		if (state) {
			return state[key]
		}
		return ''
	}

	const handleFieldChange = (event) => FormHandler(state, setState, event) 
	const classes = useStyles()
	return (
		<>
		<form validate="true" onSubmit={handleSubmit} className={classes.root} autoComplete="off">
			<Grid container spacing={2}>
				<Grid item xs={12} md={6} >
					<TextField
						name="primer_nombre"
						label="Primer nombre"
						InputLabelProps={{ shrink: true }}
						error={ getState('errorFirstname') }
						value={ getState('primer_nombre') }
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
						error={ getState('errorMiddlename') }
						value={ getState('segundo_nombre') }
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
						error={ getState('errorLastname') }
						variant="filled"
						value={ getState('primer_apellido') }
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
						error={ getState('errorSA') }
						value={ getState('segundo_apellido') }
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
						error={ getState('errorEmail') }
						value={ getState('email') }
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
					/>
				</Grid>
				
				<Grid item xs={10} md={6}>
					<TextField
						name="num_documento"
						label="Cédula de ciudadanía"
						type="tel"
						value={ getState('num_documento') }
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						name="birthday"
						label="Fecha de cumpleaños"
						type="date"
						value={ getState('birthday') }
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
						value={ getState('direccion') }
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
						type="tel"
						disabled={disable}
						value={ getState('telefono') }
						placeholder="###"
						fullWidth
						variant="filled"
						onChange={handleFieldChange}
						InputLabelProps={{ shrink: true }}
						inputProps={{ pattern: "[0-9]{7,12}" }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="password"
						type="password"
						label="Contraseña"
						InputLabelProps={{ shrink: true }}
						error={ getState('errorPassword') }
						helperText="Llena este campo sólo si deseas cambiar tu contraseña"
						value={ getState('password') }
						disabled={disable}
						variant="filled"
						fullWidth
						onChange={handleFieldChange}
						FormHelperTextProps={{
							className: classes.helperText
						}}
					/>
				</Grid>
				<Grid item xs={6} md={2}>
					<AlertDialog
						message="¿Estas seguro?"
						agreeTxt="Sí"
						disagreeTxt="No"
						btnTxt={ getState('activo') ? 
						'Desactivar cuenta' 
						:'Activar cuenta'
						}
						doAction={toggleAccount}
					>

					</AlertDialog>
				</Grid>
				<Grid item xs={6} md={2}>
					<Button variant="contained" color="secondary" onClick={toggleEdit}>
						{disable ? 'Editar' : 'Cancelar'}
					</Button>
				
				</Grid>
				{!disable && 
					<Grid item  xs={6} md={2}>
						<Button variant="contained" type="submit" color="primary">Guardar</Button>
					</Grid>	
				}
			</Grid>
		</form>
		<Toast
			message={message}
			vertical='bottom'
			horizontal='center'
		/>
		</>
	)
}

export default ProfileForm