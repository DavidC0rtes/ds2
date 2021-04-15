import React from 'react'
import { Link } from 'react-router-dom'
import { emphasize, withStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Chip from '@material-ui/core/Chip'
import HomeIcon from '@material-ui/icons/Home'
import UserIcon from '@material-ui/icons/Person'
import { Typography } from '@material-ui/core'

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const NavBar = () => {
    return (
    
    <Breadcrumbs aria-label="breadcrumb">
        <Typography variant="h6">Restaurante</Typography>
        <StyledBreadcrumb
        component={Link}
        to="/"
        label="Inicio"
        icon={<HomeIcon fontSize="small" />}
      />
      <StyledBreadcrumb component={Link} to="/menu" label="Menú" onClick={handleClick} />
      <StyledBreadcrumb component={Link} to="/sedes" label="Sedes" onClick={handleClick} />
      <StyledBreadcrumb
        component={Link}
        to="/login"
        label="Iniciar sesión"
        icon={<UserIcon fontSize="small" />}
      />
    </Breadcrumbs>
    )
}

export default NavBar 