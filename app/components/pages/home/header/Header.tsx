import { IoAddOutline } from "react-icons/io5";
import { useState, useCallback } from "react";

import styles from "./Header.module.scss";
import IconItems from "./icon-items/IconItems";
import SearchBar from "./search-bar/SearchBar";
import UploadPostModal from "./upload-post-modal/UploadPostModal";
import UserProfile from "./user-profile/UserProfile";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [setShowModal]);

  return (
    <header className={styles.header}>
      {showModal && <UploadPostModal handleClick={handleClick} />}

      <IconItems />

      <SearchBar />

      <div className={styles.uploadPostButton}>
        <IoAddOutline onClick={handleClick} style={{ fontSize: "1.2rem" }} />
      </div>

      <UserProfile />
    </header>
  );
};

export default Header;
