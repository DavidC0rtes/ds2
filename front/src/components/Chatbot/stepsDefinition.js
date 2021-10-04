const steps = [
	{
        id: '1',
        message: 'Hola, ¿en qué puedo ayudarte?',
        trigger: '2',
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'Numeros de contacto', trigger: '4' },
          { value: 2, label: 'Sedes del restaurante', trigger: 3 },
          { value: 3, label: 'Quiero hacer un pedido', trigger: '5' },
        ],
      },
      {
        id: 3,
        message: '¡Proximamente!',
        trigger: '2',
		end: true
      },
      {
        id: '4',
        message: '¡Proximamente!',
        end: true,
      },
	  {
		  id: '5',
		  message: 'Listo!, por favor escoge una categoría',
		  trigger: '6',
	  },
	  {
		  id: '6',
		  options: [
			  { value: 1, label: 'Apanados', trigger: 3},
			  { value: 2, label: 'Combos', trigger: 3},
			  { value: 3, label: 'Ensaladas', trigger: 3},
			  { value: 4, label: 'Bebidas', trigger: 3},
			  { value: 5, label: 'Salchiespeciales', trigger: 3},
			  { value: 6, label: 'Almuerzos', trigger: 3},
			  { value: 7, label: 'Especiales', trigger: 3},
			  { value: 8, label: 'Asados', trigger: 3},
		  ]
	  },
]

export default steps