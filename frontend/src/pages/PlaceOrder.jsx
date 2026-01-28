import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { serverUrl } from '../App'
import { ClipLoader } from 'react-spinners'

function PlaceOrder() {
  
    const [method,setMethod] = useState('cod')
    const navigate = useNavigate()
    const {cartItem , setCartItem , getCartAmount , delivery_fee , products } = useContext(shopDataContext)
    const [loading ,setLoading] = useState(false)
    const [formData,setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        pinCode:'',
        country:'',
        phone:''
    })

    const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({...data,[name]:value}))
    }

  const initPay = (order) =>{
      const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        console.log('verifyrazorpay',response)
        const {data} = await axios.post(serverUrl + '/api/order/verifyrazorpay',response,{withCredentials:true})
        console.log('verifyrazorpayy',data)
        if(data){
          navigate("/order")
          toast.success('Order Placed!')
          setCartItem({})
        }
      }}
      const rzp = new window.Razorpay(options)
      rzp.open()
  }

    
  const onSubmitHandler = async (e) => {       
    setLoading(true)
    e.preventDefault()
     try {
      let orderItems = []
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
               itemInfo.size = item
               itemInfo.quantity = cartItem[items][item]
               orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address:formData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee
      }

      switch(method){
        case 'cod':      
        const result = await axios.post(serverUrl + "/api/order/placeorder" , orderData , {withCredentials:true})
        console.log('COD',result.data)
        if(result.data){
          setCartItem({})
          toast.success("Order Placed")
          navigate("/order")
          setLoading(false)

        }else{
          console.log(result.data.message)
          toast.error("Order Placed Error")
          setLoading(false)
        }
        break;

        case 'razorpay':
        const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay" , orderData , {withCredentials:true})
        console.log('Razorpay',resultRazorpay.data)
        if(resultRazorpay.data){
          initPay(resultRazorpay.data)
          toast.success("Order Placed")
          setLoading(false)
        }
        break;

        default:
        break;
      }
      toast.success('Order Placed')
    } catch (error) {
      console.log(error)
      setLoading(false) 
      toast.error('Order unsuccessful')
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px]  relative'>
        <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center  lg:mt-[0px] mt-[90px] '>
            <form action="" onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]'>
        <div className='py-[10px]'>
        <Title text1={'DELIVERY '} text2={'INFORMATION'}/>
        </div>
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

         <input type="text" placeholder='First name' className='w-[48%] h-[50px] rounded-md bg-slate-700 text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'required  onChange={onChangeHandler} name='firstName' value={formData.firstName}/>

          <input type="text" placeholder='Last name' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='lastName' value={formData.lastName} />
        </div>

        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
          <input type="email" placeholder='Email address' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-[white] text-[18px] px-[20px]'required onChange={onChangeHandler} name='email' value={formData.email} />
         
        </div>
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
          <input type="text" placeholder='Street' className='w-[100%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='street' value={formData.street} />
         
        </div>
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
          <input type="text" placeholder='City' className='w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='city' value={formData.city} />
          <input type="text" placeholder='State' className='w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='state' value={formData.state} />
        </div>
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
          <input type="text" placeholder='Pincode' className='w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
          <input type="text" placeholder='Country' className='w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='country' value={formData.country} />
        </div>
         <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
          <input type="text" placeholder='Phone' className='w-[100%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='phone' value={formData.phone} />
         
        </div>
        <div>
          <button type='submit' disabled={loading} className='md:text-[18px] text-[13px] font-semibold active:bg-slate-500 cursor-pointer bg-teal-900 py-[10px] px-[50px] rounded-lg text-white flex items-center justify-center gap-[20px] absolute lg:right-[20%] md:bottom-[10%] bottom-[7%] right-[30%] border-[1px] border-[#80808049] ml-[30px] md:mt-[20px]' >{loading? <ClipLoader size={30} color='white'/> : "PLACE ORDER"}</button>
         </div> 


            </form>

       
        </div>
         <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px] '>
            <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%]  flex items-center justify-center gap-[10px] flex-col'>
                <CartTotal/>
                <div className='py-[10px]'>
        <Title text1={'PAYMENT '} text2={'METHOD'}/>
        </div>
        <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[10px] lg:mt-[0px] justify-center gap-[50px]'>
        <button onClick={()=>setMethod('razorpay')} className={`md:w-[150px] md:h-[50px] w-[120px] h-[50px] rounded-sm  ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}> <img src={razorpay} className='w-[100%] h-[100%] object-fill rounded-sm ' alt="" /></button>
        <button onClick={()=>setMethod('cod')} className={`md:w-[200px] md:h-[50px] w-[150px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}>CASH ON DELIVERY </button>
        </div>
            </div>
        </div>
      
    </div>
  )
}

export default PlaceOrder
