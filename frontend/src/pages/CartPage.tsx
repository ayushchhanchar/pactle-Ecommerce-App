// src/pages/CartPage.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../utils/api'
import type { Product } from '../types'

interface CartItem {
  id: number
  quantity: number
  product_details: Product
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [subtotal, setSubtotal] = useState<number>(0)

  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart/')
      setCartItems(res.data)
      calculateSubtotal(res.data)
    } catch (err) {
      setError('Could not load cart. Are you logged in?')
    }
  }

  const calculateSubtotal = (items: CartItem[]) => {
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.product_details.price,
      0
    )
    setSubtotal(total)
  }

  const handleQuantityChange = (id: number, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    )
  }

  const handleUpdate = async (id: number, quantity: number) => {
    await api.patch(`/cart/${id}/`, { quantity })
    fetchCart()
  }

  const handleRemove = async (id: number) => {
    await api.delete(`/cart/${id}/`)
    fetchCart()
  }

  if (error) return <div className="text-red-500 p-4">{error}</div>

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        Shopping Cart: You have {cartItems.length}{' '}
        {cartItems.length === 1 ? 'product' : 'products'} in your cart
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition-all"
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={item.product_details.image_url}
                alt={item.product_details.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-lg">{item.product_details.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">₹{item.product_details.price}</p>
              </div>

              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mr-2 bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              <button
                onClick={() => handleUpdate(item.id, item.quantity)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded mr-2 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="w-full lg:w-80 bg-white dark:bg-gray-800 shadow p-6 rounded-md h-fit"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>
          <div className="flex justify-between border-b border-gray-300 dark:border-gray-600 py-2">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 dark:border-gray-600 py-2">
            <span>Tax (5%):</span>
            <span>₹{(subtotal * 0.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold py-2">
            <span>Total:</span>
            <span>₹{(subtotal * 1.05).toFixed(2)}</span>
          </div>
          <motion.button
            onClick={() => navigate('/checkout')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-4 py-2 rounded transition"
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Checkout
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default CartPage
