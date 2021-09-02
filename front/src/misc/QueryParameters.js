import React from 'react'

import {
	Link
} from "react-router-dom"


/**
 * Este componente devuelve un Link de la forma
 * url?parametro=valor
 * @param {string} url : el formato base de la url
 * @param {string} param : valor del parametro para la url
 * @see https://reactrouter.com/web/example/query-parameters
 */
export default function QueryParams({url, param, text}) {
	return (
		<Link to={`${url}${param}`}>
			{text}
		</Link>
	)
}