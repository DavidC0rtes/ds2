/**
 * ARCHIVO EN CONSTRUCCÓN
 * Este componente sirve para aquellas vistas que implementan
 * subrutas.
 * https://reactrouter.com/web/example/nesting
 */
import React from 'react'
import {
	Switch,
	Route,
	Link, 
	useParams, 
	useRouteMatch
} from 'react-router-dom'

const Rutas = (props) => {
	// The `path` lets us build <Route> paths that are
  	// relative to the parent route, while the `url` lets
  	// us build relative links.
	let { path, url } = useRouteMatch()

	return (
		<div>
			<Switch>
				<Route exact path={path}></Route>
				<Route path={`${path}/:topicId`}>
					<Ruta />
				</Route>
			</Switch>
		</div>
	)
}

const Ruta = () => {
	// The <Route> that rendered this component has a
  	// path of `/topics/:topicId`. The `:topicId` portion
  	// of the URL indicates a placeholder that we can
  	// get from `useParams()`.
  	let { topicId } = useParams();
	return (
		<>
			<h3>topicId</h3>
		</>
	)
}