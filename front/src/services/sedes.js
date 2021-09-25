/**
 * Este archivo manda todas las peticiones que tienen que ver con los usuarios
 */

require('dotenv').config()
import axios from 'axios'
 const baseUrl = process.env.REACT_APP_CI ? '/api/sedes' : 'http://localhost:3001/api/sedes'

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
 * @param {string} direccion 
 * @returns {object}
 */
const getByDireccion = async (direccion, method) => {
    try {
        let request
        method === 'get'
        ? request = axios.get(`${baseUrl}/${direccion}`)
        : request = axios.head(`${baseUrl}/${direccion}`)
        
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
const update = async (obj, id_horario) => {
    try {
        const response = await axios.put(`${baseUrl}/update/${id_horario}`, obj)
        console.log(response)
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}

const removeById = async (id_horario) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id_horario}`)
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
    getByDireccion,
    update,
    removeById
}
