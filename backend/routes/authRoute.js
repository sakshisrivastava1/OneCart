import express from 'express'
import { adminLogin, googleAuth, login, logout, signup } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/googleAuth', googleAuth)
router.post('/adminlogin',adminLogin )
router.get('/logout',logout )

export default router