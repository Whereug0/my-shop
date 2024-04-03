import React from 'react';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories)

  return (
    <div className={styles.sidebar}>
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
  )
}

export default Sidebar
