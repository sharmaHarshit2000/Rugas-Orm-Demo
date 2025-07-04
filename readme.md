# 🛠️ Order Management System – Full Stack

This repository contains a full-stack Order Management System with a **React** frontend and a **Node.js/Express/MongoDB** backend. The system allows users to register, log in, and manage customers, products (with image upload), and orders through a modern dashboard interface.

---

## 🌐 Live Demo

**Live Project:** [https://rugas-orm-demo.vercel.app/](https://rugas-orm-demo.vercel.app/)

---

## 🌈 Frontend – React

The frontend provides a responsive dashboard UI for all user interactions.

### 📁 Folder Structure

```
frontend/
├── public/                # Static assets
└── src/
    ├── App.jsx            # Root component (includes routing)
    ├── main.js            # React DOM root entry point
    ├── components/        # Reusable shared UI components
    │   ├── Header.jsx         # Top navigation bar
    │   ├── Layout.jsx         # Common layout with sidebar + header
    │   ├── Loader.jsx         # Loading spinner
    │   ├── PrivateRoute.jsx   # Route protection logic
    │   └── Sidebar.jsx        # Left navigation sidebar
    ├── pages/             # Route-level page components
    │   ├── CreateOrderPage.jsx
    │   ├── CustomersPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── LoginPage.jsx
    │   ├── NotFoundPage.jsx
    │   ├── OrdersPage.jsx
    │   ├── ProductsPage.jsx
    │   └── RegisterPage.jsx
    └── routes/
        └── AppRoutes.jsx      # Centralized route definitions
```

### 🔐 Auth & Protected Routes

- `PrivateRoute.jsx` checks for a JWT token in `localStorage`.
- If not authenticated, users are redirected to `/login`.

### 🔄 Pages Overview

- **DashboardPage**: Summary of stats (orders, customers, etc.)
- **CustomersPage**: Add/view customer list.
- **ProductsPage**: Add/view product inventory with image upload.
- **OrdersPage**: Place orders and filter by status/category.
- **CreateOrderPage**: Select customer and product, then place an order.
- **Login/Register**: Auth forms with JWT token handling.
- **NotFoundPage**: 404 fallback page.

### 🚀 Getting Started (Frontend)

```bash
cd frontend
npm install
npm run dev
```

---

## 🖥️ Backend – Node.js/Express/MongoDB

The backend supports secure authentication, customer/product/order management, and image uploads via Cloudinary.

### 📁 Project Structure

```
backend/
├── config/                # Configuration files
│   └── cloudinary.js          # Cloudinary setup for image uploads
├── controllers/           # Route logic
│   ├── auth.controller.js     # Auth (register/login/me)
│   ├── customer.controller.js # Customer CRUD
│   ├── order.controller.js    # Order creation and listing
│   └── product.controller.js  # Product creation and fetching
├── middlewares/           # Custom middleware
│   ├── authMiddleware.js      # JWT auth middleware
│   └── multer.js              # Multer setup for file handling
├── models/                # Mongoose models
│   ├── Customer.js
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/                # Express route definitions
│   ├── auth.routes.js
│   ├── customer.routes.js
│   ├── order.routes.js
│   └── product.routes.js
├── .env                   # Environment variables
├── index.js               # Entry point
├── package.json
└── README.md
```

### 🚀 Getting Started (Backend)

1. Install dependencies:
    ```bash
    cd backend
    npm install
    ```

2. Create a `.env` file in the `backend/` directory and add:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/order-management
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

3. Start the server:
    ```bash
    npm run dev
    ```
    The server will run on: [http://localhost:5000](http://localhost:5000)

---

## 🛡️ Authentication

- JWT-based token authentication
- Login/Register endpoints
- Protected routes via middleware (`authMiddleware.js`)

---

## 📦 Features

- ✅ User Registration and Login
- ✅ Customer CRUD
- ✅ Product creation with image upload (via Cloudinary)
- ✅ Order creation and filtering
- ✅ API error handling & validation

---

## 🛣️ API Routes

| Route                   | Method | Description                    |
|-------------------------|--------|--------------------------------|
| `/api/auth/register`    | POST   | Register user                  |
| `/api/auth/login`       | POST   | Login user                     |
| `/api/auth/me`          | GET    | Get current user               |
| `/api/customers/`       | GET    | List customers                 |
| `/api/customers/`       | POST   | Add customer                   |
| `/api/products/`        | GET    | List products                  |
| `/api/products/`        | POST   | Add product (with image)       |
| `/api/orders/`          | GET    | Get all orders (filtered)      |
| `/api/orders/`          | POST   | Create new order               |
| `/api/orders/:id`       | PUT    | Update order status            |

---

## 🧰 Tech Stack

- React
- Node.js
- Express
- MongoDB + Mongoose
- Cloudinary (Image Upload)
- Multer (File Upload Handling)
- JWT (Authentication)
- Dotenv

---

##