import { createContext, useContext, useState } from 'react'
import { UserContext } from './User.context'
import toast from 'react-hot-toast'
import axios from 'axios'

export const WishlistContext = createContext(null)

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(null)
  const { token } = useContext(UserContext)

  // * Add Product to Wishlist
  async function addProductToWishlist({ productId }) {
    let toastId = toast.loading('Adding Product to wishlist')

    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
        method: 'POST',
        headers: {
          token,
        },
        data: {
          productId,
        },
      }
      let { data } = await axios.request(options)

      if (data.status == 'success') {
        toast.success('Product Added to wishlist')
        getWishlistProducts()
      }
    } catch (error) {
      console.log(error)
    } finally {
      toast.dismiss(toastId)
    }
  }

  // * Get Wishlist Products
  async function getWishlistProducts() {
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
        method: 'GET',
        headers: {
          token,
        },
      }
      let { data } = await axios.request(options)
      if (data.status == 'success') {
        setWishlist(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ! Remove Product
  async function removeProductFromWishlist({ productId }) {
    let toastId = toast.loading('Removing Product from wishlist')
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: 'DELETE',
        headers: {
          token,
        },
      }
      let { data } = await axios.request(options)
      if (data.status == 'success') {
        toast.success('Product Removed from wishlist')
        getWishlistProducts()
      }
    } catch (error) {
      console.log(error)
    } finally {
      toast.dismiss(toastId)
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlistProducts,
        removeProductFromWishlist,
        wishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
