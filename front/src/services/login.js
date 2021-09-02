/**
 * Peticiones que tienen que ver con el login
 */
 require('dotenv').config()
 import axios from 'axios'
 const baseUrl = process.env.REACT_APP_CI ? '/api/login' : 'http://localhost:3001/api/login'

 const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    
    // Manipulaciones para que el objeto devuelto sea un poco más sencillo.
    const toReturn = JSON.parse(JSON.stringify(response.data))
    delete toReturn.rol
    toReturn.rol = response.data.rol.nombre_rol

    return toReturn
 }

 export default { login }
