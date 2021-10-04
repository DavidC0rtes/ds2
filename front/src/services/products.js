 require('dotenv').config()
import axios from 'axios'
 const baseUrl = process.env.NODE_ENV === 'production' ? '/api/products' : 'http://localhost:3001/api/products'

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
const update = async (obj, id) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, obj)
        return response
    } catch (err) {
        console.error(err)
        return err
    }
};

const eliminate = async(id)=> {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`)
        return response
    } catch (err) {
        console.error(err)
        return err
    }
}

export default {
    create,
    getByCat,
    getAll,
    update,
    eliminate
}
