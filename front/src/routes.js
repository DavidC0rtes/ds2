/*
wtf ? ...
*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";


import Categorias from "views/Categoria/Categoria.js";
import Sedes from "views/Sede/Sede.js";
import Pedidos from "views/Sede/sedesMap";
// Components for users
import Usuarios from "views/Usuario/Usuario.js";
import CrearUsuarios from "views/Usuario/CrearUsuario.js";
import ModificarUsuario from "views/Usuario/ModificarUsuario";
import ConsultarUsuarios from "views/Usuario/ConsultarUsuarios";
// Components for products
import Categories from "views/Producto/Productos.js";
import CrearProducto from "views/Producto/CrearProducto.js";
import ModificarProducto from "views/Producto/ModificarProducto";
import ConsultarProducto from "views/Producto/ConsultarProducto";
// Components for clients
import CartClient from "views/Cliente/Cart";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Usuarios",
    icon: Person,
    component: Usuarios,
    layout: "/admin"
  },
  {
    path: "/productos",
    name: "Productos",
    icon: "content_paste",
    component: Categories,
    layout: "/admin"
  },
  {
    path: "/categorias",
    name: "Categorias",
    icon: LibraryBooks,
    component: Categorias,
    layout: "/admin"
  },
  {
    path: "/sedes",
    name: "Sedes",
    icon: BubbleChart,
    component: Sedes,
    layout: "/admin"
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    icon: LocationOn,
    component: Pedidos,
    layout: "/admin"
  }
];

const subRoutes = [
  {
    path: "/createuser",
    component: CrearUsuarios,
    layout: "/admin"
  },
  {
    path: "/modifyuser",
    component: ModificarUsuario,
    layout: "/admin"
  },
  {
    path: "/viewuser",
    component: ConsultarUsuarios,
    layout: "/admin"
  },
  {
    path: "/createproduct",
    component: CrearProducto,
    layout: "/admin"
  },
  {
    path: "/modifyproduct",
    component: ModificarProducto,
    layout: "/admin"
  },
  {
    path: "/viewproduct",
    component: ConsultarProducto,
    layout: "/admin"
  }

];

const clientRoutes = [
  {
    path: "/dashboard",
    name: "Productos",
    icon: Dashboard,
    component: Categories,
    layout: "/client"
  },
  {
    path: "/cart",
    name: "Cart",
    icon: Dashboard,
    component: CartClient,
    layout: "/client"
  }
];

const dashRoutes = [
  dashboardRoutes, subRoutes, clientRoutes
];

export default dashRoutes;