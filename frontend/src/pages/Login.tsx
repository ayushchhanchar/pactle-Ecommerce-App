import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(username, password)
      navigate('/')
    } catch (error) {
      alert('Login failed. Check your credentials.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transition-all duration-500 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
