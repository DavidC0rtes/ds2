import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {AppBar, Toolbar, Button} from '@material-ui/core';

const styles = {
  AppBarClass: {
    marginTop: "-80px",
    backgroundColor: "#00acc1"
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="sticky" className = {classes.AppBarClass}>
        <Toolbar>
        <Button color="inherit">Sedes</Button>
        <Button color="inherit">Crear Sede</Button>
        <Button color="inherit">Modificar Sede</Button>
        <Button color="inherit">Consultar Sede</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
