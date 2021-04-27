import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {AppBar, Toolbar, Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';

import CategoryService from '../../services/categories'

const styles = {
  AppBarClass: {
    marginTop: "-80px",
    backgroundColor: "#00acc1"
  }
};

const useStyles = makeStyles(styles);

const categorias = CategoryService.getAll().then(categorias => {console.log(categorias)})

export default function Categories() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
 

  return (
    <div className={classes.root}>
      {categorias.map(accordion => {
        const { id, nombre, descripcion, activo } = accordion;
        return (
          <Accordion
            expanded={expanded === id}
            key={id}
            onChange={handleChange(id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.nombre}>{nombre}</Typography>
              <Typography className={classes.descripcion}>
                {descripcion}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{activo}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
    
  );
}
