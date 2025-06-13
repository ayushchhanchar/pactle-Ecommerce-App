import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductGrid from './pages/ProductGrid'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
// import ProductList from './components/ProductList'

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<ProductGrid />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  </>
)

export default App
