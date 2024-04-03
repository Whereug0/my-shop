import React from 'react';
import styles from './Favourites.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItemToFavourites } from '../../features/user/userSlice';


const Favourites = () => {
  const dispatch = useDispatch();
  const { favourites } = useSelector(({ user }) => user);

  const deleteItem = (id, e) => {
    e.preventDefault()
    dispatch(removeItemToFavourites(id));
  };
 
  return (
    <div className={styles.favourites}>
      <h1 className={styles.title}>Your favourites</h1>
      {!favourites.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <div className={styles.list}>
          {favourites.map((item) => {
            const {images, title, price, id} = item;
            return <Link to={`/products/${id}`} key={id} className={styles.cardWrapp}>
            <img className={styles.image} src={images[0]} alt="img" />
            <div className={styles.wrapper}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.cat}>{item.category.name}</p>
              <div className={styles.info}>
                <div className={styles.prices}>
                  <p className={styles.price}>{price}$</p>
                </div>
              </div>
              <button 
                className={styles.removeBtn}
                onClick={(e) => deleteItem(item.id, e)}
              >
                Remove
              </button>
            </div>
          </Link>
          })}
        </div>
      )}
    </div>
  )
}

export default Favourites
