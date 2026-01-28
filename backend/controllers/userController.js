import userModel from "../models/userModel.js"

export const getCurrentUser = async (req, res) => {
    try {
    const user = await userModel.findById(req.userId).select('-password')

    if (!user) {
      return res.status(409).json({ success: false, message: "User not found!" })
    }       
    res.status(200).json(user)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getAdmin = async(req,res) => {
   try {
      const adminEmail = req.adminEmail

      if(!adminEmail){
         return res.status(500).json({success:false,message:'Admin do not exist!' })
      }

    return res.status(200).json({success:true, email:adminEmail, role:"Admin" })

   } catch (error) {
      console.log(error.message)
      return res.status(500).json({success:false,message:`getAdmin Error ${error.message}` })
   }
}