# 📝 TrackNote

<div align="center">

![TrackNote Logo](https://img.shields.io/badge/TrackNote-Your%20Personal%20Note%20Manager-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xNCAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOHoiPjxwYXRoIGQ9Ik0yIDhoMjAiPjxwYXRoIGQ9Ik0xNiAydjYiPjxwYXRoIGQ9Ik0yIDEyaDIwIj48cGF0aCBkPSJNMiAxNmgxMiI+PC9zdmc+)

**A modern, full-stack note-taking application with secure authentication**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-white?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-red?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)

[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-In%20Progress-orange?style=for-the-badge)]()

</div>

---

## ✨ Features

### 🔐 Authentication System
- **User Registration** - Create your account with secure password hashing
- **User Login** - JWT-based authentication with HTTP-only cookies
- **User Logout** - Secure session termination
- **Profile Management** - Access your user details

### 📝 Note Management
- **Create Notes** - Add new notes with title and description
- **Read Notes** - Fetch all notes or get a specific note
- **Update Notes** - Edit existing notes
- **Delete Notes** - Remove individual notes or delete all at once
- **User-Specific** - Each user's notes are private and isolated

### 🛡️ Security Features
- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Token-based authentication with 7-day expiry
- **HTTP-Only Cookies** - Prevents XSS attacks
- **CORS Enabled** - Cross-origin resource sharing
- **Protected Routes** - Middleware to secure sensitive endpoints

---

## 🚀 Tech Stack

### Backend
```
┌─────────────────────────────────────────────────────────┐
│                    🎯 BACKEND STACK                     │
├─────────────────────────────────────────────────────────┤
│  🟢 Node.js      • JavaScript Runtime                   │
│  ⚡ Express      • Web Framework                        │
│  🍃 MongoDB     • NoSQL Database                       │
│  🔐 JWT         • Authentication                       │
│  🔒 bcryptjs    • Password Hashing                     │
│  🍪 cookie-parser • Cookie Management                  │
│  🌐 CORS        • Cross-Origin Resource Sharing        │
└─────────────────────────────────────────────────────────┘
```

### Frontend
```
┌─────────────────────────────────────────────────────────┐
│                    🎨 FRONTEND STACK                    │
├─────────────────────────────────────────────────────────┤
│  🚧 Coming Soon...                                      │
│  • React.js                                             │
│  • Modern UI Components                                 │
│  • State Management                                     │
│  • Responsive Design                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
tracknote/
├── 📂 backend/
│   ├── 📂 config/
│   │   └── database.config.js       # MongoDB connection
│   ├── 📂 controllers/
│   │   ├── user.controller.js       # Auth logic
│   │   └── note.controller.js       # Note CRUD operations
│   ├── 📂 middlewares/
│   │   └── user.middleware.js       # JWT authentication
│   ├── 📂 models/
│   │   ├── User.model.js            # User schema
│   │   └── Note.model.js            # Note schema
│   ├── 📂 routes/
│   │   ├── user.route.js            # Auth endpoints
│   │   └── note.route.js            # Note endpoints
│   ├── .env                         # Environment variables
│   ├── server.js                    # Express server setup
│   └── package.json                 # Dependencies
├── 📂 frontend/
│   └── (Coming soon...)
├── 📄 README.md                     # This file
├── 📄 LICENSE                       # MIT License
└── 📄 backend.md                    # Backend documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites
- 🟢 **Node.js** (v18 or higher)
- 🍃 **MongoDB** (Atlas or local instance)
- 📦 **npm** or **yarn**

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tracknote.git
cd tracknote
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Configure environment variables**
```bash
# Create .env file in backend folder
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Start the backend server**
```bash
# Development mode with nodemon
npm run dev

# Or regular start
node server.js
```

The backend will run on: **http://localhost:5001** 🎉

---

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | ❌ No |
| POST | `/api/auth/signin` | Login user | ❌ No |
| POST | `/api/auth/logout` | Logout user | ✅ Yes |
| GET | `/api/auth/me` | Get user details | ✅ Yes |
| DELETE | `/api/auth/` | Delete account | ✅ Yes |

### Note Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all user notes | ✅ Yes |
| GET | `/api/notes/:id` | Get specific note | ✅ Yes |
| POST | `/api/notes/:id` | Create new note | ✅ Yes |
| PUT | `/api/notes/:id` | Update note | ✅ Yes |
| DELETE | `/api/notes/:id` | Delete specific note | ✅ Yes |
| DELETE | `/api/notes` | Delete all notes | ✅ Yes |

---

## 🎯 Usage Examples

### User Registration
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### User Login
```bash
curl -X POST http://localhost:5001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Create a Note
```bash
curl -X POST http://localhost:5001/api/notes/123 \
  -H "Content-Type: application/json" \
  -H "Cookie: token=your_jwt_token" \
  -d '{
    "title": "My First Note",
    "description": "This is my first note in TrackNote!"
  }'
```

---

## 🔐 Security Features

- ✅ **Password Hashing** - All passwords are hashed using bcryptjs
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **HTTP-Only Cookies** - Tokens stored in secure, HTTP-only cookies
- ✅ **CORS Protection** - Configured cross-origin resource sharing
- ✅ **Route Protection** - Middleware ensures authenticated access
- ✅ **User Isolation** - Each user can only access their own notes

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  notes: [ObjectId] (references Note)
}
```

### Note Model
```javascript
{
  title: String (required),
  description: String (required),
  user: ObjectId (required, references User)
}
```

---

## 🎨 Features Coming Soon

### Frontend
- 🚀 React.js application
- 🎨 Modern, responsive UI
- 🌙 Dark/Light mode
- 🔍 Search functionality
- 📱 Mobile-friendly design
- 📊 Dashboard with statistics

### Backend Enhancements
- 🔄 Real-time updates with Socket.io
- 📎 File attachments for notes
- 🏷️ Note categorization & tags
- 🗑️ Note recycling bin
- 📤 Export notes (PDF, Markdown)
- 🔔 Email notifications

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name** - TrackNote Developer

- 📧 Email: your.email@example.com
- 🔗 GitHub: [@yourusername](https://github.com/yourusername)
- 💼 LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- 🙌 Inspired by modern note-taking applications
- 📚 Built with amazing open-source technologies
- 🎨 UI design inspiration from various sources

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the author directly
- Check the [backend documentation](backend.md) for detailed API info

---

<div align="center">

**⭐ If you like this project, please give it a star! ⭐**

Made with ❤️ and ☕

[⬆ Back to Top](#-tracknote)

</div>