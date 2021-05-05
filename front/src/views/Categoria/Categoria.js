import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {AppBar, Toolbar, Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import Container from '@material-ui/core/Container';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CategoryService from '../../services/categories'

const styles = {
  AppBarClass: {
    marginTop: "-80px",
    backgroundColor: "#00acc1"
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

//Añadir producto



var categorias = CategoryService.getAll().then(function(cats) {categorias = cats})
console.log(categorias)
export default function Categories() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(categorias)
  console.log(Object.values(categorias))
  return (
    <div className={classes.root}>
      <header>"Listado de categorias y productos"</header>
      {Object.values(categorias).map(accordion => {
        const { id, nombre, descripcion, activo } = accordion;
        return (
          <Accordion
            expanded={expanded === id}
            key={id}
            onChange={handleChange(id)}
            disabled = {activo}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{nombre}</Typography>
              <Typography className={classes.secondaryHeading}>
                {descripcion}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography width = "100%">
              <Container component="main" maxWidth="xl" width = "100%">
                asdasd
              <Button
                  width = "100%"
                  fullWidth = {true}
                  variant = "contained"
                  color = "primary"
                  >
                    Nuevo Producto
                  </Button>
                </Container>
 

              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
    
  );
}
