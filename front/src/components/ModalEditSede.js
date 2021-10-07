import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import sedeService from '../services/sedes'
import {useLoadScript} from "@react-google-maps/api"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import Toast from './Toast'


const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));



  const ModalNewSede = (props) => {
    let sede = {}
    sede.id = props.id
    sede.direccion = props.direccion
    sede.id_horario = props.id_horario
    sede.hora_apertura = props.hora_apertura
    sede.hora_cierre = props.hora_cierre
    sede.descripcion = props.descripcion

    const [state, setState] = useState(sede)
    const [open, setOpen] = useState(false);
	const [message, setMessage] = useState(null)
    const [checked, setChecked] = useState(true);
    const { isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCpAjZ9gvtVirroeofdUv3ei7lkBTkpEQY'  //Cambiar clave al probar que todo funcione
    });

 	// Actualizar state cada que el prop cambie.
     useEffect(() => setState(sede), [])   
     
     const getState = (key) => {
		if (state) {
			return state[key]
		}
		return ''
    }     

    const sedeModalHandler = (state, setState, event) => {
        const key = event.target.id ? event.target.id : event.target.name
        const _copyState = JSON.parse(JSON.stringify(state))
        _copyState[key] = event.target.value
        setState(_copyState)
    }

    const handleFieldChange = (event) => sedeModalHandler(state, setState, event) 
    const handleSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault()
		const toSend = {}
        Object.keys(state).forEach( async (key) => {
            console.log(state[key])
            console.log(state.direccion)
            if (key === 'direccion'){
                console.log("direcciones")
                toSend[key] = key
                var results = await getGeocode({address: state[key]})
                var coordinates = (await getLatLng(results[0]))
                const newCoordinates = {
                    lat: coordinates.lat,
                    lng: coordinates.lng
                }
                state.latitud = newCoordinates.lat
                state.longitud = newCoordinates.lng
                   
            }
            
            toSend[key] = state[key]
        })
        
        const result = await sedeService.update(toSend, sede.id_horario)
        if (result.status === 200) {
			setMessage('¡Actualizado con éxito!')
		} else {
            setMessage('Ha ocurrido un error')
			console.error(result)
        }
        setTimeout(() => {
			setMessage(null)
		}, 5000)

    }
    
    const classes = useStyles()
    const setAndCheck = () => {
        setChecked((prev) => !prev);
        props.handleFieldChange(checked)
    }
    const handleClickOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
        
    };
    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };

      const submitAndClose = () => {
          props.handleSubmit;
          handleClose;
      };

      return (
          <div>
              <IconButton variant="outlined" color="primary"  onClick ={handleClickOpen}>
                <EditIcon/>
              </IconButton>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Edicion de Sede</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                          La actualizacion es un proceso definitivo realizado al presionar el boton
                      </DialogContentText>
                      <form className={classes.form} validate="true" onSubmit={handleSubmit}>
                      <Grid container spacing={1}>
                      <Grid item xs={12}>
                          <TextField
                          error ={state.errorDireccion && true}
                          helperText={ state.errorDireccion}                          
                          name="direccion"
                          variant="outlined"
                          required
                          fullWidth
                          id="direccion"
                          label="Direccion"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('direccion')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                          error ={state.errorHoraApertura && true}
                          helperText={ state.errorHoraApertura}                              
                          name="hora_apertura"
                          variant="outlined"
                          fullWidth
                          id="hora_apertura"
                          label="Hora de Apertura"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('hora_apertura')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                          error ={state.errorHoraCierre && true}
                          helperText={ state.errorHoraCierre}                              
                          name="hora_cierre"
                          variant="outlined"
                          fullWidth
                          id="hora_cierre"
                          label="Hora de Cierre"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('hora_cierre')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                          error ={state.errorDescripcion && true}
                          helperText={state.errorDescripcion}                               
                          name="descripcion"
                          variant="outlined"
                          required                          
                          fullWidth
                          id="descripcion"
                          label="Descripcion"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('descripcion')}
                          />
                      </Grid>
                      </Grid>
                      <Button onClick ={handleClose} color="primary">
                          Cancelar
                      </Button>
                      <Button  type="submit" onClick={handleSubmit} color ="primary">
                          Actualizar
                      </Button>
                      </form>
                  </DialogContent>

              </Dialog>
              <Toast
			message={message}
			vertical='bottom'
			horizontal='center'
		/>
          </div>


      )
  }

  export default ModalNewSede