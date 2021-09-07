import React from 'react'
import { 
	makeStyles,
	Grid
} from '@material-ui/core'


const Footer = () => {
	const classes = useStyles()

	return (
		<Grid container className={classes.root}>
			<Grid item xs className={classes.content}>

				Acerca de nosotros

			</Grid>

			<Grid item xs className={classes.content}>
				Contáctanos
			</Grid>

			<Grid item xs className={classes.content}>
				Trabaja con nosotros
			</Grid>
		</Grid>
	)
}


const useStyles = makeStyles({
	root: {
		bottom: 0,
		width: '100%',
		backgroundColor: 'black',
		color: 'white',
		heigth: '100%'
	},
	content: {
		padding: '5% 10%'
	}
})

export default Footer