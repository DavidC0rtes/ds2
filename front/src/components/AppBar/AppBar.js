import React from 'react'
import {
	AppBar,
	makeStyles,
	Typography,
	Toolbar,
	Button,
	withStyles
} from '@material-ui/core'

import DialogSelect from 'components/Dialog/DialogSelect'

import { Link } from 'react-router-dom'

import { useAuth } from '../../misc/useAuth'

import { useSede } from '../../misc/useSede'

//https://i.postimg.cc/4xkHN1xm/chickenlogo-removebg-preview.png
const SimpleAppBar = () => {
	const auth = useAuth()
	const classes = useStyles()
	return (
		
			<AppBar position="sticky" className={classes.root}>
				<Toolbar className={classes.toolbar}>
				<img className={classes.logo} src="https://i.postimg.cc/yNpPwzwg/pollo-logo-1.png"/>
					<Typography
						variant="h5"
						component={Link} to="/"
						className={classes.title}
					>
						UFC
					</Typography>
					<DialogSelect />
					<StyledButton component={Link} to="/menu">Menú</StyledButton>

					{ auth.user && auth.user.rol == 'Cliente' &&

					<StyledButton component={Link} to="/client/dashboard">Pedido</StyledButton>
					}
					
					{!auth.user && 
						<StyledButton component={Link} to="/login">Iniciar sesión</StyledButton>
					}
					
					{!auth.user && 
						<StyledButton component={Link} to="/registrarse">Crear cuenta</StyledButton>
					}		
					{auth.user && 
						<StyledButton component={Link} to={`/perfil?mail=${auth.user.email}`}>Pérfil</StyledButton>
					}

					

					{ auth.user && auth.user.rol !== 'Cliente' &&

						<StyledButton component={Link} to="/admin/dashboard">Gestión</StyledButton>
					}
					
					{auth.user && 
						<StyledButton component={Link} to="/" onClick={auth.logout}>Cerrar sesión</StyledButton>
					}

				</Toolbar>
			</AppBar>
	
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	toolbar: {
		backgroundColor: 'black',
		color: 'white',
		height: '15vh',
	},
	title: {
		flexGrow: 3,
		'&:visited': {
			color: 'white',
			textDecoration: 'none'
		},
		'&:hover': {
			color: 'white',
			textDecoration: 'none',
		},
		color: 'white',
		paddingLeft: '1em'
	},
	logo: {
		float: 'left',
		height: '90%'
	},
	appbar: {
		top: 0,
		position: 'sticky'
	}
	
}))

const StyledButton = withStyles((theme) => ({
	root: {
		color:'white',
		backgroundColor: '#8b0000',
		borderRadius: 0,
		'&:visited': {
			textDcoration: 'none',
			color: 'white'
		},
		'&:hover': {
			textDcoration: 'none',
			color: 'white'
		},
	}
}))(Button)

export default SimpleAppBar