import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react";
import "./App.css";
import SearchLocationInput from "./components/GooglePlacesApi";
import MapComponent from "./components/Map";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 25.6185024,
    lng: 85.0726964,
  });
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <SearchLocationInput setSelectedLocation={setSelectedLocation} />
        <MapComponent selectedLocation={selectedLocation} />  
    </div>
  );
}

export default App;