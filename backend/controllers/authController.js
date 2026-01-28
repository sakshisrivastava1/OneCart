import userModel from '../models/userModel.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      avatar: {
        public_id: "temp",
        url: "temp"
      }
    })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      maxAge: 7 * 24 * 60 * 60 * 1000
    })


    res.status(201).json(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  })

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  })
}

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body

    let user = await userModel.findOne({ email })

    if (!user) {
      user = await userModel.create({
        name,
        email,
        googleAuth: true
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES }
    )

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax'
    })

    res.status(200).json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const adminLogin = async(req,res) => {
    try{
   const {email,password} = req.body

    if(email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD){
      return res.status(500).json({success:false,message:'Invalid credentials' })
    }

   const token = jwt.sign(
        {email},
        process.env.JWT_SECRET_KEY,
        {expiresIn:process.env.JWT_EXPIRES}
    )

   res.cookie('token',token,{httpOnly:true,secure:false,maxAge:7*24*60*60*1000})

   res.status(201).json({success:true,message:'Login Successful' })
   
  }catch(error){
    console.log(error.message)
    res.status(500).json({success:false,message:error.message })
  }
}