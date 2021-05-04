import React, {useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DataTable from '../../components/Table/DataGrid'
import userService from '../../services/users'

const styles = {
  AppBarClass: {
    marginTop: "-80px",
    backgroundColor: "#00acc1"
  }
};

const useStyles = makeStyles(styles);

export default function UsersTable() {
  const [users, setUsers] = useState([])
  const headers = [
    { field: 'id', headerName: 'ID', width:70},
    { field: 'activo', headerName: 'Activo', width:100, type:'boolean'},
    { field: 'rol', headerName: 'Rol', width: 150},
    { field: 'email', headerName: 'Correo electrónico', width: 200},
    { field: 'primer_nombre', headerName: 'Primer nombre', width: 200},
    { field: 'primer_apellido', headerName: 'Primer apellido', width: 200},
    // Este campo define un link al perfil del usuario en valueGetter. 
    // Se debe utilizar react-router para realizar este redireccionamiento.
    {
      field: 'profile', 
      headerName: 'Pérfil',
      description: 'Link al pérfil del usuario',
      sortable: false,
      width: 100,
      valueGetter: (params) => `perfil/${params.getValue('id')}`
    }
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
        item.primer_nombre = item.id_info.primer_nombre
        item.primer_apellido = item.id_info.primer_apellido
        delete item.id_info
        delete item.id_rol
      })
      setUsers(result)
    }

    fetchUsers()
  }, [])

  console.log(users)

  const classes = useStyles();
  return (
    <React.Fragment>
      <DataTable
        rows={users}
        columns={headers}
        pageSize={10}
      />
    </React.Fragment>
  );
}