import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FaShoppingCart } from 'react-icons/fa'

const Navbar: React.FC = () => {
  const auth = React.useContext(AuthContext)
  const nav = useNavigate()

  return (
    <nav className="bg-indigo-700 text-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold tracking-wide hover:text-white">
        PACTLE<span className="text-yellow-300">Shop</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link to="/" className="hover:underline underline-offset-4 transition">
          Home
        </Link>

        <Link to="/cart" className="relative flex items-center hover:underline underline-offset-4">
          <FaShoppingCart className="mr-1" />
          Cart
          {/* <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold px-1.5 rounded-full">2</span> */}
        </Link>

        {auth?.user ? (
          <>
            <span className="text-sm text-gray-200">Hi, {auth.user.username}</span>
            <button
              onClick={() => {
                auth.logout()
                nav('/login')
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-indigo-700 hover:bg-gray-100 px-4 py-1 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-white hover:bg-white hover:text-indigo-700 px-4 py-1 rounded transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
