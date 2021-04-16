import React from 'react'
import Container from '@material-ui/core/Container'
import NavBar from './components/Navbar'
import Login from './pages/Login'
import SignUp from './pages/SingUp'

// Estas cosas nos permiten redirigir
// a las diferentes vistas cuando
// se le da clic a algún enlace.
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function App() {
  return (
      <div>
        <Container maxWidth="md">
        <Router> {/* <-- importante que el Router este acá*/}
            <NavBar />
            <Switch>  {/*<-- acá se definen todas las rutas y hacia que componente redirigen*/}
                <Route exact path="/"/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registrarse" component={SignUp} />
            </Switch>
        </Router> 
        </Container>
               
      </div>
  );
}

export default App;
