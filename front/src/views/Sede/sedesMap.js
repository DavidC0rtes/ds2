import React from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import {formatRelative} from "date-fns"

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
    const { isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyCpAjZ9gvtVirroeofdUv3ei7lkBTkpEQY",
        libraries,  //Cambiar clave al probar que todo funcione
    });

    if (loadError) return "Error cargando el mapa";
    if (!isLoaded) return "Cargando"

    return (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={7}
          center={center}
          options={options}

        ></GoogleMap>
    )
}