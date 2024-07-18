
import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const GeoJsonFeature = ({ geoJson ,onSelectFeature}) => {
  return geoJson.features.map((feature) => {
    let position;
    switch (feature.geometry.type) {
      case 'Point':
        position = {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
        };
        break;
      case 'LineString':
      case 'Polygon':
      
        position = {
          lat: 0, 
          lng: 0, 
        };
        break;
      default:
        throw new Error(`Unsupported geometry type: ${feature.geometry.type}`);
    }

    return (
      <MarkerF
        key={feature.id}
        position={position}
        icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        onClick={() => onSelectFeature(feature)}
      />
    );
  });
};

export default GeoJsonFeature;