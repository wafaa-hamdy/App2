import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Layout from './Components/Layout/Layout'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import UserProvider from './Context/User.context'
import GuestRoute from './Components/GuestRoute/GuestRoute'
import CartProvider from './Context/Cart.context'
import Cart from './Pages/Cart/Cart'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Checkout from './Pages/Checkout/Checkout'
import Orders from './Pages/Orders/Orders'
import Online from './Components/Online/Online'
import Offline from './Components/Offline/Offline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Categories from './Pages/Categories/Categories'
import Brands from './Pages/Brands/Brands'
import Products from './Pages/Products/Products'
import Wishlist from './Pages/Wishlist/Wishlist'
import WishlistProvider from './Context/Wishlist.context'
import VerifyEmail from './Pages/Verification/VerifyEmail'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import ResetPassword from './Pages/ResetPassword/ResetPassword'


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: 'cart', element: <Cart /> },
        { path: 'product/:id', element: <ProductDetails /> },
        { path: 'checkout', element: <Checkout /> },
        { path: '/allorders', element: <Orders /> },
        { path: 'categories', element: <Categories /> },
        { path: 'brands', element: <Brands /> },
        { path: 'products', element: <Products /> },
        { path: 'wishlist', element: <Wishlist /> },
      ],
    },

    {
      path: '/',
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: '/signup', element: <Signup /> },
        { path: '/login', element: <Login /> },
        {path:'/forgotpassword' , element: <ForgotPassword/>},
        {path:'/verifyemail' , element:<VerifyEmail/>},
        {path:'/resetpassword', element: <ResetPassword/>}
      ],
    },
  ])

  const myClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={router} />
            </WishlistProvider>
          </CartProvider>
        </UserProvider>

        <ReactQueryDevtools position="right"></ReactQueryDevtools>

        <Toaster position="top-center" />

        <Offline>
          <div className="fixed right-8 bottom-8 shadow-lg bg-red-500 rounded-md p-3 text-white font-semibold z-10">
            <i className="fa-solid fa-wifi mr-2"></i>
            Check Your Internet Connection
          </div>
        </Offline>
      </QueryClientProvider>
    </>
  )
}

export default App
