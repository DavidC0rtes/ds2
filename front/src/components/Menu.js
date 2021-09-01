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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const {values, errors, handleChange, state, label, name, disable} = props

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
                    labelId="label-menu"
                    id={name}
                    name={name}
                    open={open}
                    anchorEl={anchorEl}
                    keepMounted
                    value={state}
                    onClose={handleClose}
                    style={{width:'60%', height:'100%'}}
                    disabled={disable}
                    >
                    {values.map((value, index) => 
                        <MenuItem key={index} value={value} onClick={handleClose} > {value} </MenuItem>
                     )}
                </Menu>
                
            </FormControl>
        </div>
    )
}

export default simpleMenu
