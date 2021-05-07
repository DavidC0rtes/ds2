import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	root: {
		margin: '1% 0 1% 0'
	}
})

/**
 * Componente que define un campo de texto con un icono 
 * que lo acompañe (opcional)
 * 
 * props.icon : opcional, debe ser un objeto de tipo Icon de material-ui.
 * props.id : el id del campo de texto.
 * props.label : el texto que aparecerá como placeholder.
 * props.value : este campo de texto es controlado. Quiere decir que debe pasarsele 
 * una variable de estado de React mirar ConsultarUsuarios.js como ej
 */
const CustomTextField = (props) => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Grid container spacing={1} alignItems="flex-end" >
				{
					props.icon &&
					<Grid item>{props.icon}</Grid>  
				}
				<Grid item>
					<TextField 
						id={props.id} 
						label={props.label} 
						value={props.value} 
						onChange={props.handleChange}
					/>
				</Grid>
			</Grid>
		</div>
	)
}

export default CustomTextField