/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Face from "@material-ui/icons/Face";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Kitchen from "@material-ui/icons/Kitchen";
import SaveIcon from "@material-ui/icons/Save";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import userService from '../../services/users'
import sedeService from '../../services/sedes'
import productService from '../../services/products'
import facturaService from '../../services/facturas'

import QueryParams from '../../misc/QueryParameters'
import DataTable from '../../components/Table/DataGrid'

//import {completedTasksChart} from "variables/charts.js";
import datos from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Button } from "@material-ui/core";

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

const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
"Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [users, setUsers] = useState([]) // Almacena los usuarios traídos de la db.

  const [sedes, setSedes] = useState([]) // Almacena las sedes traídos de la db.

  const [facturas, setFacturas] = useState([]) // Almacena las facturas traídos de la db.
  
  const [products, setProducts] = useState({}) // Almacena los productos traídos de la db.

  const [filter, setFilter] = useState('') // Almacena el valor del campo de busqueda.

  const [update, setUpdate] = useState(0) // Para saber si se le ha dado clic a "Actualizar"

  const previousUpdate = usePrevious(update)

  const [seleccion, setSeleccion] = useState("")
  
  const [mesIni, setMesIni] = useState("")

  const [mesFin, setMesFin] = useState("")

  const headersClientes = [
    {
      field: 'email',
      headerName: 'Correo electrónico',
      width: '230',
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
    { field: 'primer_nombre', headerName: 'Primer nombre', width: 150 },
    { field: 'primer_apellido', headerName: 'Primer apellido', width: 150 },
    { field: 'birthday', headerName: 'Cumpleaños', width: 200 },
  ]

  const headersSede = [
    { field: 'direccion', headerName: 'Direccion', width: 300},
    { field: 'ganancias', headerName: 'Ganancias', width: 200 },
    { field: 'ventas', headerName: 'Total de ventas', width: 200 },
  ]

  /**
   * Este hook de efecto trae todos los usuarios de la db
   * en el momento en que se renderice la página.
   * Después itera por cada uno de los usuarios para que los datos
   * sean más trabajables.
   */
  useEffect(() => {
    const fetchUsers = async () => {
      const resultU = await userService.getAll()
      resultU.forEach((item) => {
        
        delete item.password
        item.rol = item.id_rol.nombre_rol
        item.primer_nombre = ''
        item.primer_apellido = ''
        if (item.id_info) {
          item.primer_nombre = item.id_info.primer_nombre
          item.primer_apellido = item.id_info.primer_apellido
          item.birthday = item.id_info.birthday
          delete item.id_info
        }

        delete item.id_rol
      })
      setUsers(resultU)
    }

    const fetchSedes = async () => {
      const resultS = await sedeService.getAll()
      resultS.forEach((item) => {
        delete item.hora_cierre
        delete item.hora_apertura
        delete item.descripcion
        item.ganancias = 0;
        item.ventas = 0;
      })
      setSedes(resultS)}
    
    const fetchProductos = async () => {
      const resultP = await productService.getAll()
      resultP.forEach((item) => {
      })
      setProducts(resultP)}

    const fetchFactura = async () => {
      const resultF = await facturaService.getAll()
      resultF.forEach((item) => {
        })
        setFacturas(resultF)}


    // Solo llamar a la función si se le ha dado click
    // al botón de actualizar.
    if (previousUpdate !== update) {
      fetchUsers()
      fetchSedes()
      fetchProductos()
      fetchFactura()
    }
  }, [update])

  //Auxiliar para prodcutos, los ingresa a una array que luego se usara para extraer sus valores en el boton
  var auxProductos = []
  for(let i=0;i<products.length;i++){
    auxProductos.push(products[i]);
  }
  //Limpiar las ganancias y ventas
  sedes.forEach((item) => { 
    item.ganancias = 0
    item.ventas = 0
  })
  //Funcion para total de ventas de un producto
  function nombre_id(nombreP){
    for(let i=0;i<products.length;i++){
      if(nombreP == products[i].nombre){
        return products[i]["id"];
      }
    }
  }
  //
  function fechanumero(fecha){
    for(let i=0;i<month.length;i++){
      if(fecha == month[i]){
        return i;
      }
    }
  }
  //Convertir de numero entero a moneda
  function currency(numero) {
    return "$" + numero.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    });
  }
  //Ganancias totales
  var ganancias = 0;
  for(let i=0;i<facturas.length;i++){
    ganancias = ganancias + facturas[i].costo;
  }

  //Array con la direccion, ganancias y total de ventas por sede
  
  for(let i=0;i<facturas.length;i++){
    let idSede = facturas[i].id_sede;
    let aux = sedes.findIndex(x => x.id === idSede);
    for(let j=0;j<sedes.length;j++){
      switch(idSede){
        case sedes[j].id:
          sedes[aux].ganancias = sedes[aux].ganancias + facturas[i].costo;
          sedes[aux].ventas = sedes[aux].ventas + facturas[i].cantidad;
          break;
        default:
          break;
      }
    }
  }

  //Cuantos empleados y clientes hay
  var numeroClientes = 0;
  var numeroEmpleados = 0;
  for(let i=0;i<users.length;i++){
    if(String(users[i].rol) == "Cliente"){
      numeroClientes ++;
    } else {
      numeroEmpleados  ++;
    }
  }
  //Clientes que cumplen años este mes
  var mesActual = new Date().getMonth() + 1;
  var auxClientesBirthday = [];
  for(let i=0;i<users.length;i++){
    if(String(users[i].rol) == "Cliente"){
      if(String(users[i].birthday).split('-')[1] == String(mesActual)){
        auxClientesBirthday.push(users[i]);
      }
    }
  }

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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={12}>
          <Card>
            <Button variant="contained" className={classes.button} onClick={() => { alert('No esta implementado') }}>
                <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Descargar en PDF
            </Button>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <AttachMoney />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>{currency(ganancias)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Sedes</p>
              <h3 className={classes.cardTitle}>{sedes.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Kitchen />
              </CardIcon>
              <p className={classes.cardCategory}>Productos</p>
              <h3 className={classes.cardTitle}>{products.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Face />
              </CardIcon>
              <p className={classes.cardCategory}>Personal</p>
              <h3 className={classes.cardTitle}>{numeroEmpleados}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Clientes registrados</p>
              <h3 className={classes.cardTitle}>{numeroClientes}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={15}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={datos.ventaFecha(facturas, fechanumero(mesIni), fechanumero(mesFin) + 1).data}
                type="Line"
                options={datos.ventaFecha(facturas, fechanumero(mesIni), fechanumero(mesFin) + 1).options}
                listener={datos.ventaFecha(facturas,fechanumero(mesIni), fechanumero(mesFin) + 1).animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Ventas</h4>
                <FormControl component="fieldset">
                  <RadioGroup row aria-label="producto" name="row-radio-buttons-group" 
                  value={mesIni} onChange={(e) => setMesIni(e.target.value)}>
                    {
                      month.map((x) => {
                        return (
                        <FormControlLabel key={x} value={x} control={<Radio />} label={x}/>
                        )
                      })
                    }
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                  <RadioGroup row aria-label="producto" name="row-radio-buttons-group" 
                  value={mesFin} onChange={(e) => setMesFin(e.target.value)}>
                    {
                      month.map((x) => {
                        return (
                        <FormControlLabel key={x} value={x} control={<Radio />} label={x}/>
                        )
                      })
                    }
                  </RadioGroup>
                </FormControl>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  < ArrowUpward className={classes.upArrowCardCategory} />
                </span>{" "}
                {datos.getPorcentaje()}
                 % Ventas en este periodo.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 2 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={15}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={datos.productoMasVendidos(products, facturas).data}
                type="Bar"
                options={datos.productoMasVendidos(products, facturas).options}
                responsiveOptions={datos.productoMasVendidos(products, facturas).responsiveOptions}
                listener={datos.productoMasVendidos(products, facturas).animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Productos más vendidos</h4>
              <p className={classes.cardCategory}>Desempeño de los productos</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={15}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={datos.ventaMeses(nombre_id(seleccion), facturas).data}
                type="Line"
                options={datos.ventaMeses(nombre_id(seleccion), facturas).options}
                listener={datos.ventaMeses(nombre_id(seleccion), facturas).animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Total de ventas en los ultimos 6 meses de: </h4>
              <p className={classes.cardCategory}>
                <FormControl component="fieldset">
                  <RadioGroup row aria-label="producto" name="row-radio-buttons-group" 
                  value={seleccion} onChange={(e) => setSeleccion(e.target.value)}>
                    {
                      auxProductos.map((x) => {
                        return (
                        <FormControlLabel key={x.id} value={x.nombre} control={<Radio />} label={x.nombre}/>
                        )
                      })
                    }
                  </RadioGroup>
                </FormControl>
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 1 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Ventas y ganancias por sede</h4>
              <p className={classes.cardCategoryWhite}>
              </p>
            </CardHeader>
            <CardBody>
            <DataTable
              rows={sedes}
              columns={headersSede}
              pageSize={10}
            />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Cumpleaños</h4>
              <p className={classes.cardCategoryWhite}>
                Clientes que cumplen años este mes
              </p>
            </CardHeader>
            <CardBody>
            <DataTable
              rows={auxClientesBirthday}
              columns={headersClientes}
              pageSize={10}
            />
            </CardBody>
          </Card>
        </GridItem>
        <Card></Card>
      </GridContainer>
    </div>
  );
}
