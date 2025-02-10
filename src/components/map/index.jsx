import { useContext } from "react";
import { TrackerContext } from "../../context/TrackerContext";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import customMarker from "../../assets/images/icon-location.svg";
import PropTypes from "prop-types";
import styles from "./map.module.scss";
import { useWindowSize } from "../../hooks/useWindowResize";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapContainer() {
  const { state } = useContext(TrackerContext);

  if (!state.output)
    return (
      <div className={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className={styles.mapContainer}>
      <APIProvider apiKey={apiKey}>
        <MapWrapper lat={state.output.lat} lng={state.output.lng} />
      </APIProvider>
    </div>
  );
}

function MapWrapper({ lat, lng }) {
  const isLoaded = useApiIsLoaded();
  const { width } = useWindowSize();
  const mapHeight = width >= 1024 ? "70vh" : "60vh";

  if (!isLoaded) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <Map
      style={{ width: "100vw", height: mapHeight }}
      center={{ lat, lng }}
      zoom={16}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      id="map"
      mapId="map"
    >
      <AdvancedMarker position={{ lat, lng }} title="Custom Marker">
        <img src={customMarker} alt="map marker" width={44} />
      </AdvancedMarker>
    </Map>
  );
}

MapWrapper.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};
