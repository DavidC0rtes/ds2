import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';

import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import sedeService from '../../services/sedes'

function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

const libraries =["places"];
const mapContainerStyle ={
    width: "100vw",
    height: "100vh"
}
const center = {
    lat: 3.420556,
    lng: -76.52222
}

const options = {
    //para cuando queramos cambiar como se ve el mapa
    zoomControl: true
}
export default function sedesMap () {

    const [sedes, setSedes] = useState([]) // Almacena los usuarios traídos de la db.
    const [update, setUpdate] = useState(0) // Para saber si se le ha dado clic a "Actualizar"
    const previousUpdate = usePrevious(update)

    const convertAddress = (address) => { //convertir la direccion a
        try {
            getGeocode({address}).then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
               return { lat, lng }      
            })
        } catch (error) {
            console.log (error)
        }      
    }



    useEffect(() => {
        const fetchSedes = async () => {
          const result = await sedeService.getAll()
          
          result.forEach( async (item) => {
              var results = await getGeocode({address: item.direccion})
              item.coordinates= await getLatLng(results[0]);
              console.log(item.coordinates)
              console.log(item)
          })
          setSedes(result)

          result.forEach((item) => {
            item.id_direccion = item.direccion
            item.id_hora_apertura = item.hora_apertura
            item.id_hora_cierre = item.hora_cierre
            item.id_descripcion = item.descripcion
            
          })
          setSedes(result)
          
        }
    
        // Solo llamar a la función si se le ha dado click
        // al botón de actualizar.
        if (previousUpdate !== update) {
          fetchSedes()
        }
      }, [update])
      console.log(sedes)
     
      
  

    const { isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCpAjZ9gvtVirroeofdUv3ei7lkBTkpEQY',
        libraries,  //Cambiar clave al probar que todo funcione
    });

    if (loadError) return "Error cargando el mapa";
    if (!isLoaded) return "Cargando"





    return (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          center={center}
          options={options}

        >
         {(sedes).map(sede => {
            const {id, nombre, direccion, id_horario, coordinates, coordenadas } = sede
            console.log(sede)
            console.log(direccion)
            console.log(sede.coordinates)
            console.log(coordenadas);
            <Marker 
                key={id} 
                position= {{
                    lat: 40, 
                    lng: -3
                }}
                />    
            })}    


        </GoogleMap>
    )
}