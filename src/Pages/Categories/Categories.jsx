import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../Components/Loading/Loading";

export default function Categories() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET"
    }
    return await axios.request(options)
  }

  useEffect(()=>{
    getCategories()
  },[])


  let{data, isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 4000,
  })  

  if(isLoading) return <Loading/>


  return <>
    <Helmet>
        <title>Categories</title>
    </Helmet>


    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.data.data.map((category)=>        
        <div key={category._id} className="card hover:shadow-primary-200  hover:shadow-md transition-shadow duration-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img src={category.image} className="w-full h-[300px] object-cover object-center" alt="" />
            <h3 className="text-lg text-slate-700 font-semibold p-5">{category.name}</h3>
        </div>)}
    </section>
  
  </>
}
