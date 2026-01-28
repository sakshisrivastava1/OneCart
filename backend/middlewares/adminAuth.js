import jwt from 'jsonwebtoken'

export const adminAuth = async(req,res,next) =>{
    try {
       const { token } = req.cookies

       if(!token){
        return res.status(400).json({
            success:false,
            message:'Admin do not have a token'
        })
       }

       const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY)

       if(!verifyToken){
        return res.status(400).json({
            success:false,
            message:'Admin do not have a valid token'
        })
       }

       req.adminEmail = process.env.ADMIN_EMAIL
       next()
     
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`ADMIN AUTH ERROR ${error.message}`
        })
       }
}