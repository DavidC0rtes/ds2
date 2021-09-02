 require('dotenv').config()
import axios from 'axios'
 const baseUrl = process.env.REACT_APP_CI ? '/api/products' : 'http://localhost:3001/api/products'

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

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data).catch(error => console.log(error))
}

const getByCat = async (categoria) => {
    
        const request = axios.get(`${baseUrl}/${categoria}`)
        return request.then(response => response.data).catch(error => console.log(error))    
}

export default {
    create,
    getByCat,
    getAll
}
