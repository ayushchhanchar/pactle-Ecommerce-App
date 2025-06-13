import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(username, email, password)
      alert('Registered successfully. Please log in.')
      navigate('/login')
    } catch (err: any) {
      alert(`Registration failed: ${err.message}`)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transition-all duration-500 animate-fadeIn"
      >
        <div className="text-center mb-6">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide hover:text-white"
          >
            PACTLE<span className="text-yellow-300">Shop</span>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          required
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300">
          Register
        </button>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
