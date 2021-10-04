import React from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api'

// Cali
const center = {
  lat: 3.420556,
  lng: -76.52222
}
const CustomSkinMap = ({googleMapURL, containerStyle}) => {
  return (
    <LoadScript
      googleMapsApiKey={googleMapURL}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
      >
      </GoogleMap>
    </LoadScript>
  )
}

export default function Maps() {
  return (
    <CustomSkinMap
      googleMapURL="AIzaSyCpAjZ9gvtVirroeofdUv3ei7lkBTkpEQY"
      containerStyle={ {height: `100vh` }} 
    />
  );
}
