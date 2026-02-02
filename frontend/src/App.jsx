import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './components/Nav'
import Contact from './pages/Contact'
import About from './pages/About'
import Product from './pages/Product'
import Order from './pages/Order'
import Collections from './pages/Collections'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Ai from './pages/Ai'

import { userDataContext } from './context/UserContext'

export const serverUrl = 'https://onecart-backend-nbo6.onrender.com'


const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(userDataContext)
  return userData ? children : <Navigate to="/login" />
}

function App() {
  const { userData } = useContext(userDataContext)

  return (
    <>
      <ToastContainer />

      {/* Navbar only after login */}
      {userData && <Nav />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/" />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/collection"
          element={
            <ProtectedRoute>
              <Collections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productdetail/:productId"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/placeorder"
          element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* AI only after login */}
      {userData && <Ai />}
    </>
  )
}

export default App
