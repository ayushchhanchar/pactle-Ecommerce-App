import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import type { Product } from '../types'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

interface CartItem {
  id: number
  quantity: number
  product_details: Product
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
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
      setError('Could not load cart items.')
    }
  }

  const calculateSubtotal = (items: CartItem[]) => {
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.product_details.price,
      0
    )
    setSubtotal(total)
  }

  const handlePlaceOrder = async () => {
    try {
      const res = await api.post('/orders/')
      const razorpayOrderId = res.data.razorpay_order_id
      const razorpayKey = res.data.razorpay_key
      const amount = res.data.amount

      const options = {
        key: razorpayKey,
        amount: amount,
        currency: 'INR',
        name: 'My Shop',
        description: 'Complete your payment',
        order_id: razorpayOrderId,
        handler: function (response: any) {
          alert('Payment successful! ID: ' + response.razorpay_payment_id)
          navigate('/thankyou')
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com'
        },
        theme: {
          color: '#6366f1'
        }
      }

      // @ts-ignore
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
      alert('Failed to place order or initiate payment.')
    }
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        Checkout
      </motion.h2>

      {error && <div className="text-red-500">{error}</div>}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <motion.div
          className="md:col-span-2 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold">Order Summary</h3>

          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cartItems.map((item) => (
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
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.product_details.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Qty: {item.quantity}
                  </p>
                  <p>
                    ₹ {item.product_details.price} x {item.quantity}
                  </p>
                </div>
                <div className="font-semibold text-right w-20">
                  ₹ {(item.product_details.price * item.quantity).toFixed(2)}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 shadow rounded space-y-4 h-fit"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold">Payment Summary</h3>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>₹ {(subtotal * 0.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2 border-gray-300 dark:border-gray-600">
            <span>Total</span>
            <span>₹ {(subtotal * 1.05).toFixed(2)}</span>
          </div>

          <motion.button
            onClick={handlePlaceOrder}
            className="w-full mt-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            whileTap={{ scale: 0.98 }}
          >
            Pay with Razorpay
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default CheckoutPage
