import React, { useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading'
import Card from '../../Components/Card/Card'
import axios from 'axios'
import HomeSlider from '../../Components/HomeSlider/HomeSlider'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import { useOnline } from '../../hooks/useOnline'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
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


  let {data, isLoading, isError, error, isSuccess} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 4000,

  })

  if(isLoading) return <Loading/>

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="FreshCart Ecommerce Home Page" />
      </Helmet>

      <HomeSlider/>
      <CategorySlider/>
      <section>
      <h2 className="text-gray-700 font-semibold mb-5 text-lg ">Shop Popular Products</h2>
   
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
        {data.data.data.map((product)=> <Card key={product.id} productInfo={product}/>)}
      </div>
      </section>
    </>
  )
}
