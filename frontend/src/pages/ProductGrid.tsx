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
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6 sm:px-10">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-indigo-400 drop-shadow-md">
        Explore Trendy Fashion & Digital Picks
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transform hover:scale-105 hover:shadow-indigo-500/30 transition-all duration-300 flex flex-col"
          >
            <img
              src={p.image_url}
              alt={p.name}
              className="w-full h-56 object-cover transition-opacity duration-300 hover:opacity-90"
            />

            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl font-semibold mb-1 text-white">{p.name}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{p.description}</p>

              <div className="mt-auto">
                <p className="text-indigo-400 font-bold text-lg">₹{p.price}</p>
                <button
                  onClick={() => cart.addToCart(p)}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
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
