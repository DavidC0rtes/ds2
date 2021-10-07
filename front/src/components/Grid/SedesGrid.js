import React , { useEffect, useState } from 'react'
import sedeService from '../../services/sedes'
import {
	Grid,
	Paper
} from '@material-ui/core'

const SedesGrid = () => {
	const [sedes, setSedes] = useState([])

	useEffect(async() => {
		const result = await sedeService.getAll()
		const _state = JSON.parse(JSON.stringify(sedes))
		setSedes(Object.assign(_state, result))
	},[])

	return (
		<Grid container spacing={2}>
			{sedes.map((sede, i) => <Sede key={i} sede={sede} />)}
		</Grid>
	)
}

const Sede = ({sede}) => {
	return (
		<Grid item xs={6} style={{maxWidth: '15vw'}}>
			<Paper elevation={3} style={paperStyle}>
				<address>{sede.direccion}</address>
				<address>tel:{sede.telefono}</address>
				<section>
					<b>Horario Lunes a Domingo</b>
						<ul>
							<li>Apertura: <time>{dateFormatter(sede.hora_apertura)}</time></li>
							<li>Cierre: <time>{dateFormatter(sede.hora_cierre)}</time></li>
						</ul>
				</section>
			</Paper>
		</Grid>
	)
}

const dateFormatter = (date) => {
	let string
	//if (date >= 1200) date -= 1200

	const _temp = date.toString()
	string = (date >= 1000)
		? `${_temp.substr(0,2)}:${_temp.substr(2)}`
		: `${_temp.substr(0,1)}:${_temp.substr(1)}`
	
	return string
}

const paperStyle = {
	padding: '.5em',
	margin: '0',
	width: '100%',
	maxWidth: '20vw'
}
export default SedesGrid