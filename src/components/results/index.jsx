import { useContext, useEffect, useState } from "react";
import ResultCard from "../card";
import styles from "./results.module.scss";
import { TrackerContext } from "../../context/TrackerContext";

const initialState = [
  {
    id: 1,
    name: "IP Address",
    result: "---",
  },
  {
    id: 2,
    name: "Location",
    result: "---",
  },
  {
    id: 3,
    name: "Timezone",
    result: "---",
  },
  {
    id: 4,
    name: "ISP",
    result: "---",
  },
];

export default function ResultsContainer() {
  const [outputs, setOutputs] = useState(initialState);
  const { state } = useContext(TrackerContext);
  const results = state.output;

  useEffect(() => {
    console.log(results);
    if (results.length === 0) return;
    const updatedOutputs = [
      {
        id: 1,
        name: "IP Address",
        result: results.ip,
      },
      {
        id: 2,
        name: "Location",
        result: `${results.location.region}, ${results.location.country}`,
      },
      {
        id: 3,
        name: "Timezone",
        result: `UTC ${results.location.timezone}`,
      },
      {
        id: 4,
        name: "ISP",
        result: results.isp,
      },
    ];
    setOutputs(updatedOutputs);
  }, [results]);

  return (
    <div className={styles.container}>
      {outputs.map((output) => {
        return (
          <>
            <ResultCard
              type={output.name}
              result={output.result}
              key={output.id}
            />
            <div className={styles.desktopBorder}></div>
          </>
        );
      })}
    </div>
  );
}
