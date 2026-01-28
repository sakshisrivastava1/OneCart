import jwt from 'jsonwebtoken'

export const isAuth = async(req,res,next) =>{
    try {
       const { token } = req.cookies

       if(!token){
        return res.status(401).json({
         success: false,
         message: "Unauthorized: Token missing"})

       }

       const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)

       req.userId = decode.id
       next()
     
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`IS AUTH ERROR ${error.message}`
        })
       }
}