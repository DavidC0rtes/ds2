import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

/**
 * Se define el select
 * @param {array} values : valores del select 
 * @returns 
 */
const SimpleSelect = ( {values, errors, handleChange, state} ) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const toggleSelect = () => {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="label-select">Rol</InputLabel>
                <Select
                    labelId="label-select"
                    id="select-roles"
                    name="rol"
                    open={open}
                    value={state}
                    required
                    error={errors && 'Campo obligatorio'}
                    onClose={toggleSelect}
                    onOpen={toggleSelect}
                    onChange={handleChange}
                    >
                    {values.map((value, index) => 
                        <MenuItem key={index} value={value} > {value} </MenuItem>
                     )}
                </Select>
                
            </FormControl>
        </div>
    )
}

export default SimpleSelect