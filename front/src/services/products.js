import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/products'

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
    return request.then(response => response.data)
}

const getByCat = async (id_categoria) => {
    try {
        const request = axios.head(`${baseUrl}/${id_categoria}` )
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
export default {
    getAll,
    create,
    getByCat
}
