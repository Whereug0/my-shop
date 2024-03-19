import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../features/api/apiSlice'
import { ROUTES } from '../../utils/routes';
import Product from './Product/Product';

const SingleProduct = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const {data, isLoading, isFetching, isSuccess} = useGetProductQuery({id});

  useEffect(() => {
    if(!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME)
    }
  },[isLoading, isFetching, isSuccess, navigate])

  return !data ?(
   <div>loading...</div>
  ) : (
    <div>
      <Product {...data}/>
    </div>
  )
}

export default SingleProduct

