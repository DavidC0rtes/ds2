import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {AppBar, Toolbar, Button, Link} from '@material-ui/core';

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
        <Button><Link href = "productos" color="primary" style={{ color: 'white', textDecoration: 'none' }}> Productos </Link></Button>
        <Button><Link href = "createproduct" color="primary" style={{ color: 'white', textDecoration: 'none' }}> Crear Producto </Link></Button>
        <Button><Link href = "modifyproduct" color="primary" style={{ color: 'white', textDecoration: 'none' }}> Modificar Producto </Link></Button>
        <Button><Link href = "viewproduct" color="primary" style={{ color: 'white', textDecoration: 'none' }}> Consultar Producto </Link></Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
