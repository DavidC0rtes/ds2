import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import salchiPresa from '../../assets/img/salchi-presa.png'
import ala from '../../assets/img/ala.jpg'
import pernil from '../../assets/img/pernil.jpg'
import pechuga from '../../assets/img/pechuga.jpg'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm" >
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Menú
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Disponibilidad puede variar dependiendo de la sede
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid container item xs={4} spacing={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image= {salchiPresa}
                  title="salchiPresa"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Salchi-Presa
                  </Typography>
                  <Typography >
                    Salchipapa con presa de pollo, ya sea ala, muslo o contramuslo.
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    $8000
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Agregar al carrito
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid container item xs={4} spacing={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image= {ala}
                  title="ala"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Ala de pollo
                  </Typography>
                  <Typography>
                    Ala de pollo con porcion de papa, y salsas.
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    $5000
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Agregar al carrito
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid container item xs={4} spacing={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image= {pernil}
                  title="pernil"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Pernil con papa
                  </Typography>
                  <Typography>
                    Pernil de pollo (contramuslo y muslo) con porcion de papa y salsas.
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    $7000
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Agregar al carrito
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid container item xs={4} spacing={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image= {pechuga}
                  title="pechuga"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Bandeja con pechuga
                  </Typography>
                  <Typography>
                    Bandeja de pechuga que contiene porción de papa, arroz y ensalada.
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    $9000
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Agregar al carrito
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Ordena ya!
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Todos los precios están sujetos a posibles modificaciones
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}