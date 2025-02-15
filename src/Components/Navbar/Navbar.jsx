import React, { useContext, useEffect } from 'react'
import freshCartLogo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../Context/User.context'
import { CartContext } from '../../Context/Cart.context'

export default function Navbar() {
  const { token, logOut } = useContext(UserContext)
  const { cartInfo, getCartProducts } = useContext(CartContext)

  useEffect(() => {
    if(token){

      getCartProducts()
    }
  }, [])

  return (
    <>
      <nav className="bg-slate-100 py-5 shadow-md fixed top-0 right-0 left-0 z-50">
        <div className="container flex items-center gap-12">
          <Link to="/">
            <img src={freshCartLogo} alt="" />
          </Link>

          {token && (
            <>
              <ul className="flex gap-5">
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-500 before:h-0.5 before:bg-primary-500 before:-bottom-2 ${
                        isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-500 before:h-0.5 before:bg-primary-500 before:-bottom-2 ${
                        isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }}
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-500 before:h-0.5 before:bg-primary-500 before:-bottom-2 ${
                        isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-500 before:h-0.5 before:bg-primary-500 before:-bottom-2 ${
                        isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }}
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-500 before:h-0.5 before:bg-primary-500 before:-bottom-2 ${
                        isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }}
                    to="/wishlist"
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-500 before:h-0.5 before:bg-primary-500 before:-bottom-2 ${
                        isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }}
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>

              <Link to="/cart" className="cart relative ml-auto cursor-pointer">
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                <div className="cart-counter w-5 h-5 right-0 top-0 flex justify-center items-center translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 text-white absolute">
                  {cartInfo ? (
                    <span className="text-sm font-semibold">
                      {cartInfo.numOfCartItems}
                    </span>
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                  )}
                </div>
              </Link>
            </>
          )}

          <ul className={`flex items-center gap-5 ${!token ? 'ms-auto' : ''}`}>
            <li>
              <a href="https://instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://facebook.com">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://tiktok.com">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://x.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://youtube.com">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>

          <ul className="flex items-center gap-5">
            {!token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-500 before:h-0.5 before:bg-primary-500 before:-bottom-2 ${
                        isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }}
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-500 before:h-0.5 before:bg-primary-500 before:-bottom-2 ${
                        isActive ? 'before:!w-full font-semibold' : ''
                      }`
                    }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <>
                <li onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket text-2xl cursor-pointer"></i>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  )
}
