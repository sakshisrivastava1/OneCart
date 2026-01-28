import { uploadOnCloudinary } from "../config/cloudinary.js"
import productModel from "../models/productModel.js"

export const addProduct = async(req,res) =>{
  try {
    const {name,description,price,category,subCategory,sizes,bestseller} = req.body

    const image1 = await uploadOnCloudinary(req.files.image1[0].path)
    const image2 = await uploadOnCloudinary(req.files.image2[0].path)
    const image3 = await uploadOnCloudinary(req.files.image3[0].path)
    const image4 = await uploadOnCloudinary(req.files.image4[0].path)

    const productData = {
        name,
        description,
        price:Number(price),
        category,
        subCategory,
        sizes:JSON.parse(sizes),
        date:Date.now(),
        bestseller:bestseller === 'true' ? true : false,
        image1,
        image2,
        image3,
        image4
    }

    const product = await productModel.create(productData)
    return res.status(200).json(product)

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false,message:"Product creation unsuccessful"})
  }
}

export const listProducts = async(req,res) =>{
   try {
     const products = await productModel.find({})
     if(!products){
      return res.status(500).json({success:false,message:'Products not found'})
     }
     return res.status(200).json(products)
   } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:error.message})
   }
}

export const removeProduct = async(req,res) =>{
   try {
    const {id} = req.params
     const product = await productModel.findByIdAndDelete(id)
     if(!product){
      return res.status(500).json({success:false,message:'Product not found'})
     }
     return res.status(200).json({success:true,message:'Product deleted successfully',product})
   } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:error.message})
   }
}