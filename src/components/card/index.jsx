import styles from "./card.module.scss";
import PropTypes from "prop-types";

export default function ResultCard({ type, result }) {
  return (
    <div className={styles.cardContainer}>
      <h2>{type}</h2>
      <p>{result}</p>
    </div>
  );
}

ResultCard.propTypes = {
  type: PropTypes.string,
  result: PropTypes.string,
};
