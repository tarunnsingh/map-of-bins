import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "720px",
  height: "546px",
};

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

function Map() {
  const [map, setMap] = React.useState(null);
  const [currCord, setCurrentCord] = useState({
    lat: 28.351839,
    lng: 79.9461592,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      setCurrentCord({
        lat: parseInt(position.coords.latitude),
        lng: parseInt(position.coords.latitude),
      });
    });
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey={API_KEY_GCP}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currCord}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
