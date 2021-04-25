/**
 * Este archivo manda todas las peticiones que tienen que ver con las categorias
 */

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/categories'
/**
 * Obtiene todos las categorias del proyecto, i.e: manda una petición
 * GET a baseUrl
 *
 * @return array
 */
 const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

/**
 * Manda una petición POST con su cuerpo al servidor. Esta función se usa para crear un usuario.
 *
 * @param newObject - objeto
 * @return ?
 */
 const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create
}