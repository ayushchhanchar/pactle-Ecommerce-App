import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar: React.FC = () => {
  const auth = React.useContext(AuthContext)
  const nav = useNavigate()

  const handleLogout = () => {
    auth.logout()
    nav('/login')
  }

  return (
    <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide hover:text-indigo-200 transition">
            PACTLE SHOP
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 text-sm sm:text-base">
            <Link
              to="/"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Cart
            </Link>

            {auth?.user ? (
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-4 py-1.5 rounded transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-gray-200 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-4 py-1.5 rounded transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
