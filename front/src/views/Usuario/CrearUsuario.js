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
        <Button><Link href = "users" color="primary" style={{ color: 'white', textDecoration: 'none' }}>Usuarios </Link></Button>
        <Button><Link href = "createuser" color="primary" style={{ color: 'white', textDecoration: 'none' }}> Crear Usuario </Link></Button>
        <Button><Link href = "modifyuser" color="primary" style={{ color: 'white', textDecoration: 'none' }}>Modificar Usuario </Link></Button>
        <Button><Link href = "viewuser" color="primary" style={{ color: 'white', textDecoration: 'none' }}>Consultar Usuario </Link></Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

