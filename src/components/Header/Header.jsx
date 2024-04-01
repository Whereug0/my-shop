import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import searchIcon from '../../assets/icons/search.svg'
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";
import AVATAR from '../../assets/images/avatar.jpg'

const Header = () => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(({user}) => user);

  const [values, setValues] = useState({name: "guest", avatar: AVATAR})

  useEffect(() => {
    if(!currentUser) return;
    setValues(currentUser)
  }, [currentUser]);

  const handleClick = () => {
    if(!currentUser) dispatch(toggleForm(true));
  };

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
        <Link className={styles.heart}>
          <svg>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}/>
          </svg>
        </Link>
        <Link>
          <svg>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}/>
          </svg>
        </Link>
        {currentUser ?
         (<div className={styles.account}>
            <img src={values.avatar} alt="avatar"/>
            <p>{values.name}</p>
          </div>)
          : 
          (<button onClick={handleClick}>Log In</button>)
        }
      </div>
    </div>
  );
};

export default Header;
