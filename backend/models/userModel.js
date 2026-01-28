import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
      name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: function () {
        return !this.googleAuth; // password required only if NOT google user
        }
    },
googleAuth: {
  type: Boolean,
  default: false
},
    cartData:{
        type:Object,
        default:{}
    }
    
},{timestamps:true,minimize:false})



export default mongoose.model('User',userSchema)