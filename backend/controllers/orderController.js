import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config()

const currency = 'inr'
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//FOR USER
export const placeOrder = async(req,res) =>{
  try {
    const {items,amount,address } = req.body
    const userId = req.userId
    const orderData = {
       items,
       amount,
       address,
       userId,
       paymentMethod:'COD',
       payment:false,
       date:Date.now()
    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    return res.status(200).json({success:true,message:'Order Placed Successfully'})

  } catch (error) {
    console.log(error)
  }
}

export const placeOrderRazorpay = async (req,res) => {
  try {        
    const {items , amount , address} = req.body;
    const userId = req.userId;
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod:'Razorpay',
      payment:false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const options = {
    amount:amount * 100,
    currency: currency.toUpperCase(),
    receipt : newOrder._id.toString()
    }
    
    await razorpayInstance.orders.create(options, (error,order)=>{
    if(error) {
      console.log(error)
      return res.status(500).json(error)
    }
    res.status(200).json(order)
    })

    } catch (error) {
      console.log(error)
      return res.status(500).json({success:false,message:error.message})
    }
}

export const verifyRazorpay = async (req,res) =>{
  try {
    const userId = req.userId

    const {razorpay_order_id} = req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    if(orderInfo.status === 'paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
      await userModel.findByIdAndUpdate(userId , {cartData:{}})
      return res.status(200).json({success:true,message:'Payment Successful'})
    }
    else{
      return res.json({message:'Payment Failed'})
    }
    } catch (error) {
        console.log(error)
         res.status(500).json({success:false,message:error.message})
    }
}

export const userOrders = async(req,res) =>{
  try {
    const userId = req.userId
    const orders = await orderModel.find({userId})

    return res.status(200).json(orders)

  } catch (error) {
    console.log(error)
     return res.status(500).json({success:false,message:error.message})
  }
}

//FOR ADMIN
export const allOrders = async(req,res) =>{
    try {
      const orders = await orderModel.find({})
      if(!orders){
       return res.status(500).json({success:false,message:'Orders not found'})
      }
      return res.status(200).json(orders)

  } catch (error) {
    console.log(error)
     return res.status(500).json({success:false,message:error.message})
  }
}

export const updateStatus = async(req,res) =>{
    try {
      const {orderId,status} = req.body
      const order = await orderModel.findByIdAndUpdate(orderId,{status})

      if(!order){
       return res.status(500).json({success:false,message:'Order not found'})
      }
      return res.status(200).json({success:true,order,message:'Order staus updated'})

  } catch (error) {
    console.log(error)
     return res.status(500).json({success:false,message:error.message})
  }
}
