/**
 * Peticiones que tienen que ver con el login
 */
 import axios from 'axios'
 const baseUrl = 'http://localhost:3001/api/login'

 const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    
    // Manipulaciones para que el objeto devuelto sea un poco más sencillo.
    const toReturn = JSON.parse(JSON.stringify(response.data))
    delete toReturn.rol
    toReturn.rol = response.data.rol.nombre_rol

    return toReturn
 }

 export default { login }