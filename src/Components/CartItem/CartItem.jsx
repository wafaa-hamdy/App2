import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({productInfo}) {
  const {count, price, product} = productInfo
  const {title, imageCover, category, id} = product
  const {removeProductFromCart, updateProductCount} = useContext(CartContext)

  return (
    <>
      <div className="flex gap-2">
        <div className="cart-item grow bg-gray-100 rounded-lg p-4 px-6 flex justify-between items-center gap-10  shadow-sm">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src={imageCover}
            alt=""
          />
          <h3 className="cursor-pointer text-lg text-gray-800 font-semibold grow-[3]">
            <Link to={`/product/${id}`}>{title}</Link>
          </h3>
          <h4 className="text-lg text-gray-600 font-semibold grow">{category.name}</h4>

          <div className="count flex gap-5 items-center">
            <span>{count}</span>
            <div className="icons space-y-3">
              <div
              onClick={()=>{
                updateProductCount({productId: id, count: count +1})
              }}
              className="plus cursor-pointer w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center">
                <i className="fa-solid fa-plus"></i>
              </div>
              <div
              onClick={()=>{
                updateProductCount({productId: id, count: count - 1})
              }}
              className="minus cursor-pointer w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center">
                <i className="fa-solid fa-minus"></i>
              </div>
            </div>
          </div>

          <span>{price}L.E</span>
        </div>

        <button
        onClick={()=>{
          removeProductFromCart({productId: id})
        }}
        className="bg-gray-100 hover:bg-gray-200 transition-colors duration-300 p-3 rounded-md  shadow-sm">
            <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </>
  );
}
