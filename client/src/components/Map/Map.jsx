import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import useWindowDimensions from "../WindowSize/WindowSize";
import { Marker } from "@react-google-maps/api";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DustbinService from "../../services/dustbinservice";
import { usePosition } from "../../hooks/useLocationHook";
import { makeStyles } from "@material-ui/core/styles";
import { InfoBox } from "@react-google-maps/api";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const containerStyle = {
  width: window.screen.width,
  height: window.screen.height - 235,
};

const markerPosition = [
  {
    lat: 28.778,
    lng: 80.47,
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
  const { latitude, longitude, error } = usePosition();
  const mapRef = useRef(null);
  const [center, setCenter] = useState({
    lat: latitude,
    lng: longitude,
  });

  const [map, setMap] = React.useState(null);
  const { height, width } = useWindowDimensions();

  const [mapSize, setMapSize] = useState({ width: width, height: height });
  const [markers, setMarkers] = useState([]);
  const [dustbins, setDustbins] = useState({});
  const [clickedDustbin, setClickedDustbin] = useState(null);

  //TRYING TO GET USERS CURRENT LOCATION AND UDATE ON MAP

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    console.log(newPos);
    setCenter({ lat: newPos.lat, lng: newPos.lng });
  }

  const handleNearestDustbin = (e) => {
    DustbinService.nearestDustbin({ lat: latitude, long: longitude }).then(
      (data) => {
        console.log("GOT ===> ", data);
        const dustbins = data.dustbins;

        setDustbins(dustbins);
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

  const handleDustbinClick = (pos) => {
    console.log("CLICKED: ", pos);
    const filteredDustbin = Object.keys(dustbins).forEach((dustbin) => {
      if (
        dustbins[dustbin]["location"]["coordinates"][0] === pos.lat &&
        dustbins[dustbin]["location"]["coordinates"][1] === pos.lng
      ) {
        console.log(typeof dustbins[dustbin]);
        setClickedDustbin(dustbins[dustbin]);
      }
    });
  };

  const handlePopupClick = () => {
    clickedDustbin.capacity = clickedDustbin.capacity - 1;
  };
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMarkerLoad = (marker) => {
    //sdsd
  };

  return (
    <>
      <Grid container>
        <Grid item>
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
              center={{ lat: latitude, lng: longitude }}
              zoom={18}
              onLoad={handleLoad}
              onDragEnd={handleCenter}
              onUnmount={onUnmount}
            >
              {markers.map((pos, idx) => {
                return (
                  <Marker
                    key={idx}
                    onLoad={onMarkerLoad}
                    position={pos}
                    onClick={(e) => handleDustbinClick(pos)}
                  />
                );
              })}
              {clickedDustbin ? (
                <InfoBox
                  onDomReady={handlePopupClick}
                  position={{
                    lat: clickedDustbin["location"]["coordinates"][0],
                    lng: clickedDustbin["location"]["coordinates"][1],
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "yellow",
                      opacity: 0.75,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                      Dustbin Capacity Left: {clickedDustbin.capacity}
                    </div>
                    <Button>
                      Add Waste <AddCircleOutlineIcon />
                    </Button>
                  </div>
                </InfoBox>
              ) : null}
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(Map);
