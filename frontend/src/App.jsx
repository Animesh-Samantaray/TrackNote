import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddNote from './pages/AddNote'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import UpdateNote from './pages/UpdateNote'
import Home from './pages/Home'
import {Toaster} from 'react-hot-toast'
import { AuthProvider } from './store/authStore'
const App = () => {
  return (
    <AuthProvider>
    <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1b4b',
            color: '#fff',
            border: '1px solid #7c3aed'
          }
        }}
      />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/update/:id" element={<UpdateNote />} />
      <Route path="/add" element={<AddNote />} />
    </Routes>
    </AuthProvider>
  )
}

export default App