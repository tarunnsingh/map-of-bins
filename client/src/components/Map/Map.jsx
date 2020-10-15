import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import useWindowDimensions from "../WindowSize/WindowSize";
import { Marker } from "@react-google-maps/api";

const containerStyle = {
  width: window.screen.width,
  height: window.screen.height - 208,
};

const markerPosition = [
  {
    lat: 28.778,
    lng: 80.47,
  },
  {
    lat: 28.45,
    lng: 80.11,
  },
  {
    lat: 28.25,
    lng: 79.95,
  },
  {
    lat: 28.22,
    lng: 80.012,
  },
];

function Map() {
  const mapRef = useRef(null);
  const [center, setCenter] = useState({
    lat: 28.351839,
    lng: 79.9461592,
  });
  const [map, setMap] = React.useState(null);
  const { height, width } = useWindowDimensions();
  const [mapSize, setMapSize] = useState({ width: width, height: height });

  // TRYING TO GET USERS CURRENT LOCATION AND UDATE ON MAP
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);

  //     setCurrentCord({
  //       lat: parseInt(position.coords.latitude),
  //       lng: parseInt(position.coords.latitude),
  //     });
  //   });
  // }, []);

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    setCenter(newPos);
  }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMarkerLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={handleLoad}
        onDragEnd={handleCenter}
        onUnmount={onUnmount}
      >
        {markerPosition.map((pos, idx) => {
          return <Marker key={idx} onLoad={onMarkerLoad} position={pos} />;
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
