🔐 User Authentication (MERN / LMS)

This document explains the User Authentication system implemented so far in the LMS project. It covers signup, login, JWT handling, cookies, frontend–backend flow, and common issues handled.

🧱 Tech Stack
Frontend

React.js

Redux Toolkit + RTK Query

Tailwind CSS

shadcn/ui

React Router DOM

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT (JSON Web Token)

bcryptjs

cookie-parser

CORS

📁 Backend Authentication Flow
1️⃣ User Registration (Signup)

Route

POST /api/v1/user/register

Request Body

{
  "name": "Rohit",
  "email": "rohit@gmail.com",
  "password": "123456"
}

Process

Validate input fields

Check if user already exists

Hash password using bcrypt

Save user in MongoDB

Return success response (201)

Success Response

{
  "success": true,
  "message": "User registered successfully"
}
2️⃣ User Login

Route

POST /api/v1/user/login

Request Body

{
  "email": "rohit@gmail.com",
  "password": "123456"
}

Process

Check if user exists

Compare password with hashed password

Generate JWT token

Store token in HTTP-only cookie

Send user data to frontend

Success Response

{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Rohit",
    "email": "rohit@gmail.com",
    "role": "student"
  }
}
3️⃣ JWT Token Handling

JWT is generated using jsonwebtoken

Token is stored inside HTTP-only cookies for security

Cookie options:

httpOnly: true

sameSite: strict / lax

secure: false (true in production)

📁 Frontend Authentication Flow
1️⃣ API Layer (RTK Query)
baseQuery: fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/v1/user/",
  credentials: "include"
})

credentials: include ensures cookies are sent

Mutations used:

useRegisterUserMutation

useLoginUserMutation

2️⃣ Login Flow (Frontend)

User submits login form

RTK Query sends POST request

Backend sets JWT cookie

User data is saved in Redux store

dispatch(userLoggedIn({ user: result.data.user }))
3️⃣ Authentication State

User info stored in Redux

Used to:

Show Login / Signup buttons

Show Profile menu

Control Instructor Dashboard access

👥 Role-Based Access

Roles supported:

student

instructor

UI Behavior

Student → My Learning, Profile

Instructor → Dashboard + Student options

🍪 CORS & Cookies Configuration
Backend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
Why This Is Important

Without credentials: true, cookies won’t work

Required for JWT-based auth using cookies

Media Upload (Cloudinary)

Cloudinary configuration using environment variables

Utility function to upload:

Images

Videos
