import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import searchIcon from '../../assets/icons/search.svg'
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";
import AVATAR from '../../assets/images/avatar.jpg'
import { useGetProductsQuery } from "../../features/api/apiSlice";
import Sidebar from "../Sidebar/Sidebar";
import { useMediaQuery } from '@react-hook/media-query'

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const matches = useMediaQuery('(max-width: 768px)');

  const [isSidebarOpen, setIsSidebarOpen] = useState(!matches);

  const {currentUser, cart, favourites} = useSelector(({user}) => user);
  const [searchValue, setSearchValue] = useState("");

  const [values, setValues] = useState({name: "guest", avatar: AVATAR})

  const {data, isLoading, refetch} = useGetProductsQuery({title: searchValue})

  useEffect(() => {
    if(!currentUser) return;
    setValues(currentUser)
  }, [currentUser]);

  const handleClick = () => {
    if(!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE)
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
        <div className={styles.menuIcon} onClick={() => toggleSidebar()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="Hamburger" >
            <g fill="#ffffff" className="color134563 svgShape">
              <path d="M8.2 13h47.5v6.3H8.2zM8.2 28.8h47.5v6.4H8.2zM8.2 44.7h47.5V51H8.2z" fill="#fff"></path>
            </g>
          </svg>
        </div>
        {/* <Sidebar isOpen={isSidebarOpen}/> */}

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
        <Link to='/favourites' className={styles.heart}>
          <svg>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}/>
          </svg>
          {!!favourites.length && (
              <span className={styles.count}>{favourites.length}</span>
          )}
        </Link>
        <Link to="/cart">
          <svg>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}/>
          </svg>
          {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
          )}
        </Link>
        {currentUser ?
         (<Link to="/profile" className={styles.account}>
            <img src={values.avatar} alt="avatar"/>
            <p>{values.name}</p>
          </Link>)
          : 
          (<button onClick={handleClick}>Log In</button>)
        }
      </div>
    </div>
  );
};

export default Header;
