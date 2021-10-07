import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';

import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
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
    lat: 3.4461792,
    lng: -76.5140701
}

const options = {
    //para cuando queramos cambiar como se ve el mapa
    zoomControl: true
}
export default function sedesMap () {

    const [sedes, setSedes] = useState([]) // Almacena los usuarios traídos de la db.
    const [update, setUpdate] = useState(0) // Para saber si se le ha dado clic a "Actualizar"
    const [selectedSede, setSelectedSede] = useState(null)
    const previousUpdate = usePrevious(update)




    useEffect(() => {
        const fetchSedes = async () => {
          const result = await sedeService.getAll()

          result.forEach((item) => {
            item.id_direccion = item.direccion
            item.id_hora_apertura = item.hora_apertura
            item.id_hora_cierre = item.hora_cierre
            item.id_descripcion = item.descripcion
            item.id_latitud = item.latitud
            item.id_longitud = item.longitud
            
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
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,  //Cambiar clave al probar que todo funcione
    });
    

    if (loadError) return "Error cargando el mapa";
    if (!isLoaded) return "Cargando"



    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
          options={options}
   

        >
         {sedes.map(sede => (  //Crear marcadores para el mapa
            <Marker 
            key={sede.id} 
            position = {{
                lat: parseFloat(sede.latitud), //Se me escapa por qué, pero las coordenadas se convierten en texto en 
                lng: parseFloat(sede.longitud) //algun lado del traerlas de la BD
            }}
            onClick = {() => {
              setSelectedSede(sede);
            }}
            icon = {{
              url: "https://i.postimg.cc/yNpPwzwg/pollo-logo-1.png",
              scaledSize: new window.google.maps.Size(30,30)
            }}
            /> 
           
         ))}    
         {selectedSede ? (
           <InfoWindow
           position = {{
            lat: parseFloat(selectedSede.latitud), //Se me escapa por qué, pero las coordenadas se convierten en texto en 
            lng: parseFloat(selectedSede.longitud) //algun lado del traerlas de la BD
          }}
          onCloseClick = {() => {
            setSelectedSede(null);
          }}
          
          >
             <div>{selectedSede.direccion}
             <p>{selectedSede.hora_apertura} horas - {selectedSede.hora_cierre} horas</p> 
             </div>
              
           </InfoWindow>
         ) : null}
        </GoogleMap>
        </div>
    );
}

