/**
 * Este archivo define un componente para mostrar
 * datos de forma tabular. Primero utilicé Table.js
 * pero me pareció demasiado simple. Este está mas orientado
 * a mostrar datos tabulares sacados de una db.
 * https://material-ui.com/components/tables/#data-table
 */
import React from 'react'
import { DataGrid } from '@material-ui/data-grid'

/**
 * Componente que se exporta.
 * @param {arreglo de objetos que describe cada encabezado} columns
 * @param {arreglo de objetos con el contenido de la tabla} rows
 * @param {int} pageSize: define el número de filas por cada página
 * 
 * Cada objeto dentro de columns puede tener las siguientes 
 * llaves: field, headerName, width, type, description, sortable, valueGetter
 */
const DataTable = ( {rows, columns, pageSize} ) => {
	return (
		<div style={{ width: '100%', height: '400px'}}>
			<DataGrid rows={rows} columns={columns} pageSize={pageSize} />
		</div>
	)
}

export default DataTable