import React from 'react'
import { useSelector } from 'react-redux'
import SingleCategory from '../../components/SingleCategory/SingleCategory'

const Home = () => {
  const {list} = useSelector(({products}) => products)


  return (
    <div>
        <SingleCategory products={list} amount={9}/>
    </div>
  )
}

export default Home
