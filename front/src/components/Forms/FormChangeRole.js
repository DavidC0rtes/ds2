import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormHandler from 'variables/formHandler'

import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	}
}))

const FormChangeRole = ({currentRole}) => {
	const classes = useStyles()
	const [role, setRole] = useState()

	const handleFieldChange = (event) => FormHandler(role, setRole, event)
	let roles = {
		'Gerente': 1,
		'Administrador': 2,
		'Cliente': 3
	}

	delete roles[currentRole]
	return(
		<form className={classes.container}>
			<FormControl className={classes.formControl}>
				<InputLabel id="label-role">Rol</InputLabel>
				<Select
					id="select-role"
					labelId="label-role"
					value={role}
					input={<Input />}
					onChange={handleFieldChange}
				>
				{roles['Gerente'] && <MenuItem value={roles['Gerente']}>Gerente</MenuItem>}
				{roles['Administrador'] && <MenuItem value={roles['Administrador']}>Administrador</MenuItem>}
				{roles['Cliente'] && <MenuItem value={roles['Cliente']}>Cliente</MenuItem>}
				</Select>
			</FormControl>
		</form>
	)
}

export default FormChangeRole