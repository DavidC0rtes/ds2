import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {AppBar, Tabs, Tab, Button} from '@material-ui/core';
import SedesTable from './showSedes'
import CreateSede from './CrearSedes'



const styles = {
  AppBarClass: {
    marginTop: "-80px",
    backgroundColor: "#a61414"
  }
};

const TabPanel = (props) => {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      >
        {value === index && (
          <>{children}</>
        )}
    </div>
  )
}


const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  
  // Mantiene una referencia del componente que se encuentra activo
  const [value, setValue] = useState(0)

  // Función para manejar el cambio entre pestañas
const toggleView = (event, newValue) => {
  setValue(newValue)
}

//value = {value} onChange = {setValue(value)}
  return (
    <React.Fragment>
      <AppBar position="sticky" className = {classes.AppBarClass}>
        <Tabs value={value} onChange={toggleView}>
          <Tab label="Ver Sedes" />
          <Tab label="Crear Sedes"/>
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
      
        <SedesTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateSede />
      </TabPanel>
    </React.Fragment>
  );
}
