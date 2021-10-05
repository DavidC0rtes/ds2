import React, { useState, useEffect } from 'react'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Button,
	IconButton,
	makeStyles
} from '@material-ui/core'

//import FormHandler from '../../variables/formHandler'
import { useSede } from '../../misc/useSede'
import sedeService from '../../services/sedes'


const useStyles = makeStyles((theme) => ({
	container: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	formControl: {
	  margin: theme.spacing(2),
	  minWidth: 150,
	},
  }));

export default function DialogSelect() {
	const location = useSede()

	const [open, setOpen] = useState(false)
	const [state, setState] = useState({id: 0, direccion: ''})
	
	const handleClose = () => {
		if (location.sede)
			setOpen(false)
	}
	const handleOpen = () => setOpen(true)
	
	const handleChange = (event) => {
		const newState = JSON.parse(JSON.stringify(state))
		newState.id = event.currentTarget.getAttribute('data-value')
		newState.direccion = event.currentTarget.getAttribute('name')
		setState(newState)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (state.direccion !== '' && state.id !== 0) {
			location.set(state)
			setOpen(false)
			
		} else {
			const newState = JSON.parse(JSON.stringify(state))
			newState.error = true
			setState(newState)
		}
	}

	useEffect(async() => {
		if (!location.sede) {
			const allSedes = await sedeService.getAll()
			location.saveAll(allSedes)
			setOpen(true)
		}
	},[])

	/*const [
		openBtn,
		title, 
		description,
		label,
		items,
		callback
	] = props*/
	//const mainBtn = React.cloneElement(openBtn, {onClick: handleOpen})
	const classes = useStyles()
	return (
		<div>
			<IconButton aria-label="open" onClick={handleOpen}>
				<LocationOnOutlinedIcon style={{color: 'white'}}></LocationOnOutlinedIcon>
			</IconButton>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">{"Seleccionar sede"}</DialogTitle>
				<DialogContent>
					<DialogContent>
						{"Por favor, selecciona tu sede preferida."}
						<form className={classes.container} onSubmit={handleSubmit}>
							<FormControl className={classes.formControl} required>
								<InputLabel shrink id="dialog-select-label">{"Sedes disponibles"}</InputLabel>
								<Select
									labelId="dialog-select-label"
									id="dialog-select"
									value={state.direccion}
									renderValue={(value) => value}
									onChange={handleChange}
									error={state.error}
									required
									>
									{
										location.all.map((x) => {
											return (
												<MenuItem 
													key={x.id} 
													value={x.id}
													name={x.direccion}
													>
														{x.direccion}
												</MenuItem>
											)
										})
									}
								</Select>
							</FormControl>
						</form>
					</DialogContent>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSubmit} style={{color: '#8b0000'}} color="primary">
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}