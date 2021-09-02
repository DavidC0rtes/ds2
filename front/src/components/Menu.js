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
 * Se define el menu, un menu simple que toma los elementos y cuyo event handlers tienen que definirse donde se use
 * I.E Categoria.js define un menu de dos elementos donde un elemento abre un modal y el otro borra la categoria.
 * @param {array} values : valores del menu
 * @returns 
 */
const SimpleMenu = ( props ) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };
    
    const handleClose = (event) => {
        setAnchorEl(null);
        event.stopPropagation();

    };
    
    const {values, errors, handleItemClick, state, label, name, disable} = props

    return (
        <div>
            <FormControl className={classes.formControl}>
            <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
      >
            <MoreVertIcon />
            </IconButton>
                <Menu
                    id={name}
                    name={name}
                    open={open}
                    anchorEl={anchorEl}
                    
                    value={state}
                    onClose={handleClose}
                    style={{width:'60%', height:'100%'}}
                    disabled={disable}
                    >
                    {values.map((value, index) => 
                        <MenuItem key={index} value={value} onClick={(event) => handleItemClick(value, event)} > {value} </MenuItem>
                     )}
                </Menu>
                
            </FormControl>
        </div>
    )
}

export default SimpleMenu
