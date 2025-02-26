"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import CartModal from "../pages/shop/CartModal"
import avatarImg from "../assets/avatar.png"
import { useLogoutUserMutation } from "../redux/features/auth/authApi"
import { logout } from "../redux/features/auth/authSlice"

const Navbar = () => {
  const products = useSelector((state) => state.cart.products)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen)
  }

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [logoutUser] = useLogoutUserMutation()
  const navigate = useNavigate()

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen)
  }

  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Products", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/all-orders" },
    { label: "Add New Product", path: "/dashboard/add-new-product" },
  ]

  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payment", path: "/dashboard/Payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ]

  const dropdownMenus = user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus]

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap()
      dispatch(logout())
      navigate("/")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md w-full">
        <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <ul className="nav__links hidden md:flex space-x-6">
            <li className="link">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
            </li>
            <li className="link">
              <Link to="/shop" className="text-gray-600 hover:text-gray-800">
                Shop
              </Link>
            </li>
            <li className="link">
              <Link to="/about-us" className="text-gray-600 hover:text-gray-800">
                About Us
              </Link>
            </li>
            <li className="link">
              <Link to="/contacts" className="text-gray-600 hover:text-gray-800">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="nav__logo">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Shopless<span className="text-primary">.</span>
            </Link>
          </div>
          <div className="nav__icons relative flex items-center space-x-4">
            <Link to="/search" className="text-gray-600 hover:text-gray-800">
              <i className="ri-search-line"></i>
            </Link>
            <button onClick={handleCartToggle} className="text-gray-600 hover:text-primary relative">
              <i className="ri-shopping-cart-2-line"></i>
              <sup className="absolute -top-2 -right-2 text-xs px-1.5 bg-primary text-white rounded-full">
                {products.length}
              </sup>
            </button>
            {user ? (
              <div className="relative">
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt=""
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="space-y-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-800">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <div className="h-20"></div> {/* Spacer for fixed navbar */}
      {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
    </>
  )
}

export default Navbar

