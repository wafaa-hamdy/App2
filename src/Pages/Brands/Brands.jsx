import { useQueries, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import Loading from "../../Components/Loading/Loading"
import { Helmet } from "react-helmet"

export default function Brands() {
    async function getBrands() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/brands",
            method: "GET"
        }
        return await axios.request(options)
    }

    useEffect(()=>{
        getBrands()
    },[])

    let {data, isLoading} = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
        staleTime: 4000,
    })

    if (isLoading) return <Loading/>


  return <>
    <Helmet>
        <title>Brands</title>
    </Helmet>


    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.data.data.map((brand)=>        
        <div key={brand._id} className="card hover:shadow-primary-200  hover:shadow-md transition-shadow duration-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img src={brand.image} className=" w-full object-cover object-center" alt="" />
            <h3 className="text-lg text-slate-700 font-semibold p-5">{brand.name}</h3>
        </div>)}
    </section>
  </>
}
