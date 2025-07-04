cd backend
npm install


PORT=5000
MONGODB_URI=mongodb://localhost:27017/order-management
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

npm run dev

🧪 Running the Server
bash
Copy
Edit
npm run dev
The server will run on: http://localhost:5000

🛡️ Authentication
JWT-based token auth

Login/Register endpoints

Protected routes via middleware (authMiddleware.js)

📦 Features
✅ User Registration and Login

✅ Customer CRUD

✅ Product creation with image upload (via Cloudinary)

✅ Order creation and filtering

✅ API error handling & validation

🛣️ API Routes
Route	Method	Description
/api/auth/register	POST	Register user
/api/auth/login	POST	Login user
/api/auth/me	GET	Get current user
/api/customers/	GET	List customers
/api/customers/	POST	Add customer
/api/products/	GET	List products
/api/products/	POST	Add product (with image)
/api/orders/	GET	Get all orders (filtered)
/api/orders/	POST	Create new order
/api/orders/:id	PUT	Update order status

🧰 Tech Stack
Node.js

Express

MongoDB + Mongoose

Cloudinary (Image Upload)

Multer (File Upload Handling)

JWT (Authentication)

Dotenv
