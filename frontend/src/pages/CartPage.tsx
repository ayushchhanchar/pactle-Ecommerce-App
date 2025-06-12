// src/pages/CartPage.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        Shopping Cart: You have {cartItems.length}{' '}
        {cartItems.length === 1 ? 'product' : 'products'} in your cart
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white p-4 rounded shadow"
            >
              <img
                src={item.product_details.image_url}
                alt={item.product_details.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-lg">{item.product_details.name}</h3>
                <p className="text-gray-600">₹{item.product_details.price}</p>
              </div>

              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="w-16 px-2 py-1 border rounded mr-2"
              />
              <button
                onClick={() => handleUpdate(item.id, item.quantity)}
                className="bg-indigo-600 text-white px-4 py-1 rounded mr-2 hover:bg-indigo-700"
              >
                Update
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 bg-white shadow p-6 rounded-md h-fit">
          <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>
          <div className="flex justify-between border-b py-2">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span>Tax (5%):</span>
            <span>₹{(subtotal * 0.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold py-2">
            <span>Total:</span>
            <span>₹{(subtotal * 1.05).toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-indigo-600 text-white w-full mt-4 py-2 rounded hover:bg-indigo-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
