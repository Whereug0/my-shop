import React from 'react';
import { useSelector } from 'react-redux';
import Products from '../../components/Products/Products';


const Home = () => {
  const {list} = useSelector(({products}) => products)


  return (
    <div>
        <Products products={list} amount={15}/>
    </div>
  )
}

export default Home
