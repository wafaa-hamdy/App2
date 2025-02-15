import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return await axios.request(options);
  }

  useEffect(() => {
    getCategories();
  }, []);


  let {data, isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })
  
  if(isLoading) return <Loading/>

  return (
    <>
      <section className="my-8">
        <h2 className="text-gray-700 font-semibold mb-5 text-lg ">Shop Popular Categories</h2>
          <Swiper slidesPerView={6} loop={true}>
            {data.data.data.map((category) => (
              <SwiperSlide key={category._id}>
                <div className="h-60">
                  <img
                    className="h-full object-cover w-full"
                    src={category.image}
                    alt=""
                  />
                </div>
                <h3 className="mt-2">{category.name}</h3>
              </SwiperSlide>
            ))}
          </Swiper>
      </section>
    </>
  );
}
