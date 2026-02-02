import express from 'express'
import dotenv from 'dotenv'
import path from "path"
import cookieParser from "cookie-parser"
import cors from 'cors'

import { connectToDb } from './config/db.js'
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import orderRouter from './routes/orderRoute.js'
import cartRouter from './routes/cartRoute.js'

dotenv.config()
connectToDb()

const app = express()
const port = process.env.PORT || 4000
const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
  origin: [
    "https://onecart-frontend-aob0.onrender.com",
    "https://onecart-admin-vv0e.onrender.com"
  ],
  credentials: true
}))


app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/cart', cartRouter)

app.use(express.static(path.join(__dirname, "dist")))

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})


app.listen(port, () =>
  console.log(`Server running on port ${port}`)
)
