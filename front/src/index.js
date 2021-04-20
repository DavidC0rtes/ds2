// React imports
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// Layouts
import Admin from "layouts/Admin.js";
import Inicio from "layouts/Inicio.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
		  <Route path="/inicio" component={Inicio} />
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/inicio" />
      <Redirect from = "/admin" to= "/admin/dashboard"/>
    </Switch>
  </Router>,
  document.getElementById("root")
);