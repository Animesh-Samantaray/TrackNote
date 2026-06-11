# 🔧 TrackNote Backend Documentation

<div align="center">

![Backend Architecture](https://img.shields.io/badge/Backend-Documentation-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCA3SDRhMiAyIDAgMCAwLTIgMnYxMmEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJWOWEyIDIgMCAwIDAtMi0yeiI+PC9zdmc+)

**Comprehensive API Documentation & Architecture Guide**

[![Express](https://img.shields.io/badge/Express-5.x-white?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-red?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)

</div>

---

## 📋 Table of Contents

- [🏗️ Architecture Overview](#-architecture-overview)
- [🗂️ Project Structure](#-project-structure)
- [🔐 Authentication Flow](#-authentication-flow)
- [📡 API Endpoints](#-api-endpoints)
- [🗄️ Database Models](#️-database-models)
- [🛡️ Middleware](#️-middleware)
- [⚙️ Configuration](️-configuration)
- [🚀 Getting Started](#-getting-started)
- [🔍 Error Handling](#-error-handling)
- [📊 Data Flow](#-data-flow)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎯 TRACKNOTE BACKEND ARCHITECTURE            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │   CLIENT     │─────▶│  EXPRESS     │─────▶│   MONGODB    │  │
│  │  (Frontend)  │      │   SERVER     │      │  DATABASE    │  │
│  └──────────────┘      └──────────────┘      └──────────────┘  │
│         │                      │                      │         │
│         │                      ▼                      │         │
│         │              ┌──────────────┐              │         │
│         │              │   ROUTES     │              │         │
│         │              └──────────────┘              │         │
│         │                      │                      │         │
│         │                      ▼                      │         │
│         │              ┌──────────────┐              │         │
│         │              │  MIDDLEWARE  │              │         │
│         │              │  (JWT Auth)  │              │         │
│         │              └──────────────┘              │         │
│         │                      │                      │         │
│         │                      ▼                      │         │
│         │              ┌──────────────┐              │         │
│         │              │ CONTROLLERS  │              │         │
│         │              └──────────────┘              │         │
│         │                      │                      │         │
│         │                      ▼                      │         │
│         │              ┌──────────────┐              │         │
│         │              │    MODELS    │              │         │
│         │              └──────────────┘              │         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🔄 Request Flow

```
📱 Client Request
        │
        ▼
🛡️ CORS & Cookie Parser
        │
        ▼
📍 Route Matching
        │
        ▼
🔐 Authentication Middleware (if protected)
        │
        ├─▶ Token Valid? ──▶ YES ──▶ Controller
        │                              │
        │                              ▼
        │                         💾 Database Operation
        │                              │
        │                              ▼
        │                         📤 Response
        │
        └─▶ NO ──▶ 401 Unauthorized
```

---

## 🗂️ Project Structure

```
backend/
│
├── 📂 config/
│   └── database.config.js          # MongoDB connection setup
│
├── 📂 controllers/
│   ├── user.controller.js          # Auth: signup, signin, logout, profile
│   └── note.controller.js          # Notes: CRUD operations
│
├── 📂 middlewares/
│   └── user.middleware.js           # JWT authentication middleware
│
├── 📂 models/
│   ├── User.model.js               # User schema with notes array
│   └── Note.model.js               # Note schema with user reference
│
├── 📂 routes/
│   ├── user.route.js               # Authentication endpoints
│   └── note.route.js               # Note management endpoints
│
├── .env                            # Environment variables
├── server.js                       # Express server entry point
├── package.json                    # Dependencies & scripts
└── backend.md                      # This documentation file
```

---

## 🔐 Authentication Flow

### 📝 User Registration (Signup)

```
┌─────────────────────────────────────────────────────────┐
│                  SIGNUP FLOW                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Client sends:                                       │
│     POST /api/auth/signup                               │
│     { name, email, password }                           │
│                                                         │
│  2. Server validates:                                   │
│     ✓ All fields present?                                │
│     ✓ User doesn't already exist?                       │
│                                                         │
│  3. Password hashing:                                   │
│     bcrypt.hash(password, salt) → hashedPassword         │
│                                                         │
│  4. Create user in MongoDB:                             │
│     User.create({ name, email, password: hashed })      │
│                                                         │
│  5. Generate JWT token:                                  │
│     jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' }) │
│                                                         │
│  6. Set HTTP-only cookie:                               │
│     res.cookie('token', token, {                        │
│       httpOnly: true,                                    │
│       maxAge: 3 * 24 * 60 * 60 * 1000                   │
│     })                                                   │
│                                                         │
│  7. Response: 201 Created                               │
│     { message: "User created successfully" }             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 🔑 User Login (Signin)

```
┌─────────────────────────────────────────────────────────┐
│                  SIGNIN FLOW                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Client sends:                                       │
│     POST /api/auth/signin                               │
│     { email, password }                                 │
│                                                         │
│  2. Server validates:                                   │
│     ✓ Email & password present?                         │
│                                                         │
│  3. Find user by email:                                 │
│     User.findOne({ email })                             │
│                                                         │
│  4. Verify password:                                    │
│     bcrypt.compare(password, user.password)             │
│                                                         │
│  5. Generate JWT token:                                  │
│     jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' }) │
│                                                         │
│  6. Set HTTP-only cookie:                               │
│     res.cookie('token', token, {                        │
│       httpOnly: true,                                    │
│       maxAge: 3 * 24 * 60 * 60 * 1000                   │
│     })                                                   │
│                                                         │
│  7. Response: 200 OK                                     │
│     { message: "User signed in successfully" }          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 🛡️ Protected Route Access

```
┌─────────────────────────────────────────────────────────┐
│              PROTECTED ROUTE FLOW                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Client sends request with cookie:                   │
│     GET /api/notes                                      │
│     Cookie: token=jwt_token_here                        │
│                                                         │
│  2. Middleware extracts token:                          │
│     const token = req.cookies.token                     │
│                                                         │
│  3. Verify JWT:                                         │
│     jwt.verify(token, JWT_SECRET) → decoded             │
│                                                         │
│  4. Find user from token:                               │
│     User.findById(decoded.id).select('-password')      │
│                                                         │
│  5. Attach user to request:                             │
│     req.user = user                                     │
│                                                         │
│  6. Proceed to controller:                              │
│     next() → Controller executes                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📡 API Endpoints

### 🔐 Authentication Endpoints

#### POST /api/auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully"
}
```

**Error Responses:**
- `400 Bad Request` - Missing fields or user already exists
- `500 Internal Server Error` - Server error

---

#### POST /api/auth/signin
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "User signed in successfully"
}
```

**Cookies Set:**
- `token` (HTTP-only, 3 days expiry)

**Error Responses:**
- `400 Bad Request` - Invalid credentials or user not found
- `500 Internal Server Error` - Server error

---

#### POST /api/auth/logout
Logout current user (requires authentication).

**Headers:**
- `Cookie: token=your_jwt_token`

**Response (200 OK):**
```json
{
  "message": "Logged out successsfully"
}
```

**Error Responses:**
- `401 Unauthorized` - No valid token
- `500 Internal Server Error` - Server error

---

#### GET /api/auth/me
Get current user details (requires authentication).

**Headers:**
- `Cookie: token=your_jwt_token`

**Response (200 OK):**
```json
{
  "isLoggedIn": true,
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "notes": ["note_id_1", "note_id_2"]
  }
}
```

**Error Responses:**
- `401 Unauthorized` - No valid token
- `500 Internal Server Error` - Server error

---

### 📝 Note Endpoints

#### GET /api/notes
Get all notes for the authenticated user.

**Headers:**
- `Cookie: token=your_jwt_token`

**Response (200 OK):**
```json
{
  "message": "All notes",
  "notes": [
    {
      "_id": "note_id_1",
      "title": "My First Note",
      "description": "This is my first note",
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized` - No valid token
- `500 Internal Server Error` - Server error

---

#### GET /api/notes/:id
Get a specific note by ID.

**Headers:**
- `Cookie: token=your_jwt_token`

**URL Parameters:**
- `id` - Note ID

**Response (200 OK):**
```json
{
  "message": "note found",
  "note": {
    "_id": "note_id",
    "title": "My Note",
    "description": "Note content",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Note ID required
- `401 Unauthorized` - No valid token
- `404 Not Found` - Note not found
- `500 Internal Server Error` - Server error

---

#### POST /api/notes/:id
Create a new note.

**Headers:**
- `Cookie: token=your_jwt_token`

**Request Body:**
```json
{
  "title": "New Note Title",
  "description": "Note description here"
}
```

**Response (201 Created):**
```json
{
  "message": "New note added",
  "note": {
    "_id": "new_note_id",
    "title": "New Note Title",
    "description": "Note description here",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Title or description missing
- `401 Unauthorized` - No valid token
- `500 Internal Server Error` - Server error

---

#### PUT /api/notes/:id
Update an existing note.

**Headers:**
- `Cookie: token=your_jwt_token`

**URL Parameters:**
- `id` - Note ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response (200 OK):**
```json
{
  "message": "note updated",
  "note": {
    "_id": "note_id",
    "title": "Updated Title",
    "description": "Updated description",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - No valid token
- `404 Not Found` - Note not found
- `500 Internal Server Error` - Server error

---

#### DELETE /api/notes/:id
Delete a specific note.

**Headers:**
- `Cookie: token=your_jwt_token`

**URL Parameters:**
- `id` - Note ID

**Response (200 OK):**
```json
{
  "message": "note deleted"
}
```

**Error Responses:**
- `401 Unauthorized` - No valid token
- `404 Not Found` - Note not found
- `500 Internal Server Error` - Server error

---

#### DELETE /api/notes
Delete all notes for the authenticated user.

**Headers:**
- `Cookie: token=your_jwt_token`

**Response (200 OK):**
```json
{
  "message": "all notes deleted"
}
```

**Error Responses:**
- `401 Unauthorized` - No valid token
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server error

---

## 🗄️ Database Models

### 👤 User Model

**File:** `models/User.model.js`

```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
}
```

**Model Relationships:**
- One user can have many notes
- Each note belongs to one user
- Notes are stored as an array of ObjectIds in the user document

**Security:**
- Password is hashed using bcryptjs before storage
- Email field is unique to prevent duplicate accounts
- Password is excluded from responses using `.select('-password')`

---

### 📝 Note Model

**File:** `models/Note.model.js`

```javascript
{
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}
```

**Model Relationships:**
- Each note belongs to exactly one user
- User field references the User model
- Enables population of user details when needed

**Timestamps:**
- `createdAt` - Automatically added by Mongoose
- `updatedAt` - Automatically added by Mongoose

---

## 🛡️ Middleware

### 🔐 Authentication Middleware (protect)

**File:** `middlewares/user.middleware.js`

**Purpose:** Verify JWT token and attach user to request

**Flow:**
```
1. Extract token from cookies
2. Verify token with JWT_SECRET
3. Decode token to get user ID
4. Find user in database (exclude password)
5. Attach user to req.user
6. Call next() to proceed
```

**Code:**
```javascript
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
```

**Usage:**
```javascript
router.get('/protected-route', protect, controllerFunction);
```

**Error Handling:**
- `401 Unauthorized` - No token or invalid token
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server error

---

## ⚙️ Configuration

### 🗄️ Database Configuration

**File:** `config/database.config.js`

**Purpose:** Establish connection to MongoDB

**Code:**
```javascript
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.log("Failed to connect database");
    console.log(err.message);
  }
};
```

**Environment Variables Required:**
- `MONGO_URI` - MongoDB connection string

**Connection Options:**
- Uses default Mongoose connection options
- Handles connection errors gracefully

---

### 🌐 Server Configuration

**File:** `server.js`

**Purpose:** Initialize Express server and configure middleware

**Middleware Stack:**
```javascript
app.use(express.json());        // Parse JSON bodies
app.use(cors());                // Enable CORS
app.use(cookieparser());        // Parse cookies
```

**Routes:**
```javascript
app.use('/api/auth', userRoute);
app.use('/api/notes', noteRoute);
```

**Server Start:**
```javascript
app.listen(port, () => {
  console.log("app's backend strted on : http://localhost:5001");
});
```

---

## 🚀 Getting Started

### 📦 Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```env
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tracknote
JWT_SECRET=your_super_secret_jwt_key
```

3. **Start development server:**
```bash
npm run dev
```

Or with nodemon:
```bash
nodemon server.js
```

### 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5001` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |

### 🧪 Testing Endpoints

**Using cURL:**

```bash
# Signup
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'

# Signin
curl -X POST http://localhost:5001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}' \
  -c cookies.txt

# Get notes (using saved cookie)
curl -X GET http://localhost:5001/api/notes \
  -b cookies.txt

# Create note
curl -X POST http://localhost:5001/api/notes/123 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Test","description":"Test note"}'
```

---

## 🔍 Error Handling

### Standard Error Responses

All endpoints follow consistent error handling:

```json
{
  "message": "Error description here"
}
```

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST (signup, create note) |
| `400` | Bad Request | Missing/invalid data |
| `401` | Unauthorized | No/invalid authentication |
| `404` | Not Found | Resource doesn't exist |
| `500` | Internal Server Error | Server-side error |

### Common Error Messages

- `"email and password are required"` - Missing auth fields
- `"User Does not exist , plz register"` - User not found
- `"Invalid password"` - Wrong password
- `"User already exists"` - Duplicate email
- `"Not authorized"` - No/invalid token
- `"title and description are required"` - Missing note fields
- `"note not found"` - Note doesn't exist or doesn't belong to user

---

## 📊 Data Flow

### 📝 Create Note Flow

```
┌─────────────────────────────────────────────────────────┐
│              CREATE NOTE DATA FLOW                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Client: POST /api/notes/:id                         │
│     { title, description }                              │
│                                                         │
│  2. Middleware: Verify JWT → req.user = user            │
│                                                         │
│  3. Controller:                                         │
│     a. Create Note document                             │
│        Note.create({ title, description, user: userId })│
│                                                         │
│     b. Update User document                             │
│        User.findByIdAndUpdate(userId, {                  │
│          $push: { notes: note._id }                    │
│        })                                               │
│                                                         │
│  4. Database:                                           │
│     • Insert note into notes collection                 │
│     • Update user's notes array                         │
│                                                         │
│  5. Response: 201 Created                              │
│     { message, note }                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 🗑️ Delete Note Flow

```
┌─────────────────────────────────────────────────────────┐
│              DELETE NOTE DATA FLOW                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Client: DELETE /api/notes/:id                       │
│                                                         │
│  2. Middleware: Verify JWT → req.user = user            │
│                                                         │
│  3. Controller:                                         │
│     a. Find user                                        │
│        User.findById(userId)                            │
│                                                         │
│     b. Find note (verify ownership)                     │
│        Note.findOne({ _id: noteId, user: userId })       │
│                                                         │
│     c. Delete note                                      │
│        Note.findByIdAndDelete(note._id)                 │
│                                                         │
│     d. Update user (remove from array)                   │
│        User.findByIdAndUpdate(userId, {                  │
│          $pull: { notes: note._id }                    │
│        })                                               │
│                                                         │
│  4. Database:                                           │
│     • Remove note from notes collection                 │
│     • Remove note ID from user's notes array            │
│                                                         │
│  5. Response: 200 OK                                    │
│     { message: "note deleted" }                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔒 Security Best Practices

### ✅ Implemented Security Measures

1. **Password Hashing**
   - bcryptjs with salt rounds
   - Never store plain text passwords

2. **JWT Authentication**
   - Token-based stateless authentication
   - 7-day token expiry
   - HTTP-only cookies prevent XSS

3. **Route Protection**
   - Middleware checks authentication
   - User isolation (can only access own data)

4. **CORS Configuration**
   - Cross-origin resource sharing enabled
   - Configure for production domains

5. **Input Validation**
   - Required field checks
   - Data type validation

### 🔐 Recommended Enhancements

- Add rate limiting to prevent brute force attacks
- Implement refresh token rotation
- Add input sanitization to prevent injection attacks
- Enable HTTPS in production
- Add request logging for audit trails
- Implement account lockout after failed attempts
- Add email verification for signup
- Implement password reset functionality

---

## 📈 Performance Considerations

### 🚀 Optimization Tips

1. **Database Indexing**
   - Add indexes on frequently queried fields
   - Index on `email` in User model
   - Index on `user` in Note model

2. **Query Optimization**
   - Use `.select()` to exclude unnecessary fields
   - Implement pagination for large note lists
   - Use lean() for read-only queries

3. **Caching Strategy**
   - Cache frequently accessed user data
   - Implement Redis for session storage
   - Cache note lists with TTL

4. **Connection Pooling**
   - Configure MongoDB connection pool size
   - Reuse database connections

---

## 🧪 Testing Guide

### Manual Testing Checklist

- [ ] User signup with valid data
- [ ] User signup with duplicate email
- [ ] User signup with missing fields
- [ ] User login with correct credentials
- [ ] User login with wrong password
- [ ] User login with non-existent email
- [ ] Access protected route without token
- [ ] Access protected route with invalid token
- [ ] Create note with valid data
- [ ] Create note with missing fields
- [ ] Get all notes for authenticated user
- [ ] Get specific note (owned by user)
- [ ] Get specific note (not owned by user)
- [ ] Update note (owned by user)
- [ ] Update note (not owned by user)
- [ ] Delete note (owned by user)
- [ ] Delete note (not owned by user)
- [ ] Delete all notes
- [ ] User logout
- [ ] Access route after logout

---

## 📚 Additional Resources

### 📖 Documentation Links

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [JWT Documentation](https://jwt.io/introduction)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)

### 🎯 Learning Resources

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Design Best Practices](https://restfulapi.net/)
- [MongoDB Schema Design](https://www.mongodb.com/basics/schema-design)

---

## 🤝 Contributing to Backend

When contributing to the backend:

1. Follow the existing code structure
2. Add error handling for new endpoints
3. Update this documentation for new features
4. Test thoroughly before committing
5. Use meaningful variable names
6. Add comments for complex logic
7. Follow RESTful conventions

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue:** MongoDB connection fails
- **Solution:** Check MONGO_URI in .env file
- **Solution:** Verify MongoDB Atlas IP whitelist

**Issue:** JWT verification fails
- **Solution:** Ensure JWT_SECRET matches
- **Solution:** Check token hasn't expired

**Issue:** CORS errors
- **Solution:** Configure CORS origin in production
- **Solution:** Check frontend URL configuration

---

<div align="center">

**🎉 Backend Documentation Complete!**

For project overview, see [README.md](../README.md)

Made with 💻 and ☕

[⬆ Back to Top](#-tracknote-backend-documentation)

</div>