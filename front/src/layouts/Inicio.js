import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import CardCarrousel from '../components/Card/CardCarrousel'

const useStyles = makeStyles({
    root: {
        border: '1px solid black',
        marginTop: '3em',
        background: '#b30000',
        color: 'white'
    }
})

function Inicio() {
  const classes = useStyles()
  return (
      <div>
        <Container maxWidth="md" className={classes.root}>
            <h2>¡Prueba nuestras deliciosas recetas!</h2>
        </Container>
        <CardCarrousel />
      </div>
  );
}

export default React.memo(Inicio);
