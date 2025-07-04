# 🛠️ Frontend – Order Management System

This is the **frontend** portion of a full-stack Order Management System built with **React**. It allows users to register, log in, and manage customers, products, and orders through a clean and responsive dashboard UI.

## 📁 Folder Structure

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

## 🔐 Auth & Protected Routes

- `PrivateRoute.jsx` checks for a JWT token in `localStorage`.
- If not authenticated, users are redirected to `/login`.

## 🔄 Pages Overview

- **DashboardPage**: Summary of stats (orders, customers, etc.)
- **CustomersPage**: Add/view customer list.
- **ProductsPage**: Add/view product inventory with image upload.
- **OrdersPage**: Place orders and filter by status/category.
- **CreateOrderPage**: Select customer and product, then place an order.
- **Login/Register**: Auth forms with JWT token handling.
- **NotFoundPage**: 404 fallback page.

## 🚀 Getting Started

```bash
cd frontend
npm install
npm run dev
```