import React from "react";
import styles from "./Header.module.scss";
import searchIcon from '../../assets/icons/search.svg'
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";


const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>Logo</Link>
      </div>
        <form className={styles.inputWrapp} action="">
          <img 
            className={styles.searchIcon} 
            src={searchIcon} 
            alt="search" 
          />
          <input 
            type="text" 
            placeholder="Search" 
            onChange={() => {}}
            value=""
          />
          {false && <div className={styles.box}></div>}
        </form>
      <div className={styles.buttons}>
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
