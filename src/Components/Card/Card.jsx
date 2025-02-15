import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link, NavLink } from 'react-router-dom'
import { WishlistContext } from "../../Context/Wishlist.context";

export default function Card({ productInfo }) {
  const { title, category, price, imageCover, description, ratingsAverage, id } =
    productInfo;

    const {addProductToCart} = useContext(CartContext)
    const {addProductToWishlist} = useContext(WishlistContext)
  return (
    <>
      <div className="card group/card rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
        <div className="relative">
            <img src={imageCover} alt="" />
            <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 absolute w-full h-full bg-slate-400 left-0 top-0 flex justify-center items-center gap-4 bg-opacity-45 opacity-0">
                <div
                onClick={() => {
                  addProductToWishlist({productId: id})
                }}
                className="icon w-8 h-8 bg-primary-500 text-white flex justify-center items-center rounded-full cursor-pointer">
                    <i className="fa-solid fa-heart"><a href=""></a></i>
                </div>

                <div
                onClick={() => {
                  addProductToCart({productId: id})
                }}
                className="icon w-8 h-8 bg-primary-500 text-white flex justify-center items-center rounded-full cursor-pointer">
                    <i className="fa-solid fa-cart-shopping"><a href=""></a></i>
                </div>

                <Link to={`/product/${id}`} className="icon w-8 h-8 bg-primary-500 text-white flex justify-center items-center rounded-full cursor-pointer">
                    <i className="fa-solid fa-eye"></i>
                </Link>
            </div>
        </div>
        <div className="card-body p-4 space-y-3">
          <header>
            <h3 className="text-lg text-slate-700 font-semibold line-clamp-1">
              <Link to={`/product/${id}`}>{title}</Link>
            </h3>
            <h4 className="text-sm text-primary-500 font-semibold">
              {category.name}
            </h4>
          </header>
          <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{price} L.E</span>
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
