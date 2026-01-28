import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './components/Nav'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import { ToastContainer } from 'react-toastify';
import Contact from './pages/Contact'
import About from './pages/About'
import Product from './pages/Product'
import Order from './pages/Order'
import Collections from './pages/Collections'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import NotFound from './pages/NotFound'
import Ai from './pages/Ai'


export const serverUrl = 'https://onecart-backend-nbo6.onrender.com'

function App() {
  const {userData} = useContext(userDataContext)

  return (
     <>
     <ToastContainer/>
    {userData && <Nav/>}
      <Routes>

        {!userData && <Route path='/login' element={<Login/>}/>}
 
        {!userData && <Route path='/signup' element={<Signup/>}/>}

        {userData && <Route path='/' element={<Home/> }/>}

        {userData && <Route path='/about' element={<About/> }/>}
      
        {userData && <Route path='/collection' element={<Collections/>}/>}

        {userData && <Route path='/product' element={<Product/> }/>}

        {userData && <Route path='/contact' element={<Contact/> }/>}
        
        {userData && <Route path='/productdetail/:productId' element={<ProductDetail/>}/>}

        {userData && <Route path='/cart' element={<Cart/> }/>}

        {userData && <Route path='/placeorder' element={<PlaceOrder/>}/>}

        {userData && <Route path='/order' element={<Order/>}/>}

        <Route path='*' element={<NotFound/>}/>

      </Routes>
      <Ai/>
    </>
  )
}

export default App
