import React from "react";
import { ProvideAuth } from './misc/useAuth'
import { ProvideSede } from './misc/useSede'
import SimpleAppBar from "components/AppBar/AppBar";
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
import Categories from './views/Categoria/Categoria'
import Productos from './views/Producto/Productos'
import Perfil from './views/Usuario/Perfil.js'
import Inicio from './layouts/Inicio'
import Footer from "components/Footer";
import CartClient from "./views/Cliente/Cart.js"
import Client from "layouts/Cliente";


import "assets/css/material-dashboard-react.css?v=1.9.0";
const hist = createBrowserHistory()

const App = () => { 
        return (
            <ProvideAuth>
            <ProvideSede>
            <Router history={hist}>
                <SimpleAppBar />
                <Switch>
                    <Route exact path="/" component={Inicio}/>
                    <Route path="/admin" component={Admin} />   
                    <Route path="/client" component={Client}/>
                    <Route path="/perfil" component={Perfil}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/registrarse" component={SignUp} />
                    <Route exact path="/categorias" component={Categories} />

                    <Route exact path="/menu" component={Productos} />
                    <Redirect from="/client" to = "client/dashboard" />
                    <Redirect from="/admin" to="/admin/dashboard" />
                </Switch>
                <Footer />
            </Router>
            </ProvideSede>
            </ProvideAuth>
        );
}


export default App