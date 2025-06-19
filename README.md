
# 📇 ContactHive – Contact Management API

ContactHive is a secure and scalable RESTful API for managing personal contacts. Built with Node.js, Express, and MongoDB, it supports full user authentication using JWT and bcrypt.

---

## 🚀 Features

- 🔐 User authentication (register/login) with JWT
- 🔒 Protected contact CRUD operations per user
- 🔑 Passwords hashed using bcrypt
- 🧪 Middleware-based token validation and error handling
- 📬 Email and phone fields validation
- 📁 Clean project structure with MVC pattern

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT, bcrypt
- **Tools:** Dotenv, express-async-handler

---

## 📂 Folder Structure

```
server/
│
├── config/
│   └── dbConnection.js         # MongoDB connection logic
│
├── controllers/
│   ├── contactController.js    # CRUD for contacts
│   └── userController.js       # Register, login, current user
│
├── middleware/
│   ├── errorHandler.js         # Global error handler
│   └── validateTokenHandler.js # JWT token validation middleware
│
├── models/
│   ├── contactModel.js         # Contact schema
│   └── userModel.js            # User schema
│
├── routes/
│   ├── contactRoutes.js        # Contact APIs (protected)
│   └── userRoutes.js           # Auth APIs (public)
│
├── .env                        # Environment variables
├── server.js                   # Entry point
└── package.json
```

---

## 🔐 Environment Variables

Create a `.env` file in the root with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```

---

## 🧪 API Endpoints

### 🔐 Auth (Public)

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| POST   | `/api/users/register` | Register a user |
| POST   | `/api/users/login`    | Login a user    |
| GET    | `/api/users/current`  | Get logged-in user (🔒) |

---

### 📇 Contacts (Protected)

**All routes require** `Authorization: Bearer <token>`

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | `/api/contacts`     | Get all user's contacts  |
| GET    | `/api/contacts/:id` | Get a single contact     |
| POST   | `/api/contacts`     | Create a new contact     |
| PUT    | `/api/contacts/:id` | Update a contact         |
| DELETE | `/api/contacts/:id` | Delete a contact         |

---

## ✅ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/contacthive.git
cd contacthive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure `.env`

```bash
cp .env.example .env
# Fill in MONGO_URI and ACCESS_TOKEN_SECRET
```

### 4. Run the server

```bash
npm start
# or nodemon for dev
```

Server starts on: [http://localhost:5000](http://localhost:5000)

---

## 🔒 Authentication Flow

1. User registers and receives success response.
2. User logs in → receives a **JWT token**.
3. Token is sent in headers as:
   ```
   Authorization: Bearer <token>
   ```
4. Middleware `validateTokenHandler.js` verifies token and attaches `req.user`.
5. Controllers use `req.user.id` to enforce per-user data access.

---

## 🛡️ Error Handling

All errors are caught and returned in structured JSON:
```json
{
  "title": "Validation Failed",
  "message": "All fields are mandatory",
  "stackTrace": "..."
}
```

Use `NODE_ENV=production` to hide stack traces.

---

## 🌐 Deployed API

You can access the deployed API using the base URL:  
👉 [https://contacthive-backend.onrender.com](https://contacthive-backend.onrender.com)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

## 💡 Maintained By

**Sohan Roy Chowdhury (SRC)**  
B.Tech CSE, IIT (ISM) Dhanbad  
[LinkedIn](https://www.linkedin.com/in/sohan-roy-chowdhury) • [GitHub](https://github.com/iitiansrc)

---
