import React from 'react';
import styles from './Cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { summ } from '../../utils/commons';
import { addItemToCart, removeItemFromCart } from '../../features/user/userSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ user }) => user);

  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const deleteItem = (id) => {
    dispatch(removeItemFromCart(id));
  };


  return (
    <div className={styles.cart}>
      <h1 className={styles.title}>Your cart</h1>
      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item;
              return (
                <div className={styles.item} key={id}>
                  <div className={styles.product}>
                    <img src={images[0]} alt={title} />
                    <div className={styles.info}>
                      <h2 className={styles.title}>{title}</h2>
                      <h3 className={styles.category}>{category.name}</h3>
                    </div>
                  </div>
                  <div className={styles.infoPrice}>
                    <p className={styles.price}>{price}$</p>
                    <div className={styles.quantity}>
                      <div
                        className={styles.minus}
                        onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
                      >
                        <svg className={styles.icon}>
                          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`} />
                        </svg>
                      </div>

                      <span>{quantity}</span>

                      <div
                        className={styles.plus}
                        onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}
                      >
                        <svg className={styles.icon}>
                          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`} />
                        </svg>
                      </div>
                    </div>

                    <div className={styles.total}>{price * quantity}$</div>

                    <div className={styles.close} onClick={() => deleteItem(item.id)}>
                      <svg className={styles.icon}>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE: {''}
              <span>{summ(cart.map(({ quantity, price }) => quantity * price))}$</span>
            </div>

            <button className={styles.proceed}>
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

