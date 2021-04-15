import React from 'react'
import Container from '@material-ui/core/Container'
import NavBar from './components/Navbar'
import Login from './pages/Login'
import SignUp from './pages/SingUp'

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
            </Switch>
        </Router> 
        </Container>
               
      </div>
  );
}

export default App;
