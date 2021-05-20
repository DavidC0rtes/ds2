import React, {useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import GradeIcon from '@material-ui/icons/Grade'

import ProfileForm from '../../components/Forms/ProfileForm'
import { useAuth } from '../../misc/useAuth'
import users from '../../services/users'

const useStyles = makeStyles((theme) => ({
	header: {
		marginTop: '2%',
		padding: '1%',
		textTransform: 'none',
		backgroundColor: 'inherit'
	},
	profile: {
		justifyContent: 'center',
		position: 'relative',
	},
	profileCard: {
		display: 'block',
		textAlign: 'center',
		padding: '0 1% 2% 1%',
		backgroundColor: '#fff39d'
	}, 
	avatar: {
		margin: 'auto',
		width: theme.spacing(10),
		height: theme.spacing(10),
		marginBottom: '1em',
		backgroundColor: '#da0a0a'
	}
}))

const Perfil = () => {
	const classes = useStyles()
	const auth = useAuth()
	const user = auth.user

	const [userData, setUserData] = useState({})
	/**
	 * Apenas carga la view trae los datos del usuario desde la db,
	 * para poder popular el formulario.
	 */
	useEffect(() => {
		const fetchUser = async () => {
			const result = await users.getByEmail(user.email, 'get')
			result.id_info.email = user.email
			result.id_info.id_rol = result.id_rol.id
			delete result.id_info.id
			setUserData(result.id_info)
		}
		fetchUser()
	}, [])

	return (
		<div>
			<Container maxWidth="md">
				<Paper elevation={0} className={classes.header}>
					<Typography variant="subtitle1">Perfil de usuario</Typography>
				</Paper>

				<hr ></hr>

				<Grid container spacing={2}>
					<Grid item xs={9}>
						<Paper>
							<ProfileForm user={userData}/>
						</Paper>
					</Grid>

					<Grid item xs={3} className={classes.profile}>
						<Paper elevation={3} className={classes.profileCard}>
							<Avatar children={userData.primer_nombre} className={classes.avatar}/>
							<Chip
								size="small" 
								label={user.rol} 
								style={{marginBottom: '1em', fontWeight: 'bold'}}
								color=
									{ 
										(user.rol == 'Administrador' || user.rol == 'Gerente')
										? ('primary')
										: ('default')
									}
								icon = { user.rol == 'Gerente' ? (<GradeIcon />) : null }
								
								/>
							<Grid item xs={12} children={userData.primer_nombre + ' ' + userData.primer_apellido} />
							<Grid item xs={12} children={user.email} />
						</Paper>
					</Grid>
				</Grid>
				
			</Container>
		</div>
	)
}

export default Perfil