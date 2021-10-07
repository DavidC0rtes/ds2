/**
 * Este archivo manda todas las peticiones que tienen que ver con las facturas
 */

 require('dotenv').config()
 import axios from 'axios'
  const baseUrl = process.env.NODE_ENV === 'production' ? '/api/facturas' : 'http://localhost:3001/api/facturas'
 
 /**
  * Obtiene todos las facturas del proyecto, i.e: manda una petición
  * GET a baseUrl
  *
  * @return array
  */
 const getAll = () => {
     const request = axios.get(baseUrl)
     return request.then(response => response.data)
 }

 const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
 
 
 // eslint-disable-next-line
 export default {
     getAll,
     create
 }
 