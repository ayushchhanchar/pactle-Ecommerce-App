import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import type { Product } from '../types'
import { Link } from 'react-router-dom'

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      let url = '/products/?'
      if (search) url += `search=${search}&`
      if (category) url += `category=${category}&`
      if (minPrice) url += `min_price=${minPrice}&`
      if (maxPrice) url += `max_price=${maxPrice}&`

      const res = await api.get(url)
      setProducts(res.data)
    }

    fetchProducts()
  }, [search, category, minPrice, maxPrice])

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6 sm:px-10">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-indigo-400 drop-shadow-md">
        Explore Trendy Fashion & Digital Picks
      </h2>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="fashion">Fashion</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="home">Home & Living</option>
          <option value="beauty">Beauty</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600 w-32 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600 w-32 focus:outline-none"
        />
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <Link to={`/products/${p.id}`} key={p.id}>
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transform hover:scale-105 hover:shadow-indigo-500/30 transition-all duration-300 flex flex-col">
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-56 object-cover transition-opacity duration-300 hover:opacity-90"
              />

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-1 text-white">{p.name}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{p.description}</p>
                <p className="text-indigo-400 font-bold text-lg">₹{p.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
