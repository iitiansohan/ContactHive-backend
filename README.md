# 📇 ContactHive

**ContactHive** is a secure and scalable Contact Management System API built with **Node.js**, **Express.js**, and **MongoDB**. It supports user registration, JWT-based authentication, and full CRUD operations for managing user-specific contacts.

🔗 **Live API:** [https://contacthive-backend.onrender.com](https://contacthive-backend.onrender.com)

---

## 🚀 Features

- 🔐 JWT-based **Authentication & Authorization**
- 📱 **CRUD operations** for contacts
- 📦 **MongoDB integration** via Mongoose
- 💡 **Role-based route protection**
- ⚠️ Centralized **error handling**
- 🧪 Easily testable with Thunder Client/Postman

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Testing Tools:** Thunder Client / Postman

---

## 🌐 Deployed API

You can access the deployed API using the base URL:  
👉 [https://contacthive-backend.onrender.com](https://contacthive-backend.onrender.com)

Use tools like **Postman** or **Thunder Client** to test endpoints such as:
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/contacts`
- `POST /api/contacts`
- `PUT /api/contacts/:id`
- `DELETE /api/contacts/:id`

> Note: Visiting the root URL `/` will return `Cannot GET /` unless a root route is explicitly defined.

