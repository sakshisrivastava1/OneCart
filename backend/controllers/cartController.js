import userModel from "../models/userModel.js";


export const addToCart = async (req,res) => {
    try {
    const {itemId, size } = req.body;

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = user.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({success:true,message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:error.message});
  }
}

export const updateCart = async (req,res) => {
     try {
         const {itemId , size , quantity } = req.body
         const user = await userModel.findById(req.userId)
         let cartData = await user.cartData;

         cartData[itemId][size] = quantity

          await userModel.findByIdAndUpdate(req.userId,{cartData})

    return res.status(201).json({success:true,message:"cart updated"})

    } catch (error) {
         console.log(error)
    return res.status(500).json({success:false,message:error.message})
    }   
}

export const getUserCart = async (req,res) => {
    try {        
      const user = await userModel.findById(req.userId)
      let cartData = await user.cartData;

    return res.status(200).json(cartData)

    } catch (error) {
      console.log(error)
      return res.status(500).json({success:false,message:error.message})
    } 
}