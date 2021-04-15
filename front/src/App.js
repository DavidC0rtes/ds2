import React from 'react'
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
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/"/>
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router>        
      </div>
  );
}

export default App;
