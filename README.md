# 🛒 Full Stack E-Commerce Storefront

This is a full-stack e-commerce storefront built with:

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Django REST Framework + PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Payments:** Razorpay Integration
- **Deployment:** Render (Backend), Vercel (Frontend)

---

## 📁 Project Structure
ecommerce-store/
├── backend/ # Django REST API
├── frontend/ # React + TypeScript frontend
├── .env.example # Environment variables (combined reference)
├── README.md
└── ...


---

## 🚀 Features

- 🔐 JWT-based User Authentication (Login/Register)
- 🛍️ Product Catalog with Categories & Filters
- 🛒 Add to Cart & Quantity Management
- 🧾 Order Placement with Razorpay Checkout
- 📝 User Reviews (only when logged in)
- 🌗 Light/Dark Mode Support (via Tailwind)
- 📦 Admin panel for managing products (via Django Admin)
- 📃 API documentation

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-store.git
cd ecommerce-store

2. Backend Setup (/backend)
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt

Create .env file
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser  # Create admin user
python manage.py runserver
API will be available at: http://localhost:8000/api/



3. Frontend Setup (/frontend)
cd frontend
npm install
cp .env.example .env
Set the base API URL and Razorpay key.

Start the React App
npm run dev
App will be live at: http://localhost:5173

🧪 API Endpoints
Method	Endpoint	Description
GET	/products/	List all products
GET	/products/:id/	Get product detail
POST	/auth/register/	Register new user
POST	/auth/login/	Login & get JWT token
GET	/cart/	Get user cart
POST	/cart/	Add item to cart
DELETE	/cart/:id/	Remove from cart
POST	/orders/	Place order + pay
POST	/reviews/	Submit review (auth)

JWT token must be added in headers: Authorization: Bearer <token>
