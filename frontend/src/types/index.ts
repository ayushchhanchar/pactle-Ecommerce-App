// export interface Product {
//   id: number
//   name: string
//   description: string
//   price: number
//   image_url: string
//   category: string // ⬅
// }

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  sizes?: string[]
  inventory_count: number
  created_at: string
  updated_at: string
  reviews?: Review[]
}

export interface Review {
  id: number
  user: string
  rating: number
  comment: string
  created_at: string
}
