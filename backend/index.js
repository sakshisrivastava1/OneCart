import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connectToDb } from './config/db.js'
connectToDb()
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import orderRouter from './routes/orderRoute.js'
import cartRouter from './routes/cartRoute.js'
const app = express()

const port = process.env.PORT || 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:["https://onecart-frontend-aob0.onrender.com","https://onecart-admin-vv0e.onrender.com"],
    credentials:true
}));

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/order', orderRouter)
app.use('/api/cart', cartRouter)

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`App listening on port ${port}!`))
