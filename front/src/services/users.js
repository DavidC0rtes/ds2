/**
 * Este archivo manda todas las peticiones que tienen que ver con los usuarios
 */

 require('dotenv').config()
import axios from 'axios'
 const baseUrl = process.env.REACT_APP_HEROKU ? '/api/users' : 'http://localhost:3001/api/users'

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
 * @returns {object}
 */
const getByEmail = async (email, method) => {
    try {
        let request
        method === 'get'
        ? request = axios.get(`${baseUrl}/${email}`)
        : request = axios.head(`${baseUrl}/${email}`)
        
        const response = await request
        if (method === 'get') return response.data

        return response.status
        
    } catch (error) {

        if (error.response.status === 404) {
            return null
        } else {
            console.error(error)
        }
    }
}

/**
 * Esta función se encarga de realizar una petición PUT a la API.
 * Lo cual resulta en una actualización del usuario en la db.
 * @param {obj} obj 
 */
const update = async (obj, id) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, obj)
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}

// eslint-disable-next-line
export default {
    getAll,
    create,
    getByEmail,
    update
}