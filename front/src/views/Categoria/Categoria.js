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

export default function TypographyPage() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="sticky" className = {classes.AppBarClass}>
        <Toolbar>
        <Button color="inherit">Categorias</Button>
        <Button color="inherit">Crear Categoria</Button>
        <Button color="inherit">Modificar Categoria</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
