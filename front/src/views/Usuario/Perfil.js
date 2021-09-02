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
import { useLocation } from 'react-router-dom'
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

// A custom hook that builds on useLocation to parse
// the query string for you. https://reactrouter.com/web/example/query-parameters
const useQuery = () => new URLSearchParams(useLocation().search)

const Perfil = () => {
	
	const classes = useStyles()
	const query = useQuery()

	const [userData, setUserData] = useState({})
	/**
	 * Apenas carga la view trae los datos del usuario desde la db,
	 * para poder popular el formulario.
	 */
	useEffect(() => {
		const fetchUser = async () => {
			const result = await users.getByEmail(query.get('mail'), 'get')

			let user = result[0].id_info
				? Object.assign(result[0].id_info)
				: {}
			
			user.rol = result[0].id_rol.nombre_rol
			user.password = result[0].password
			user.email = result[0].email
			user.activo = result[0].activo

			user.id = user.id_user
			delete user.id_user

			setUserData(user)
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
							<Avatar className={classes.avatar}>
                                {userData.primer_nombre}
                            </Avatar>
							<Chip
								size="small" 
								label={userData.rol} 
								style={{marginBottom: '1em', fontWeight: 'bold'}}
								color=
									{ 
										(userData.rol == 'Administrador' || userData.rol == 'Gerente')
										? ('primary')
										: ('default')
									}
								icon = { userData.rol == 'Gerente' ? (<GradeIcon />) : null }
								
								/>
							<Grid item xs={12}>
								{userData.primer_nombre + ' ' + userData.primer_apellido}
							</Grid>
							<Grid item xs={12}><strong>{userData.email}</strong></Grid>
						</Paper>
					</Grid>
				</Grid>
				
			</Container>
		</div>
	)
}

export default Perfil
