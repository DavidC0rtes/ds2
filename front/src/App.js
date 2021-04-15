import React from 'react'
import Container from '@material-ui/core/Container'
import NavBar from './components/Navbar'
import Login from './pages/Login'

import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function App() {
  return (
      <div>
        <Container maxWidth="sm">
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/"/>
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router> 
        </Container>
               
      </div>
  );
}

export default App;
