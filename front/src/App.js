import React, {useState, useEffect} from "react";
import { createBrowserHistory } from "history";
import { 
  Router,
  Route, 
  Switch, 
  Redirect 
} from "react-router-dom";

// Layouts
import Admin from "layouts/Admin.js";
import Inicio from 'layouts/Inicio.js';
import Cliente from "layouts/Cliente.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
const hist = createBrowserHistory()

const App = () => {   
        return (
            <Router history={hist}>
                <Switch>
                <Route path="/inicio" component={Inicio} />
                <Route path="/admin" component={Admin} />
                <Route path="/cliente" component={Cliente} />
                <Redirect from="/" to="/inicio" />
                <Redirect from = "/admin" to= "/admin/dashboard"/>
                <Redirect from = "/cliente" to= "/cliente/dashboard"/>
                </Switch>
            </Router>
        );
    
}


export default App