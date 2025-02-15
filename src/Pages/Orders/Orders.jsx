import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/User.context'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

export default function Orders() {
  // const [orders, setOrders] = useState(null)
  const { token } = useContext(UserContext)
  let { id } = jwtDecode(token)

  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: 'GET',
    }
    return await axios.request(options)

  }

  useEffect(() => {
    getUserOrders()
  }, [])


  let {data, isLoading} = useQuery({
    queryKey: ['orders'],
    queryFn: getUserOrders,
    staleTime: 4000,

  })

  if(isLoading) return <Loading/>


  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>

        <section className="space-y-4">
          {data.data.map((order) => (
            <div
              key={order.id}
              className="order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg"
            >
              <header className="flex justify-between items-center">
                <div>
                  <h2 className="text-gray-500">Order ID</h2>
                  <span className="text-lg font-semibold text-gray-700">
                    #{order.id}
                  </span>
                </div>
                <div>
                  {order.isPaid ? (
                    <span className="capitalize inline-block px-3 py-2 mx-2 bg-primary-500 text-white font-semibold rounded-full">
                      paid order
                    </span>
                  ) : (
                    <span className="capitalize inline-block px-3 py-2 mx-2 bg-red-500 text-white font-semibold rounded-full">
                      unpaid order
                    </span>
                  )}
                  {order.isDelivered ? (
                    <span className="capitalize inline-block px-3 py-2 bg-primary-500 text-white font-semibold rounded-full">
                      Delivered
                    </span>
                  ) : (
                    <span className="capitalize inline-block px-3 py-2 bg-blue-500 text-white font-semibold rounded-full">
                      Out for Delivery
                    </span>
                  )}
                </div>
              </header>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 my-3 gap-3">
                {order.cartItems.map((product) => (
                  <div
                    key={product._id}
                    className="product-item overflow-hidden border-2 border-gray-400 border-opacity-30  rounded-lg shadow-md"
                  >
                    <img
                      src={product.product.imageCover}
                      alt=""
                      className="w-full"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold my-2 line-clamp-2 cursor-pointer">
                        <Link to={`/product/${product.product._id}`}>
                          {product.product.title}
                        </Link>
                      </h3>
                      <p>
                        <span className="font-semibold text-gray-800">
                          Count :
                        </span>{' '}
                        {product.count}
                      </p>
                      <p className="font-bold">
                        <span className="font-semibold text-primary-600">
                          Price :
                        </span>{' '}
                        {product.price} L.E
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-lg mt-4 font-bold p-4 bg-gray-200 rounded-md">
                Total Price :{' '}
                <span className="mx-1 font-bold text-primary-600">
                  {order.totalOrderPrice}
                </span>{' '}
                L.E
              </p>
            </div>
          ))}
        </section>
      
    </>
  )
}
