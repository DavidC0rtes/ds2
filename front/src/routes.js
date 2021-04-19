/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

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
import Pedidos from "views/Pedidos/Pedidos.js";
// Components for users
import Usuarios from "views/Usuario/Usuario.js";
import CrearUsuarios from "views/Usuario/CrearUsuario.js";
import ModificarUsuario from "views/Usuario/ModificarUsuario";
import ConsultarUsuarios from "views/Usuario/ConsultarUsuarios";
// Components for products
import Producto from "views/Producto/Productos.js";
import CrearProducto from "views/Producto/CrearProducto.js";
import ModificarProducto from "views/Producto/ModificarProducto";
import ConsultarProducto from "views/Producto/ConsultarProducto";

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
    name: "Users",
    icon: Person,
    component: Usuarios,
    layout: "/admin"
  },
  {
    path: "/productos",
    name: "Productos",
    icon: "content_paste",
    component: Producto,
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

const dashRoutes = [
  dashboardRoutes, subRoutes
];

export default dashRoutes;
