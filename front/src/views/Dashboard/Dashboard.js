/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
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
import QueryParams from '../../misc/QueryParameters'
import DataTable from '../../components/Table/DataGrid'

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

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
    { field: 'rol', headerName: 'Rol', width: 100 },
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
      const result = await userService.getAll()
      result.forEach((item) => {
        
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
      setUsers(result)
    }

    const fetchSedes = async () => {
      const result = await sedeService.getAll()
      result.forEach((item) => {
        delete item.hora_cierre
        delete item.hora_apertura
        delete item.descripcion
        item.id_direccion = item.direccion

      })
      setSedes(result)        
      }

    // Solo llamar a la función si se le ha dado click
    // al botón de actualizar.
    if (previousUpdate !== update) {
      fetchUsers()
      fetchSedes()
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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
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
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Clientes registrados</p>
              <h3 className={classes.cardTitle}>#</h3>
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
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
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
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
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
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Productos menos vendidos</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Total de ventas en los ultimos 6 meses de: </h4>
              <p className={classes.cardCategory}>Producto</p>
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
              <h4 className={classes.cardTitleWhite}>Clientes</h4>
              <p className={classes.cardCategoryWhite}>
                Cumpleaños de los Clientes
              </p>
            </CardHeader>
            <CardBody>
            <DataTable
              rows={usersToShow}
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
