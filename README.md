OneCart - Your one-stop destination for seamless online shopping.

OneCart is a full-stack e-commerce web application that provides a smooth shopping experience with secure authentication, online payments, and admin management capabilities.

🚀 Features
🔐 Authentication

User Signup & Login

Logout functionality

Google OAuth2 Authentication (via Firebase)

Secure session handling

🛍 User Features

Browse Products

View Product Details

Add to Cart

Remove from Cart

Place Orders

💳 Payment Integration

Razorpay Payment Gateway

Cash on Delivery (COD) option

Secure checkout flow

📦 Order Management

View Order History

Track order status (Delivered / Pending / Out for Delivery)

🛠 Admin Panel

View all products

Add new products

Update existing products

Delete products

Manage orders

Update order status (Delivered / Pending / Cancelled)

🛠 Tech Stack
Frontend

React.js

Tailwind CSS

Backend

Node.js

Express.js

Database

MongoDB

Authentication

Firebase (Google OAuth2)

Payments

Razorpay

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/sakshisrivastava1/OneCart
cd onecart
2️⃣ Install Dependencies
cd frontend && npm install
cd ../backend && npm install
3️⃣ Environment Variables

Create a .env file in backend:

PORT=3000
MONGO_URI=your_mongodb_connection

# Firebase
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain

# Razorpay
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
▶️ Run the App
# backend
npm start

# frontend
npm run dev
💡 Key Highlights

🔐 OAuth-based authentication using Firebase

💳 Integrated Razorpay for secure payments

🛠 Fully functional Admin Dashboard

📦 End-to-end order management system

🔮 Future Enhancements

🔍 Product search & filtering

⭐ Product reviews & ratings

📱 Mobile responsiveness improvements

📦 Order tracking UI enhancements

🧠 Recommendation system

👩‍💻 Author
Sakshi Srivastava
GitHub: https://github.com/sakshisrivastava1

🌐 Live Demo
User - https://onecart-frontend-aob0.onrender.com/
Admin Panel - https://onecart-admin-vv0e.onrender.com/
