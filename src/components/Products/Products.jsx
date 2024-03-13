import { Link } from "react-router-dom";
import styles from "./Products.module.scss";
import React from "react";

const Products = ({products = [], amount }) => {
  const list = products.filter((_, i) => i < amount)

  return (
    <div className={styles.list}>
      {list.map(({ id, images, title, category: { name: cat }, price }) => (
        <Link to={`/products/${id}`} key={id} className={styles.cardWrapp}>
          {/* <div className={styles.image} style={{backgroundImage: `url(${images[0]})`}}/> */}
          <img className={styles.image} src={images[0]} alt="img" />
          <div className={styles.wrapper}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.cat}>{cat}</p>
            <div className={styles.info}>

              <div className={styles.prices}>
                <p className={styles.price}>{price}$</p>
              </div>

            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.buyButton}>Купить</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
