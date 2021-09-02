import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import SimpleSelect from './Select'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CategoryModalHandler from '../variables/categoryModalHandler'
import categoryService from '../services/categories'

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


  
const modalEditCategory = (props) => {

    let category = {}
    category.id = props.categoryId
    category.nombre = props.nombre
    category.descripcion = props.descripcion

    const [state, setState] = useState(category)
    const [open, setOpen] = useState(false);
	const [message, setMessage] = useState(null)
    const [checked, setChecked] = useState(true);

 	// Actualizar state cada que el prop cambie.
     useEffect(() => setState(category), [])   
     
     const getState = (key) => {
		if (state) {
			return state[key]
		}
		return ''
	}     
    const handleFieldChange = (event) => CategoryModalHandler(state, setState, event) 
    const handleSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault()
		const toSend = {}
        Object.keys(state).forEach((key) => {
			if (state[key] !== category[key]) 
				toSend[key] = state[key]
		})
        const result = await categoryService.update(toSend, category.id)
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
    return (

    <div>
        <IconButton variant="outlined" color="primary"  onClick ={handleClickOpen}>
            <EditIcon/>
        </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar Categoria</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        *Se puede poner una descripcion aqui*
                        </DialogContentText>
                        <form className={classes.form} validate="true" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                    error ={getState('errorNombre') && true}
                                    helperText={ state.errorNombre}
                                    name="nombre"
                          variant="outlined"
                          required
                          fullWidth
                          id="nombre"
                          label="Nombre"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('nombre')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                          name="descripcion"
                          variant="outlined"
                          fullWidth
                          id="descripcion"
                          label="Descripción"
                          autoFocus
                          onChange={handleFieldChange}
                          value={getState('descripcion')}/>
                      </Grid>
                        <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>Inactiva</Grid>
                        <Grid item>
                            <Switch checked={getState('activo')} onChange={setAndCheck} name="checked"/>
                        </Grid>
                        <Grid item>Activa</Grid>
                      </Grid>
                      </Grid>
                      <Button onClick ={handleClose} color="primary">
                          Cancelar
                      </Button>
                      <Button  type="submit" onClick={handleSubmit} color ="primary">
                          Guardar
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

  export default modalEditCategory