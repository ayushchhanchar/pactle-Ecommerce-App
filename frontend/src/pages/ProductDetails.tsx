import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  created_at: string
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState('')
  const cart = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}/`)
        setProduct(res.data)
        setReviews(res.data.reviews || [])
      } catch (err) {
        console.error(err)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      cart.addToCart(product)
      alert('Added to cart!')
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post(`/products/${product?.id}/reviews/`, {
        rating,
        comment,
    })
      alert('Review submitted')
      setRating(0)
      setComment('')
      // refresh product
      const res = await api.get(`/products/${id}/`)
      setProduct(res.data)
      setReviews(res.data.reviews || [])
    } catch (err) {
      alert('You must be logged in to post a review.')
    }
  }

  if (!product) return <div className="text-white p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-auto object-cover rounded-xl"
        />

        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl text-indigo-400 font-semibold mb-4">₹{product.price}</p>
          <p className="text-gray-400 mb-6">{product.description}</p>

          {product.category === 'fashion' && product.sizes && (
            <div className="mb-4">
              <label className="block mb-1 text-sm">Select Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-gray-800 border border-gray-600 p-2 rounded w-full"
              >
                <option value="">Choose a size</option>
                {product.sizes.map((size: string, index: number) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 py-3 px-6 rounded-lg text-white font-semibold"
          >
            Add to Cart
          </button>

          {/* Reviews */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">Ratings & Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-400">No reviews yet.</p>
            ) : (
              <ul className="space-y-4">
                {reviews.map((r) => (
                  <li key={r.id} className="border-t border-gray-700 pt-4">
                    <p className="text-yellow-400 font-semibold">
                      {r.rating} ★ by {r.user}
                    </p>
                    <p className="text-gray-300 text-sm">{r.comment}</p>
                    <p className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* Review form */}
            <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
              <label className="block text-sm">Your Rating (1–5):</label>
              <input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              />

              <textarea
                placeholder="Your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              ></textarea>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 py-2 px-6 rounded text-white font-semibold"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
