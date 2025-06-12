import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const cart = useCart()

  useEffect(() => {
    api.get('/products/').then(res => setProducts(res.data))
  }, [])

  return (
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">Shop Latest Products</h2>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <img
              src={p.image_url}
              alt={p.name}
              className="w-full h-56 object-cover hover:opacity-90 transition duration-300"
            />

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{p.description}</p>
              <div className="mt-auto">
                <p className="text-indigo-600 font-semibold text-lg">₹{p.price}</p>
                <button
                  onClick={() => cart.addToCart(p)}
                  className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
