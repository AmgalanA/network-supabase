import { AiOutlineSearch } from "react-icons/ai";

import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  return (
    <div className={styles.search}>
      <input type="text" placeholder="Search..." />

      <AiOutlineSearch className={styles.searchIcon} />
    </div>
  );
};

export default SearchBar;
