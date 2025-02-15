import { useContext } from 'react'
import { WishlistContext } from '../../Context/Wishlist.context'
import { CartContext } from '../../Context/Cart.context'
import { Link } from 'react-router-dom'

export default function WishlistItem({ productInfo }) {
  const { title, imageCover, id, price } = productInfo
  const { removeProductFromWishlist } = useContext(WishlistContext)
  const { addProductToCart } = useContext(CartContext)

  return (
    <>
      <div className="product flex gap-10 border-b-2 pb-4">
        <img className="w-48" src={imageCover} alt="" />
        <div className="flex justify-evenly flex-col">
          <div>
            <h2 className="font-bold text-lg mb-3">
              <Link to={`/product/${id}`}>{title}</Link>
            </h2>
            <p className="text-primary-600 font-semibold mb-3">{price} L.E</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                removeProductFromWishlist({ productId: id })
              }}
              className="btn bg-red-500 text-white hover:bg-red-600"
            >
              <i className="fa-solid fa-trash"></i> Remove
            </button>
            <button
              onClick={() => {
                addProductToCart({ productId: id })
                removeProductFromWishlist({productId : id})
              }}
              className="btn bg-primary-500 text-white hover:bg-primary-600"
            >
              <i className="fa-solid fa-cart-plus"></i> Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
