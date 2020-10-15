import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import useWindowDimensions from "../WindowSize/WindowSize";
import { Marker } from "@react-google-maps/api";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DustbinService from "../../services/dustbinservice";
import { usePosition } from "../../hooks/useLocationHook";
import { makeStyles } from "@material-ui/core/styles";

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
const styles = makeStyles({
  nearestButton: {
    display: "flex",
    margin: "auto",
  },
});

function Map() {
  const classes = styles();
  const mapRef = useRef(null);
  const [center, setCenter] = useState({
    lat: 28.351839,
    lng: 79.9461592,
  });

  const [map, setMap] = React.useState(null);
  const { height, width } = useWindowDimensions();
  const { latitude, longitude, error } = usePosition();
  const [mapSize, setMapSize] = useState({ width: width, height: height });
  const [markers, setMarkers] = useState([]);
  //TRYING TO GET USERS CURRENT LOCATION AND UDATE ON MAP
  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    //   setCurrentCord({
    //     lat: parseInt(position.coords.latitude),
    //     lng: parseInt(position.coords.latitude),
    //   });
    // });
  }, []);

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    setCenter(newPos);
  }

  const handleNearestDustbin = (e) => {
    DustbinService.nearestDustbin({ lat: latitude, long: longitude }).then(
      (data) => {
        const dustbins = data.dustbins;
        Object.keys(dustbins).forEach((dustbin) => {
          markerPosition.push({
            lat: dustbins[dustbin]["location"]["coordinates"][0],
            lng: dustbins[dustbin]["location"]["coordinates"][1],
          });
        });
        setMarkers(markerPosition);
      }
    );
  };
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMarkerLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    <>
      <Grid container>
        <Grid item alignContent="right">
          <Button
            variant="outlined"
            className={classes.nearestButton}
            onClick={handleNearestDustbin}
          >
            {" "}
            GET NEAREST DUSTBINS{" "}
          </Button>
        </Grid>
        <Grid item>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={handleLoad}
              onDragEnd={handleCenter}
              onUnmount={onUnmount}
            >
              {markers.map((pos, idx) => {
                return (
                  <Marker key={idx} onLoad={onMarkerLoad} position={pos} />
                );
              })}
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(Map);
