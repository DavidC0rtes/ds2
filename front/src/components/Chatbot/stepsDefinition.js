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
		  message: 'Listo! Por favor, ¡escoge lo que gustes! y cuando termines escribe Listo',
		  trigger: 'productos',
	  },
	  {
		  id: 'productos',
      component: <Categories />,
      end: true
	  },
    {
      id: 'checkout',
      user: true,
      trigger: 'lct',
    },
    {
      id: 'lct',
      message: 'Te redireccionaré al carrito de compras.',
      trigger: goToView
    },
    {
      id: 'end',
      message: 'muchas gracias!',
      end: true,
    }
]

const goToView = () => {
  const history = useHistory()
  history.replace("/client/cart")
  return 'end'
}

export default steps