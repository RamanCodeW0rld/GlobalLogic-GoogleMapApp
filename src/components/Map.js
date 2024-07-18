import React from "react";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../constants/constant";
import geoJson from "../constants/geodata.json";
import GeoJsonFeature from "./GeoJsonFeature";

const MapComponent = ({ selectedLocation }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  const onSelectFeature = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "800px",
        }}
        center={selectedLocation}
        zoom={13}
        onLoad={onMapLoad}
      >
        <GeoJsonFeature geoJson={geoJson} onSelectFeature={onSelectFeature} />
        {selectedFeature && (
          <div>
            <h2>Selected Feature:</h2>
            {selectedFeature.geometry && (
              <>
                <p>Type: {selectedFeature.geometry.type}</p>
                {selectedFeature.geometry.type === "Point" ? (
                  <p>
                    Coordinates:{" "}
                    {`(${selectedFeature.geometry.coordinates[1].toFixed(
                      6
                    )}, ${selectedFeature.geometry.coordinates[0].toFixed(6)})`}
                  </p>
                ) : selectedFeature.geometry.type === "LineString" ||
                  selectedFeature.geometry.type === "Polygon" ? (
                  <p>
                    Coordinates: {selectedFeature.geometry.coordinates.length}{" "}
                    points
                  </p>
                ) : (
                  <p>Coordinates: Not available</p>
              
                )}
                {console.log(selectedFeature)}
                {selectedFeature.properties && (
                  <p>{alert(selectedFeature.geometry.coordinates.join(','))}</p>
                )}
              </>
            )}
          </div>
        )}
        <MarkerF
          position={selectedLocation}
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
