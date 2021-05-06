import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import { GRID_HEADER_CELL_SEPARATOR_RESIZABLE_CSS_CLASS } from '@material-ui/data-grid'

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
					<TextField id={props.id} label={props.label} />
				</Grid>
			</Grid>

		</div>
	)
}

export default CustomTextField