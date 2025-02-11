import { useContext } from "react";
import ResultCard from "../card";
import styles from "./results.module.scss";
import MapWrapper from "../map";
import { APIProvider } from "@vis.gl/react-google-maps";
import { TrackerContext } from "../../context/trackerContext";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function ResultsContainer() {
  const { state } = useContext(TrackerContext);

  if (!state.output || state?.output?.results?.length === 0)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.results}>
        {state?.output?.results?.map((result) => {
          return (
            <ResultCard
              type={result.name}
              result={result.result}
              key={result.id}
            />
          );
        })}
      </div>
      <div className={styles.mapContainer}>
        <APIProvider apiKey={apiKey}>
          <MapWrapper />
        </APIProvider>
      </div>
    </div>
  );
}
