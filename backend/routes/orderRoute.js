import express from 'express'
import {isAuth} from '../middlewares/isAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controllers/orderController.js'

const router = express.Router()

//FOR USER
router.post('/placeorder',isAuth,placeOrder)
router.post('/razorpay',isAuth,placeOrderRazorpay)
router.post('/verifyrazorpay',isAuth,verifyRazorpay)
router.get('/userorder',isAuth,userOrders)

//FOR ADMIN
router.get('/list',adminAuth,allOrders)
router.post('/status',adminAuth,updateStatus)

export default router