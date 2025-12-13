🛒 E-Commerce Platform
A modern full-stack e-commerce web application developed by students enrolled in the Digital Egypt Pioneers Initiative (DEPI).

The project delivers a complete online shopping experience with a loyalty points system and an admin panel for product management.

📄 License: Educational Project

---

✨ Features

👤 User Features
- Secure user authentication
- Browse products with a responsive UI
- View product details
- Add and remove products from cart
- View orders and user profile
- Track loyalty points

💝 Loyalty Points System
- Earn points after each successful purchase
- Automatic loyalty points calculation
- Points stored per user
- Loyalty points visible in user profile

👨‍💼 Admin Panel
- Secure admin access
- Add new products
- Edit existing products
- Delete products
- Manage product stock and images

---

🛠️ Tech Stack

🎨 Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- Lucide React Icons
- Google OAuth

⚙️ Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based auth
- Zod Validation
- Multer (File Uploads)
- Cloudinary (Image Storage)
- Stripe (Payments)
- bcrypt (Password Hashing)

---

🚀 Quick Start

⚙️ Backend Setup
```bash
cd Backend
npm install
npm run dev
```
🎨 Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

📚 API Overview

🔐 Authentication
```http

POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
POST   /api/auth/google      # Google OAuth

```

📦 Products

```http
GET    /api/products         # Get all products
GET    /api/products/{id}    # Get product details
POST   /api/products         # Create product (Admin)
PUT    /api/products/{id}    # Update product (Admin)
DELETE /api/products/{id}    # Delete product (Admin)


```

🧾 Orders

```http
POST   /api/orders           # Create order
GET    /api/orders           # Get user orders

```

💝 Loyalty Points
```http

GET    /api/users/points     # Get loyalty points

 ```

 

🧱 Project Structure

```

e-commerce-project/
├── Backend/
│   └── src/
│       ├── controllers/
│       ├── dtos/
│       ├── lib/
│       ├── middleware/
│       ├── models/
│       ├── routers/
│       └── types/
│
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layout/
│       ├── pages/
│       └── store/
│
└── README.md

 ```


🎯 Project Purpose

This project was developed by students as part of their learning journey within the Digital Egypt Pioneers Initiative (DEPI).

It demonstrates practical full-stack development skills including frontend design, backend APIs, authentication, admin management, payment integration, and loyalty system implementation.
 
















npm install
npm run dev
