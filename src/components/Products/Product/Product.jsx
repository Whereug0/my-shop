import React, { useEffect, useState } from 'react';
import styles from './Product.module.scss';
import { useDispatch } from 'react-redux';
import { addItemToCart, addItemToFavourites } from '../../../features/user/userSlice';


const SIZES = [4,5,2,5.5];


const Product = (item) => {
  const {
    images, 
    title, 
    price, 
    description
  } = item


  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  },[images])

  const addToCart = () => {
    dispatch(addItemToCart(item));
  }

  const addToFavourites = () => {
    dispatch(addItemToFavourites(item))
  }
  
  return (
    <div className={styles.product}>
      <div className={styles.images}>
        <img src={currentImage} className={styles.currentImage} alt="" />
        <div className={styles.imagesList}>
          {images.map((image, i) => (
              <img
                key={i}
                src={image}
                className={styles.image}
                alt=''
                onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
       
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>
          {price}$
        </div>
        <div className={styles.sizes}>
          <span>Sizes:</span>

          <div className={styles.listSize}>
            {SIZES.map(size => (
              <div
                key={size} 
                className={`${styles.size} ${currentSize === size ? styles.active: ""}`}
                onClick={()=> setCurrentSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            onClick={addToCart}
            className={`${styles.add} ${!currentSize ? styles.disabled : ''}`}
            disabled={!currentSize}
          >
              Add to cart
            </button>
          <button
            className={styles.favourite}
            onClick={addToFavourites}
          >
            Add to favourites
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
