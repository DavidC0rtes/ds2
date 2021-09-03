import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import CardCarrousel from '../components/Card/CardCarrousel'


const useStyles = makeStyles(() => ({
    header: {
        border: '1px solid black',
        background: '#b30000',
        color: 'white',
        zIndex: '-1'
    },
    actionArea: {
      borderRadius: '16px',
    },
    content: ({ color }) => {
      return {
        background: color,
      };
    },
    title: {
      color: '#fff',
      fontSize: '1.5rem'
    },
    subtitle: {
      color: '#fff',
      marginTop: '1.5rem',
      fontWeight: 500,
      fontSize: 14
    },

    media: {
      height: '400px',
    }
}))

function Inicio() {
  const classes = useStyles()
 
  return (
      <div style={{backgroundColor: '#3f2b1f'}}>
        <Container maxWidth="md" className={classes.header}>
            <h2>¡Prueba nuestras deliciosas recetas!</h2>
        </Container>
        <CardCarrousel />
      </div>
  );
}

export default React.memo(Inicio);
