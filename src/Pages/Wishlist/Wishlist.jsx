import { useContext, useEffect } from 'react'
import { WishlistContext } from '../../Context/Wishlist.context'
import { Helmet } from 'react-helmet'
import Loading from '../../Components/Loading/Loading'
import WishlistItem from '../../Components/WishlistItem/WishlistItem'
import { Link } from 'react-router-dom'

export default function Wishlist() {
  const { getWishlistProducts, wishlist } = useContext(WishlistContext)

  useEffect(() => {
    getWishlistProducts()
  }, [])

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>

      {wishlist == null ? (
        <Loading />
      ) : (
        <section className="bg-gray-100 p-6 space-y-6">
          <header className="flex items-center gap-4">
            <i className="fa-solid fa-heart text-2xl"></i>
            <h2 className="relative text-gray-700 text-xl pl-3 font-semibold before:absolute before:w-0.5 before:h-3/4 before:bg-gray-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">
              Your Wishlist
            </h2>
          </header>

          {wishlist.count == 0 ? (
            <div className=" rounded-lg p-8 flex flex-col justify-center items-center mt-8">
              <h2>
                Oops! Your Wishlist is empty. Start browsing products now by
                clicking the button below! ✨
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
                {wishlist.data.map((product) => (
                  <WishlistItem key={product._id} productInfo={product} />
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </>
  )
}
