import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import CardCarrousel from '../components/Card/CardCarrousel'


const useStyles = makeStyles(() => ({
    header: {
        border: '1px solid black',
        marginTop: '3em',
        background: '#b30000',
        color: 'white'
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

const styleGif = {
  imgText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '3rem',
    color: 'black',
    fontWeight: 'bold'
  },
  container: {
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '40px',
    position: 'relative',
    backgroundImage: 'url(https://media3.giphy.com/media/QubjOLVGV6Uqw6WqiO/giphy.gif?cid=790b76110054d9bf433d77606167265d1b111d47f19b09b5&rid=giphy.gif&ct=g)',
    backgroundRepeat: 'repeat',
    backgroundSize: '300px',
    minHeight: '400px',
    maxWidth: '67vw',
    overflow: 'hidden',
    borderRadius: '8px'
  }
}

function Inicio() {
  const classes = useStyles()
 
  return (
      <div>
        <Container maxWidth="md" className={classes.header}>
            <h2>¡Prueba nuestras deliciosas recetas!</h2>
        </Container>
        <CardCarrousel />
      </div>
  );
}

export default React.memo(Inicio);
