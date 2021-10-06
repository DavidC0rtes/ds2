import React from 'react'
import SedesGrid from 'components/Grid/SedesGrid'
import Categories from 'views/Producto/Productos'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const redirect = (id) => id

const steps = [
	{
        id: '1',
        message: 'Hola, ¿en qué puedo ayudarte?',
        trigger: '2',
      },
      {
        id: '2',
        options: [
          { value: 2, label: 'Sedes del restaurante', trigger: 3 },
          { value: 4, label: 'Promociones', trigger: 'proximamente' },
          { value: 3, label: 'Quiero hacer un pedido', trigger: '5' },
        ],
      },
      {
        id: 3,
        message: 'Estas son nuestras sedes',
        trigger: 'sedes',
      },
      {
        id: 'sedes',
        component: <SedesGrid />,
        trigger: setTimeout(redirect('2'), 15000)
      },
      {
        id: 'proximamente',
        message: 'TBD',
        end: true
      },
	  {
		  id: '5',
		  message: 'Listo! Por favor, ¡escoge lo que gustes!',
		  trigger: 'productos',
	  },
	  {
		  id: 'productos',
      component: <Categories />,
      trigger: 'checkout'
	  },
    {
      id: 'checkout',
      component: <Redirect text={"¡Dame clic cuando termines!"} dest={"/client/cart"} />,
      trigger: 'end',
    },
    {
      id: 'end',
      message: 'muchas gracias!',
      end: true,
    }
]

const Redirect = ({text, dest}) => {
  return (
    <Link to={dest}>{text}</Link>
  )
}

export default steps