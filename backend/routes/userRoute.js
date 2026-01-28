import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { getAdmin, getCurrentUser } from '../controllers/userController.js'
import { adminAuth } from '../middlewares/adminAuth.js'

const router = express.Router()

router.get('/current',isAuth,getCurrentUser)
router.get('/getadmin',adminAuth,getAdmin)

export default router 