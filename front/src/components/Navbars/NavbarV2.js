import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { emphasize, withStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Chip from '@material-ui/core/Chip'
import HomeIcon from '@material-ui/icons/Home'
import UserIcon from '@material-ui/icons/Person'
import AssessmentIcon from '@material-ui/icons/Assessment';
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

// Sesión del usuario
import { useAuth } from '../../misc/useAuth'


const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: '#b30000',
    height: theme.spacing(3),
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: 14,
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
}

const breadCrumbStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
}

const NavBar = () => {
  const auth = useAuth()

  return (
    <Breadcrumbs aria-label="breadcrumb" style={breadCrumbStyle}>
        <Typography variant="h6">Restaurante</Typography>
        <StyledBreadcrumb
        component={Link}
        to="/"
        label="Inicio"
        icon={<HomeIcon fontSize="small" />}
      />
      <StyledBreadcrumb component={Link} to="/categorias" label="Categorias" />
      <StyledBreadcrumb component={Link} to="/menu" label="Menú"/>
      <StyledBreadcrumb component={Link} to="/sedes" label="Sedes" onClick={handleClick} />
    
      {auth.user ? (
        <Breadcrumbs style={breadCrumbStyle}>
          
          {
            auth.user.rol !== 'Cliente' &&
            <StyledBreadcrumb
              component={Link}
              to="/admin/dashboard"
              label="Panel de control"
              icon={<AssessmentIcon />}
            />
          }
          <StyledBreadcrumb 
            component={Link} 
            to="/perfil" 
            label="Pérfil" 
            icon={<UserIcon fontSize="small"/>}
          />
          <StyledBreadcrumb 
            component={Link} 
            to="/" 
            label="Cerrar sesión" 
            onClick={auth.logout}
          />
          <span>{auth.user.rol}</span>
        </Breadcrumbs>

      ) : (
        <Breadcrumbs style={breadCrumbStyle}>
        <StyledBreadcrumb component={Link} to="/login" label="Iniciar sesión" />
        <StyledBreadcrumb component={Link} to="/registrarse" label="Crear cuenta" />
        
        </Breadcrumbs>
      )}

      
    </Breadcrumbs> 
  )
}

export default NavBar 
