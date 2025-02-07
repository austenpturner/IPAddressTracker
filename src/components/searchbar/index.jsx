import { useState } from "react";
import searchArrow from "../../assets/images/icon-arrow.svg";
import styles from "./searchbar.module.scss";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInputChange(event) {
    console.log(event.target.value);
    setSearchInput(event.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    console.log(searchInput);
  }

  return (
    <div className={styles.searchbarContainer}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          value={searchInput}
          placeholder="Search for any IP address or domain"
          onChange={handleSearchInputChange}
        />
        <button type="submit">
          <img src={searchArrow} alt="search" />
        </button>
      </form>
    </div>
  );
}
