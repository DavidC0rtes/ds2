import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import CustomCarousel from '../components/Card/Carousel'


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

const items = [
  {
      Name: "Apanados",
      Caption: "Crujientes por fuera, suaves por dentro.",
      contentPosition: "left",
      Items: [
          {
              Name: "Nuggets apanados con palitos de queso",
              Image: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          },
          
      ]
  },
  {
      Name: "Asados caseros",
      Caption: "Nuestras recetas",
      contentPosition: "left",
      Items: [
          {
              Name: "Filetes de pollo",
              Image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
          },
          {
              Name: "Pinchos asados",
              Image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
          }
      ]
  },
  {
      Name: "Variedades",
      Caption: "¡Hamburguesas, cervezas, ensaladas y mucho más!",
      contentPosition: "right",
      Items: [
          {
              Name: "Hamburguesa en combo",
              Image: "https://images.unsplash.com/photo-1584440772680-63bec399984b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
          },
          {
              Name: "Selección de cervezas",
              Image: "https://images.unsplash.com/photo-1505075106905-fb052892c116?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          }
      ]
  }
]

function Inicio() {
  const classes = useStyles()

  return (
      <div style={{backgroundColor: '#fff'}}>
        <CustomCarousel items={items} />
      </div>
  );
}

export default React.memo(Inicio);