/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Face from "@material-ui/icons/Face";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Kitchen from "@material-ui/icons/Kitchen";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
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

import { bugs, website, server } from "variables/general.js";

//import {completedTasksChart} from "variables/charts.js";
import datos from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Delete, Storefront } from "@material-ui/icons";

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

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [users, setUsers] = useState([]) // Almacena los usuarios traídos de la db.

  const [sedes, setSedes] = useState([]) // Almacena las sedes traídos de la db.

  const [facturas, setFacturas] = useState([]) // Almacena las facturas traídos de la db.
  
  const [products, setProducts] = useState({}) // Almacena los productos traídos de la db.

  const [filter, setFilter] = useState('Cliente') // Almacena el valor del campo de busqueda.

  const [update, setUpdate] = useState(0) // Para saber si se le ha dado clic a "Actualizar"

  const previousUpdate = usePrevious(update)

  
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
        item.id_direccion = item.direccion

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
  //Convertir de numero entero a moneda
  function currency(numero) {
    return "$" + numero.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    });
  }
  //Ganancias, los ingresa a una array que luego se usara para extraer sus valores en el boton
  var ganancias = 0;
  for(let i=0;i<facturas.length;i++){
    ganancias = ganancias + facturas[i].costo;
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
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
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
                data={datos.ventaFecha().data}
                type="Line"
                options={datos.ventaFecha().options}
                listener={datos.ventaFecha().animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Ventas</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
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
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={15}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={datos.ventaMeses().data}
                type="Line"
                options={datos.ventaMeses().options}
                listener={datos.ventaMeses().animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Total de ventas en los ultimos 6 meses de: </h4>
              <p className={classes.cardCategory}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Producto</FormLabel>
                  <RadioGroup row aria-label="producto" name="row-radio-buttons-group">
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
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Sedes con más ventas</h4>
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
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Sedes con menos ventas</h4>
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
      </GridContainer>
    </div>
  );
}
