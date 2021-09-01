import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControl from '@material-ui/core/FormControl';

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
 * Se define el menu
 * @param {array} values : valores del menu
 * @returns 
 */
const simpleMenu = ( props ) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const {values, errors, handleChange, state, label, name, disable} = props
    
    const toggleSelect = () => {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="label-select">{label}</InputLabel>
                <Menu
                    labelId="label-select"
                    id={name}
                    name={name}
                    open={open}
                    value={state}
                    required
                    error={errors && 'Campo obligatorio'}
                    onClose={toggleSelect}
                    onOpen={toggleSelect}
                    onChange={handleChange}
                    style={{width:'60%', height:'100%'}}
                    disabled={disable}
                    >
                    {values.map((value, index) => 
                        <MenuItem key={index} value={value} > {value} </MenuItem>
                     )}
                </Select>
                
            </FormControl>
        </div>
    )
}

export default simpleMenu
}