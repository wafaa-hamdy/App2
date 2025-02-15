import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import {Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../Components/Card/Card";
import { useOnline } from "../../hooks/useOnline";
import { Helmet } from "react-helmet";

export default function ProductDetails() {

    let isOnline = useOnline( )
    
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    let { id } = useParams();
    const {addProductToCart} = useContext(CartContext)

    async function getProductDetails(){
        try {
            const options={
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method: 'GET',
            }
    
            let {data} = await axios.request(options)
            setProductDetails(data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    async function getRelatedProducts(){
      try {
        let options = {
          url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
          method: 'GET',
        }
        let {data} = await axios.request(options)
        setRelatedProducts(data.data)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
        getProductDetails();
    }, [])

    useEffect(()=>{
      if(productDetails == null) return;
        getRelatedProducts()
    }, [productDetails])



  return (
    <>
    <Helmet>
      <title>Product Details</title>
    </Helmet>
      {productDetails ? (
      <>
      <Helmet>
        <title>{productDetails.title}</title>
      </Helmet>
        <section className="grid grid-cols-12 gap-12">
        <div className="col-span-3">
            <ReactImageGallery
            showFullscreenButton = {false}
            showPlayButton = {false}
            showNav={false}
            items={productDetails.images.map((image)=>{
                return {
                    original: image,
                    thumbnail: image,
                }
            })}/>
        </div>

        <div className="col-span-9 mt-9 flex flex-col space-y-4">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-gray-700">{productDetails.title}</h2>
                <h3 className="text-primary-600 font-semibold">{productDetails.category.name}</h3>
            </div>
            <p className="text-gray-500">{productDetails.description}</p>

          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{productDetails.price} L.E</span>

            <div>
                <span className="font-bold text-lg">{productDetails.ratingsAverage}</span>
                <i className="fa-solid fa-star ml-1 text-yellow-500 font-bold text-lg"></i>
            </div>
          </div>

          {isOnline && (<button
          onClick={()=>{
            addProductToCart({productId: id})
          }}
          className="btn bg-primary-500 hover:bg-primary-600 text-white font-semibold w-1/2 self-center">Add To Cart</button>)}
        </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-600 mt-8 mb-3">Related Products</h2>
          {relatedProducts? <Swiper slidesPerView={6} spaceBetween={15}>
            {relatedProducts.map((product)=> <SwiperSlide key={product.id}>
              <Card productInfo={product}/>
            </SwiperSlide>)}
          </Swiper> : <Loading/>}
        </section>
      </>)
      : <Loading/>}
    </>
  );
}
