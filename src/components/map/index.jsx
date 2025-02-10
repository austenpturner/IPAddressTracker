import { useContext, useEffect, useState } from "react";
import { TrackerContext } from "../../context/TrackerContext";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import customMarker from "../../assets/images/icon-location.svg";
import styles from "./map.module.scss";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Default to San Francisco
const initialState = {
  lat: 37.7749,
  lng: -122.4194,
};

export default function MapContainer() {
  const [coordinates, setCoordinates] = useState(initialState);
  const { state } = useContext(TrackerContext);
  const ip = state.output.ip;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  async function fetchMap() {
    const url = `http://ip-api.com/json/${ip}`;
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data) {
        console.log(data);
        setCoordinates({ lat: data.lat, lng: data.lon });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(ip);
    if (!ip) return;
    fetchMap();
  }, [ip]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={styles.mapContainer}>
      <GoogleMap center={coordinates} zoom={12}>
        <Marker
          position={coordinates}
          icon={{
            url: customMarker,
            //   scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 50),
          }}
        />
      </GoogleMap>
    </div>
  );
}
