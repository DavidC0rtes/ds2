import React from 'react'
import Container from '@material-ui/core/Container'
import NavBar from 'components/Navbars/NavbarV2.js'
import Login from 'components/Login/Login.js'
import SignUp from 'components/Login/SignUp.js'
import Admin from 'layouts/Admin.js'

import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function App() {
  return (
      <div>
        <Container maxWidth="md">
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/"/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registrarse" component={SignUp} />
				<Route exact path="/admin" component={Admin} />
            </Switch>
        </Router> 
        </Container>
               
      </div>
  );
}

export default App;
