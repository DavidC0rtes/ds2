import React from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import sedeService from '../../services/sedes'

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

var sedes = sedeService.getAll().then(function(sites) {sedes = sites})


export default function sedesMap () {
    const { isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyCpAjZ9gvtVirroeofdUv3ei7lkBTkpEQY",
        libraries,  //Cambiar clave al probar que todo funcione
    });

    if (loadError) return "Error cargando el mapa";
    if (!isLoaded) return "Cargando"

    const convertAddress = async (address) => { //convertir la direccion a
        try {
            const result = await getGeocode({address});
            const {lat, lng} = await getLatLng(result[0]);
            const coordinates = {
                latitude: lat,
                longitude: lng
            }
            return coordinates
        } catch (error) {
            console.log (error)
        }
    }

    return (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={7}
          center={center}
          options={options}

        >
        {Object.values(sedes).map(sede => {
            const {id, nombre, direccion, id_horario } = sede;
            <Marker 
                key={id} 
                position= {{
                    lat: 3.435668, 
                    lng: -76.518606
                }}
                />    
            })}

        </GoogleMap>
    )
}