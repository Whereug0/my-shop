import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import {ROUTES} from '../../utils/routes'
import SingleProduct from '../Products/SingleProduct'
import SingleCategory from '../SingleCategory/SingleCategory'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />}/>
      <Route path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
      {/* <Route path={ROUTES.PROFILE} element={<SingleProduct/>}/> */}
      <Route path={ROUTES.CATEGORY} element={<SingleCategory/>}/>
    </Routes>
  )
}

export default AppRoutes
