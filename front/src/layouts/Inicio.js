import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import NavBar from '../components/Navbars/NavbarV2'
import Login from '../views/Login/Login.js'
import SignUp from '../views/Login/SignUp.js'
import Categories from './views/Categoria/Categoria'

// Estas cosas nos permiten redirigir
// a las diferentes vistas cuando
// se le da clic a algún enlace.
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function Inicio() {
  // Revisar si un usuario inició sesión
  useEffect(() => {
    const userJSON = window.localStorage.getItem('usuarioLogueado')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      console.log('ESTAS LOGUEADO')
    }
  })
  return (
      <div>
        <Container maxWidth="md">
        <Router> {/* <-- importante que el Router este acá*/}
            <NavBar />
            <Switch>  {/*<-- acá se definen todas las rutas y hacia que componente redirigen*/}
                <Route exact path="/"/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registrarse" component={SignUp} />
                <Route exact path="/categorias" component={Categories} />
                <Route exact path = "/admin/dashboard"/>
            </Switch>
        </Router> 
        </Container>
               
      </div>
  );
}

export default Inicio;