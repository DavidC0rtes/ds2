import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { emphasize, withStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Chip from '@material-ui/core/Chip'
import HomeIcon from '@material-ui/icons/Home'
import UserIcon from '@material-ui/icons/Person'
import AssessmentIcon from '@material-ui/icons/Assessment';
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
    backgroundColor: 'black',
    paddingBottom: '1rem',
    paddingTop: '.5rem',
    color: 'white',
    '& img': {
      maxWidth: '1vw',
      heigth: '1vh',
      float: 'left'
    },
    '& h6 + img': {
      clear: 'left'
    },
    Typography: {
      color: 'white'
    },
    '& :active': {
      color: 'white'
    },
    position: 'sticky',
    top: 0,
    zIndex: 10000
}

const imgStyle = {
  width: '2vw',
  heigth: '2vh',
  float: 'left'
}

const NavBar = () => {
  const auth = useAuth()

  return (
    <Breadcrumbs aria-label="breadcrumb" style={breadCrumbStyle}>
        <img style={imgStyle} src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Univalle.svg/1200px-Univalle.svg.png"/>
        
        <Typography 
          variant="h6" 
          component={Link} to="/"
          style={breadCrumbStyle.Typography}
          >
            UNIVALLE FRIED CHICKEN
        </Typography>
        
      <StyledBreadcrumb component={Link} to="/menu" label="Menú"/>
      <StyledBreadcrumb component={Link} to="/sedes" label="Sedes" onClick={handleClick} />
      {
        auth.user && 
        <StyledBreadcrumb 
            component={Link} 
            to={`/perfil?mail=${auth.user.email}`}
            label="Pérfil" 
            icon={<UserIcon fontSize="small"/>}
          />
      }
      
      {
        !auth.user && 
        <StyledBreadcrumb component={Link} to="/login" label="Iniciar sesión" />
      }
      {
        !auth.user && 
        <StyledBreadcrumb component={Link} to="/registrarse" label="Crear cuenta" />
      }
      {
        auth.user && auth.user.rol !== 'Cliente' &&
        <StyledBreadcrumb
          component={Link}
          to="/admin/dashboard"
          label="Panel de control"
          icon={<AssessmentIcon />}
        />
      }
      {
        auth.user && 
        <StyledBreadcrumb 
          component={Link} 
          to="/"
          label="Cerrar sesión" 
          onClick={auth.logout}
        />
      }

      
    </Breadcrumbs> 
  )
}

export default NavBar 
