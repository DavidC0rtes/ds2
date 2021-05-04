/**
 * Este archivo manda todas las peticiones que tienen que ver con los usuarios
 */

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

/**
 * Obtiene todos los usuarios del proyecto, i.e: manda una petición
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

/**
 * Consulta un usuario especifico por email. Útil para
 * verificar si un usuario ya existe o para acceder al pérfil.
 * @param {string} email 
 * @returns 
 */
const getByEmail = async (email) => {
    try {
        const request = axios.head(`${baseUrl}/${email}` )
        const response = await request
        return response.status
    } catch (error) {

        if (error.response.status === 404) {
            return null
        } else {
            console.error(error)
        }
        
        
    }
    
}    

// eslint-disable-next-line
export default {
    getAll,
    create,
    getByEmail
}