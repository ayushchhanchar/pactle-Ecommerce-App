import { createContext, useContext } from 'react'
import api from '../utils/api'
import type { Product } from '../types'

interface CartContextType {
  addToCart: (product: Product) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const addToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        alert('Please log in to add items to your cart.')
        return
      }

      const response = await api.post(
        '/cart/',
        {
          product: product.id,  // ✅ Must be product ID, not full object
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      alert(`${product.name} added to cart`)
    } catch (error: any) {
      console.error('Add to cart failed:', error.response?.data || error.message)

      if (error.response?.status === 400) {
        alert(`Bad request — backend did not accept input: ${JSON.stringify(error.response.data)}`)
      } else if (error.response?.status === 401) {
        alert('Authentication failed — please log in again.')
      } else {
        alert('Something went wrong while adding to cart.')
      }
    }
  }

  return <CartContext.Provider value={{ addToCart }}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('CartProvider missing')
  return ctx
}
