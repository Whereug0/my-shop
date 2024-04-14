import React, { useEffect, useRef } from 'react';
import styles from './BurgerMenu.module.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const BurgerMenu = ({ isSidebarOpen, closeSidebar }) => {
  const { list } = useSelector(({ categories }) => categories);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeSidebar(); // Закрыть бургер-меню, если клик был совершен вне его
      }
    };
  
    // Добавить обработчик события клика на весь документ
    document.addEventListener('click', handleClickOutside);
  
    // Удалить обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeSidebar]);

  return (
    <>
    {isSidebarOpen && <div className={styles.blur} onClick={closeSidebar}/>}

    <div className={`${styles.burgerMenu} ${isSidebarOpen ? styles.open : ""}`} onClick={(e) => e.stopPropagation()}>
          <h1 className={styles.title}>Categories</h1>
          <nav>
            <ul className={styles.menu}>
              {list.slice(0, 8).map(({ id, name }) => (
                <li key={id}>
                  <NavLink
                    className={({isActive}) => `${styles.link} ${isActive ? styles.active : ""}`}
                    to={`/categories/${id}`}
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
    </>
  )
}

export default BurgerMenu
