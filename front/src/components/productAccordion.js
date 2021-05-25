
import React, { useState } from 'react'
import Accordion from '@material-ui/core/Accordion';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

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
    display: 'inline-block',
    color: theme.palette.text.secondary
  }
}));






const productAccordion = (props) =>{
  const { state } = props
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    var x = document.getElementById("secondheader");
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
    setExpanded(isExpanded ? panel : false);
  };
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
              <Typography >{nombre}</Typography>
              <Typography id="secondheader" >
                {props.descripcion}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:'block'}}>
              <Typography width = "100%">
                  <Button
                    style={{width:'100%'}}
                    fullWidth = {true}
                    variant = "contained"
                    color = "primary"
                    >
                      Promises are bullshit</Button>
                       
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          
  )
}

export default productAccordion;