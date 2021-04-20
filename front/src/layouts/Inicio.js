import React from 'react'
import Container from '@material-ui/core/Container'
import NavBar from '../components/Navbars/NavbarV2'
import Login from '../views/Login/Login.js'
import SignUp from '../views/Login/SignUp.js'

// Estas cosas nos permiten redirigir
// a las diferentes vistas cuando
// se le da clic a algún enlace.
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function Inicio() {
  return (
      <div>
        <Container maxWidth="md">
        <Router> {/* <-- importante que el Router este acá*/}
            <NavBar />
            <Switch>  {/*<-- acá se definen todas las rutas y hacia que componente redirigen*/}
                <Route exact path="/"/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registrarse" component={SignUp} />
                <Route exact path = "/admin/dashboard"/>
            </Switch>
        </Router> 
        </Container>
               
      </div>
  );
}

export default Inicio;