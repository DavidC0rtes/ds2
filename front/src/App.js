import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
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
import Admin from "layouts/Admin.js";
import Login from './views/Login/Login'
import SignUp from './views/Login/SignUp'

import "assets/css/material-dashboard-react.css?v=1.9.0";
const hist = createBrowserHistory()

const App = () => {
    const [user, setUser] = useState([])    
   
    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('usuarioLogueado')))
    }, [])

    console.log(user)
   
        return (
            <Router history={hist}>
                <Navbar user={user} setUser={setUser}/>
                <Switch>
                    <Route exact path="/" />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/login" render={(props) => (<Login user={user} setUser={setUser} />)}/>
                    <Route exact path="/registrarse" component={SignUp} />
                    <Redirect exact from = "/admin" to= "/admin/dashboard"/>
                </Switch>
            </Router>
        );
    
}


export default App