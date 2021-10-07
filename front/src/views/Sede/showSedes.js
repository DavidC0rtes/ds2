/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from "react";
import DataTable from '../../components/Table/DataGrid'
import sedeService from '../../services/sedes'
import CustomTextField from '../../components/CustomInput/Textfield'
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid'
import RegularButton from '../../components/CustomButtons/Button'
import QueryParams from '../../misc/QueryParameters'
import {AppBar, Toolbar, Button} from '@material-ui/core';
import ModalNewSede from '../../components/ModalEditSede'
import AlertDialog from '../../components/Dialog/AlertDialog';
import { render } from "@testing-library/react";


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

function removeSede(event, params){
  event.stopPropagation();
  event.preventDefault();
  sedeService.removeById(params.row.id_horario)
}


  


export default function SedesTable(value, onValueChange) {

  const [sedes, setSedes] = useState([]) // Almacena los usuarios traídos de la db.

  const [filter, setFilter] = useState('') // Almacena el valor del campo de busqueda.

  const [update, setUpdate] = useState(0) // Para saber si se le ha dado clic a "Actualizar"

  const previousUpdate = usePrevious(update)

  const handleChange = (newValue) => {
    onValueChange(newValue);
  };

  const headers = [
    { field: 'direccion', headerName: 'Direccion', width: 150, id: 'direccion' },
    { field: 'hora_apertura', headerName: 'Hora de apertura', width: 150, id: 'hora_apertura' },
    { field: 'hora_cierre', headerName: 'Hora de cierre', width: 150, id: 'hora_cierre' },
    { field: 'descripcion', headerName: 'Descripcion', width: 300, id: 'descripcion' },
    {
      field: 'edicion',
      headerName: ' ',
      width: '100',
      renderCell: (params) => (
        <AlertDialog
						    message="¿Estas seguro? Esta acción no se puede deshacer."
						    agreeTxt="Sí"
						    disagreeTxt="No"
						    btnTxt={'e'}
						    doAction={(event) => removeSede(event, params)}>
				</AlertDialog>
      )
    },
    {
      field: '',
      headerName: '',
      width: '100',
      renderCell: (params) => (
        <ModalNewSede
        id={params.row.id}
        direccion={params.row.direccion}
        id_horario={params.row.id_horario}
        hora_apertura={params.row.hora_apertura}
        hora_cierre={params.row.hora_cierre}
        descripcion={params.row.descripcion}
        latitud={params.row.latitud}
        longitud={params.row.longitud}/>
        
      )
    },
  ]
  

  /**
   * Este hook de efecto trae todos los usuarios de la db
   * en el momento en que se renderice la página.
   * Después itera por cada uno de los usuarios para que los datos
   * sean más trabajables.
   */
  useEffect(() => {
    const fetchSedes = async () => {
      const result = await sedeService.getAll()
      console.log(result)
      
      result.forEach((item) => {
        item.id_direccion = item.direccion
        item.id_hora_apertura = item.hora_apertura
        item.id_hora_cierre = item.hora_cierre
        item.id_descripcion = item.descripcion
        item.id_lat = item.latitud
        item.id_lng = item.longitud
      })
      setSedes(result)
      
    }

    // Solo llamar a la función si se le ha dado click
    // al botón de actualizar.
    if (previousUpdate !== update) {
      fetchSedes()
    }
  }, [update])

  /**
   * Filtra los usuarios según el filtro en cualquiera de los campos.
   * Si no hay filtro devuelve todos los usuarios.
   */
  const sedesToShow = filter
    ? sedes.filter( (sede) =>
      sede.direccion.match(new RegExp(filter, "i"))
    )
    : sedes


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
        rows={sedesToShow}
        columns={headers}
        pageSize={10}
      />
    </React.Fragment>
  );
}
