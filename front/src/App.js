import React from "react";
import { ProvideAuth } from './misc/useAuth'
import Navbar from './components/Navbars/NavbarV2'
import Container from '@material-ui/core/Container'
import { createBrowserHistory } from "history";
import { 
  Router,
  Route, 
  Switch, 
  Redirect 
} from "react-router-dom";

// Layouts
import Admin from "./layouts/Admin";
import Login from './views/Login/Login'
import SignUp from './views/Login/SignUp'
import ConsultarProducto from './views/Producto/ConsultarProducto'
import Perfil from './views/Usuario/Perfil.js'


import "assets/css/material-dashboard-react.css?v=1.9.0";
const hist = createBrowserHistory()

const App = () => { 
        return (
            <ProvideAuth>
            <Router history={hist}>
                <Navbar />
                <Switch>
                    <Route exact path="/" />
                    <Route path="/admin" component={Admin} />
                    <Route path="/perfil" component={Perfil}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/registrarse" component={SignUp} />
                    <Route exact path="/menu" component={ConsultarProducto} />
                   
                    <Redirect from="/admin" to="/admin/dashboard" />

                </Switch>
            </Router>
            </ProvideAuth>
        );
}


export default App
