import React from 'react'
import SedesGrid from 'components/Grid/SedesGrid'
import Categories from 'views/Producto/Productos'

const steps = [
	{
        id: '1',
        message: 'Hola, ¿en qué puedo ayudarte?',
        trigger: '2',
      },
      {
        id: '2',
        options: [
          { value: 5, label: 'Sedes del restaurante', trigger: '3' },
          { value: 4, label: 'Promociones', trigger: 'proximamente' },
          { value: 3, label: 'Quiero hacer un pedido', trigger: 'pedido' },
        ],
      },
      {
        id: '3',
        message: 'Estas son nuestras sedes',
        trigger: 'sedes',
      },
      {
        id: 'sedes',
        asMessage: true,
        component: <SedesGrid />,
        trigger: 'volver'
      },
      {
        id: 'proximamente',
        message: 'TBD',
        trigger: 'volver'
      },
	  {
		  id: 'pedido',
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
      options: [
        {value: 100, label: 'Cuando acabes dame clic', trigger: () => {
          location = "/client/cart"
          return 'end'
          }}
      ],
    },
    {
      id: 'end',
      message: 'Hasta luego 👋',
      end: true
    },
    {
      id: 'volver',
      message: '¿En que más puedo ayudarte?',
      trigger: 'options2',
    },
    {
      id: 'options2',
      options: [
        { value: 6, label: 'Nada más', trigger: 'end' },
        { value: 7, label: 'Sedes del restaurante', trigger: '3' },
        { value: 8, label: 'Quiero hacer un pedido', trigger: 'pedido' },
        { value: 9, label: 'Promociones', trigger: 'proximamente' }
      ]
    }
]

export default steps