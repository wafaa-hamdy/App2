import { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/Cart.context'
import Loading from '../../Components/Loading/Loading'
import CartItem from '../../Components/CartItem/CartItem'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {
  const { getCartProducts, cartInfo, clearCart } = useContext(CartContext)
  useEffect(() => {
    getCartProducts()
  }, [])

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Your cart" />
      </Helmet>
      {cartInfo == null ? (
        <Loading />
      ) : (
        <section>
          <div className="flex items-center gap-8">
            <i className="fa-brands fa-opencart text-3xl"></i>
            <h2 className="relative text-gray-700 text-xl pl-4 font-semibold before:absolute before:w-0.5 before:h-3/4 before:bg-gray-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">
              Your Shopping Cart
            </h2>
          </div>
          {cartInfo.numOfCartItems == 0 ? (
            <div className="bg-gray-100 shadow-lg rounded-lg p-8 flex flex-col justify-center items-center mt-8">
              <h2>
                Oops! Your cart is empty. Start shopping now by clicking the
                button below! ✨
              </h2>

              <Link
                to="/"
                className="btn bg-primary-500 hover:bg-primary-700 text-white mt-6"
              >
                Back To Home Page
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mt-8">
                {cartInfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>

              <div className="bg-gray-200 mt-6 p-6 rounded-lg shadow-md flex justify-between items-center">
                <p className="text-xl">
                  <i className="fa-solid fa-dollar-sign text-primary-500 mr-2"></i>
                  Your Total Cart Price is :{' '}
                  <span className="text-primary-500 font-bold">
                    {cartInfo.data.totalCartPrice}
                  </span>{' '}
                  L.E
                </p>

                <button
                  onClick={clearCart}
                  className="btn bg-red-600 hover:bg-red-700 text-white"
                >
                  Empty Cart
                </button>
              </div>

              <div className="flex mt-6 justify-center items-center">
                <Link
                  to="/checkout"
                  className="btn bg-primary-500 hover:bg-primary-700 text-white inline-block"
                >
                  Procseed to Checkout
                </Link>
              </div>
            </>
          )}
        </section>
      )}
    </>
  )
}
