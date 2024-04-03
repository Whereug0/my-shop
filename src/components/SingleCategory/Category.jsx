import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import styles from './Category.module.scss';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';


const Category = () => {
  const {id} = useParams();
  const {list} = useSelector(({ categories }) => categories);

  const defaulValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    ...defaulValues,
  };

  const [titleCategory, setTitleCategory] = useState("All products");
  const [values, setValues] = useState(defaulValues);
  const [params, setParams] = useState(defaultParams);

  useEffect(()=> {
    if(!id) return;
    setValues(defaulValues)

    setParams({...defaultParams, categoryId: id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);

  useEffect(() => {
    if(!id || !list.length) return;

    const category = list.find((item) => item.id === id * 1);

    setTitleCategory(category);
  }, [list, id]);

  const {data = [], isLoading, isSuccess} = useGetProductsQuery(params);
  

  const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setParams({...defaultParams, ...values})
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <span style={{fontSize: 16, fontWeight: 700}}>{titleCategory?.name}</span>
          <input 
            type="text" 
            name="title" 
            onChange={handleChange} 
            placeholder='Product name'
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <span>Price from</span>
          <input 
            type="number" 
            name="price_min" 
            onChange={handleChange} 
            placeholder='0'
            value={values.price_min}
          />
        </div>  
        <div className={styles.filter}>
          <span>Price to</span>
          <input 
            type="number" 
            name="price_max" 
            onChange={handleChange} 
            placeholder='0'
            value={values.price_max}
          />
        </div>
        <button type="submit" hidden style={{display:'none'}}/>
      </form>

      {isLoading ? (
        <div>Loading...</div>
      ): !isSuccess || !data.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button>Reset</button>
        </div>
      ): (
        <Products title={titleCategory} products={data} amount={data.length}/>
      )}
    </div>
  )
}

export default Category
