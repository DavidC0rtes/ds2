/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from "react";

import DataTable from '../../components/Table/DataGrid'
import userService from '../../services/users'
import CustomTextField from '../../components/CustomInput/Textfield'
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid'
import RegularButton from '../../components/CustomButtons/Button'
import QueryParams from '../../misc/QueryParameters'

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}


export default function UsersTable() {

  const [users, setUsers] = useState([]) // Almacena los usuarios traídos de la db.

  const [filter, setFilter] = useState('') // Almacena el valor del campo de busqueda.

  const [update, setUpdate] = useState(0) // Para saber si se le ha dado clic a "Actualizar"

  const previousUpdate = usePrevious(update)

  const headers = [

    { field: 'activo', headerName: 'Activo', width: 120, type: 'boolean' },
    { field: 'rol', headerName: 'Rol', width: 150 },
    {
      field: 'email',
      headerName: 'Correo electrónico',
      width: '300',
      renderCell: (params) => (
        <strong>
          <QueryParams
            url="/perfil?mail="
            param={params.value}
            text={params.value}>
          </QueryParams>
        </strong>
      )
    },
    { field: 'primer_nombre', headerName: 'Primer nombre', width: 200 },
    { field: 'primer_apellido', headerName: 'Primer apellido', width: 200 },
  ]


  /**
   * Este hook de efecto trae todos los usuarios de la db
   * en el momento en que se renderice la página.
   * Después itera por cada uno de los usuarios para que los datos
   * sean más trabajables.
   */
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await userService.getAll()
      result.forEach((item) => {
        
        delete item.password
        item.rol = item.id_rol.nombre_rol

        item.primer_nombre = ''
        item.primer_apellido = ''
        if (item.id_info) {
          item.primer_nombre = item.id_info.primer_nombre
          item.primer_apellido = item.id_info.primer_apellido
          delete item.id_info
        }

        delete item.id_rol
      })
      setUsers(result)
    }

    // Solo llamar a la función si se le ha dado click
    // al botón de actualizar.
    if (previousUpdate !== update) {
      fetchUsers()
    }
  }, [update])

  /**
   * Filtra los usuarios según el filtro en cualquiera de los campos.
   * Si no hay filtro devuelve todos los usuarios.
   */
  const usersToShow = filter
    ? users.filter( (user) =>
      user.email.match(new RegExp(filter, "i")) ||
      user.primer_nombre.match(new RegExp(filter, "i")) ||
      user.primer_apellido.match(new RegExp(filter, "i")) ||
      user.rol.match(new RegExp(filter, "i"))
    )
    : users


  return (
    <React.Fragment>
      <Grid container >
        <Grid item xs={10}>
          <CustomTextField
            id="txt-busqueda"
            label="Buscar"
            icon={<SearchIcon />}
            value={filter}
            handleChange={(event) => setFilter(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <RegularButton
            color="primary"
            size="sm"
            block={true}
            onClick={() => setUpdate(update + 1)}
          >
            Actualizar
          </RegularButton>
        </Grid>
      </Grid>

      <DataTable
        rows={usersToShow}
        columns={headers}
        pageSize={10}
      />
    </React.Fragment>
  );
}