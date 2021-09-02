import logo from './logo.svg';
import './App.css';

<<<<<<< Updated upstream
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
// Layouts
import Admin from "./layouts/Admin";
import Login from './views/Login/Login'
import SignUp from './views/Login/SignUp'
import Categories from './views/Categoria/Categoria'
import Productos from './views/Producto/Productos'
import Perfil from './views/Usuario/Perfil.js'
import Inicio from './layouts/Inicio'


import "assets/css/material-dashboard-react.css?v=1.9.0";
const hist = createBrowserHistory()

const App = () => { 
        return (
            <ProvideAuth>
            <Router history={hist}>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Inicio}/>
                    <Route path="/admin" component={Admin} />
                    <Route path="/perfil" component={Perfil}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/registrarse" component={SignUp} />
                    <Route exact path="/categorias" component={Categories} />
                    <Redirect exact from = "/admin" to= "/admin/dashboard"/>
                    <Route exact path="/menu" component={Productos} />
                    <Redirect from="/admin" to="/admin/dashboard" />

                </Switch>
            </Router>
            </ProvideAuth>
        );
>>>>>>> Stashed changes
}

export default App;
