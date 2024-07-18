import { useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { REACT_APP_GOOGLE_MAPS_KEY } from '../constants/constant';
import { geoJson } from '../constants/geodata';

const GeoJsonFeature = ({ map }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
  });

  const [dataLayer, setDataLayer] = useState(null);

  useEffect(() => {
    if (isLoaded && map) {
      const dataLayer = new window.google.maps.Data();
      dataLayer.addGeoJson(geoJson);
      setDataLayer(dataLayer);
    }
  }, [geoJson, map, isLoaded]);

  useEffect(() => {
    if (dataLayer && map) {
      dataLayer.setMap(map);
    }
  }, [dataLayer, map]);

  return null;
};

export default GeoJsonFeature;