import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import searchIcon from '../../assets/icons/search.svg'
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";
import AVATAR from '../../assets/images/avatar.jpg'
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(({user}) => user);
  const [searchValue, setSearchValue] = useState("");

  const [values, setValues] = useState({name: "guest", avatar: AVATAR})

  const {data, isLoading, refetch} = useGetProductsQuery({title: searchValue})

  useEffect(() => {
    if(!currentUser) return;
    setValues(currentUser)
  }, [currentUser]);

  const handleClick = () => {
    if(!currentUser) dispatch(toggleForm(true));
  };

  const handleSearch = ({target: {value}}) => {
    setSearchValue(value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch({ title: searchValue });
    }, 500); 
    return () => clearTimeout(timer);
  }, [searchValue, refetch]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>Logo</Link>
      </div>
        <form className={styles.inputWrapp} action="">
         <div style={{display: "flex", gap: 10}}>
          <img
              className={styles.searchIcon} 
              src={searchIcon} 
              alt="search" 
            />
            <input 
              type="text" 
              placeholder="Search" 
              onChange={handleSearch}
              value={searchValue}
            />
         </div>
          {searchValue && <div className={styles.box}>
           {isLoading ? 'Loading:': !data.length ? "No results": (
            data.map(({title, images, id}) => {
              return (
              <Link key={id} onClick={() => setSearchValue('')} className={styles.product} to={`/products/${id}`}>
                <div className={styles.imageWrapp}>
                  <img className={styles.image} src={images[0]} alt="img" />
                </div>
                <div className={styles.title}>{title}</div>
              </Link>
              )
            })
           )} 
          </div>}
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
