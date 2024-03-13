import React from 'react'
import Products from '../../components/Products/Products'
import { useSelector } from 'react-redux'


const Home = () => {
  const {list} = useSelector(({products}) => products)


  return (
    <div>
        <Products products={list} amount={5}/>
    </div>
  )
}

export default Home
