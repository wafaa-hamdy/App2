import React, { useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading'
import Card from '../../Components/Card/Card'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

export default function Products() {
  async function getProducts(){
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET"
    }
    return await axios.request(options)
  }

  useEffect(()=>{
    getProducts()
  },[])


  let {data, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 4000,

  })

  if(isLoading) return <Loading/>

  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="FreshCart Products" />
      </Helmet>

      <section>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
        {data.data.data.map((product)=> <Card key={product.id} productInfo={product}/>)}
      </div>
      </section>
    </>
  )
}

