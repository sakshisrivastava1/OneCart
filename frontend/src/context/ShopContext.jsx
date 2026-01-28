import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import {toast} from 'react-toastify'
import { userDataContext } from './UserContext'
import { serverUrl } from '../App'

export const shopDataContext = createContext()

function ShopContext({children}) {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [cartItem, setCartItem] = useState({})
    const {userData} = useContext(userDataContext);
    const currency = "₹";
    const delivery_fee = 40

    const getProducts = async() => {
      try {
        const result = await axios.get(serverUrl + '/api/product/list' , {withCredentials:true})
        setProducts(result.data)
        console.log(result.data)
      } catch (error) {
          console.log(error) 
      }
    }

    const addtoCart = async(itemId,size) =>{
      if(!size){
        toast.error('Select Product Size')
        return;
      }
      let cartData = structuredClone(cartItem)  //Product clone
      if(cartData[itemId]){
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        }
        else{
            cartData[itemId][size] = 1;
        }
      }
      else{
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }
      setCartItem(cartData)
      
      if(userData){
        setLoading(true)
        try {
          const result = await axios.post(serverUrl + '/api/cart/add',{itemId,size},{withCredentials:true})
          console.log(result.data)
          toast.success('Product Added To Cart')
          setLoading(false)
        } catch (error) {
          console.log(error.message)
          setLoading(false)
        }
      }
    }

    const getUserCart = async() =>{
       try {
          const result = await axios.get(serverUrl + '/api/cart/get',{withCredentials:true})
          setCartItem(result.data)

        } catch (error) {
           console.log(error.message);
        }
    }

    const updateQuantity = async(itemId,size,quantity) =>{
      const cartData = structuredClone(cartItem)
      cartData[itemId][size] = quantity
      setCartItem(cartData)
      if(userData){
       try {
          await axios.post(serverUrl + '/api/cart/update',
            {itemId,size,quantity},{withCredentials:true})
          //setCartItem(result.data.cartData)

        } catch (error) {
           console.log(error.message);
        }
      }
    }

    const getCartCount = () =>{
       let totalCount = 0;
       for(const itemId in cartItem){
         for(const size in cartItem[itemId]){
           try {
             if(cartItem[itemId][size] > 0){
                totalCount += cartItem[itemId][size]
             }
           } catch (error) {
            console.log(error.message)
           }
       }
       }
       return totalCount;
    }

    const getCartAmount = () =>{
      let totalAmount = 0;

      for(const itemId in cartItem){
         let itemInfo = products.find((product) => product._id === itemId)
         for(const size in cartItem[itemId]){
          try {
            if(cartItem[itemId][size]>0){
              totalAmount += itemInfo.price * cartItem[itemId][size]
            }
          } catch (error) {
            console.log(error)
          }
         }
      }
      return totalAmount;
    }

    useEffect(() => {getProducts()}, [])

    useEffect(() => {getUserCart()}, [])

    
    const value = {products,getProducts,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItem,addtoCart,getCartCount,setCartItem,
        updateQuantity,getCartAmount,loading
    }

  return (
    <div>
        <shopDataContext.Provider value={value} >
            {children}
        </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext