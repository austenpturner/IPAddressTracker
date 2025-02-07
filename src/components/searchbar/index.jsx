import searchArrow from "../../assets/images/icon-arrow.svg";
import styles from "./searchbar.module.scss";

export default function SearchBar() {
  return (
    <div className={styles.searchbarContainer}>
      <form action="">
        <input
          type="text"
          placeholder="Search for any IP address or domain... "
        />
        <button type="submit">
          <img src={searchArrow} alt="search" />
        </button>
      </form>
    </div>
  );
}
