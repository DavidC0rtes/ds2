/**
 * Este archivo manda todas las peticiones que tienen que ver con las categorias
 */

 require('dotenv').config()
import axios from 'axios'
 const baseUrl = process.env.REACT_APP_CI ? '/api/categories' : 'http://localhost:3001/api/categories'
/**
 * Obtiene todos las categorias del proyecto, i.e: manda una petición
 * GET a baseUrl
 *
 * @return array
 */
 const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data).catch(error => console.log(error))
}

const getByName = async (name) => {
    try {
        const request = axios.head(`${baseUrl}/${name}` )
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

/**
 * Manda una petición POST con su cuerpo al servidor. Esta función se usa para crear una categoria.
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
    getByName,
    create
}
