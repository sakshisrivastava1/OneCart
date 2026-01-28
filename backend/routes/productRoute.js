import express from 'express'
import { addProduct, listProducts, removeProduct } from '../controllers/productController.js'
import upload from '../middlewares/multer.js'
import { adminAuth } from '../middlewares/adminAuth.js'

const router = express.Router()

router.post('/add',upload.fields([
    {name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1},
    {name:'image4',maxCount:1},
]), addProduct) 

router.get('/list',listProducts)
router.get('/remove/:id',adminAuth,removeProduct)

export default router 