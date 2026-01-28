import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = express.Router()

router.post('/add',isAuth,addToCart)
router.post('/update',isAuth,updateCart)
router.get('/get',isAuth,getUserCart)

export default router