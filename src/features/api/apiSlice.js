import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../utils/constants'
import { buildUrl } from '../../utils/commons';

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({id}) => `/products/${id}`,
      provideTags: ["Product"],
    }),
    getProducts: builder.query({
      query: (params) => buildUrl("/products", params),
      provideTags: ["Product"],
    }),
  })
})


export const { useGetProductQuery, useGetProductsQuery } = apiSlice;