import SliderImage1 from "../../assets/images/slider-image-1.jpeg"
import SliderImage2 from "../../assets/images/slider-image-2.jpeg"
import SliderImage3 from "../../assets/images/slider-image-3.jpeg"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function HomeSlider() {
  return <>
    <section className="grid grid-cols-12 mb-8">

      <div className="col-span-8">
        <Swiper slidesPerView={1} loop={true} className="h-full">
          <SwiperSlide>
            <img className="w-full h-full" src={SliderImage3} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full" src={SliderImage3} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full" src={SliderImage3} alt="" />
          </SwiperSlide>
        </Swiper>

      </div>

      <div className="col-span-4">
        <img className="w-full" src={SliderImage1} alt="" />
        <img className="w-full" src={SliderImage2} alt="" />
      </div>

    </section>
  </>
}

