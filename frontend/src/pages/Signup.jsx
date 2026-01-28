import React from 'react'
import Logo from "../assets/logo.png"
import { serverUrl } from '../App'
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners';
import { signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/Firebase'
import { provider } from '../../utils/Firebase'
import { userDataContext } from '../context/UserContext'
import { useContext } from 'react'


function Signup() {

    const [show,setShow] = useState(false)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    
    const navigate = useNavigate()
    const {getCurrentUser} = useContext(userDataContext)

    const handleSignup = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
         const response = await axios.post(serverUrl + '/api/auth/signup',{name,email,password},{withCredentials:true})
            console.log(response.data)
            toast.success('Signup successful!')
            getCurrentUser()
            navigate("/")
            setLoading(false)

        } catch (error) {
            console.log(error)
            toast.error("User Registration Failed")
        }
    }

    const googleSignup = async() => {
          try {
            const response = await signInWithPopup(auth,provider)
            console.log(response)
    
            let user = response.user
            let name = user.displayName
            let email = user.email 
    
            const result = await axios.post(serverUrl + '/api/auth/googleAuth', 
              {name,email},{withCredentials:true})    
             console.log(result.data)
             toast.success('Signup successful!')
             getCurrentUser()
             navigate('/')
    
          } catch (error) {
            console.log(error.message)
          }
    }


   return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start '>

       <div onClick={()=>navigate('/')} className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'>
           <img src={Logo} alt="" className='w-[40px]'/>
           <h1 className='text-[22px] font-sans'>OneCart</h1>
       </div>

       <div className='w-[100%] h-[100px] flex flex-col items-center justify-center gap-[10px]'>
          <span className='text-[25px] font-semibold'>
            Signup Page
          </span>
          <span className='text-[25px]'>
             Welcome to OneCart!
          </span>
       </div>

       <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-1px border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>

           <form action="" onSubmit={handleSignup} className='h-[90%] w-[90%] flex flex-col items-center justify-start gap-[20px]'>
                <div onClick={googleSignup} className='w-[80%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'>
                    <img className='w-[20px]' src={google} alt="" /> Signup with Google
                </div>

               <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                      <div className='w-[40%] h-[1px] bg-[#96969635]'></div> 
                               OR 
                      <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                </div>

                <div className='w-[90%] bottom-[5%]  h-[400px] relative flex flex-col items-center justify-center gap-[15px]'>
                    <input type="text" placeholder='Username' value={name}
                    className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent px-[20px] font-semibold required'
                    onChange={(e)=>setName(e.target.value)}/>

                    <input type="text" placeholder='Email' value={email}
                    className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent px-[20px] font-semibold required'
                    onChange={(e)=>setEmail(e.target.value)}/>

                    <input type={show ? "text" : "password"} placeholder='Password' value={password} 
                    className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent px-[20px] font-semibold required'
                    onChange={(e)=>setPassword(e.target.value)}/>
                     
                    {!show &&
                    <MdOutlineRemoveRedEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]'
                     onClick={()=>setShow(prev=>!prev)}/>
                    }
                    {show &&
                      <IoEyeOffOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]'
                      onClick={()=>setShow(prev=>!prev)}/>
                    }

                    <button disabled={loading} className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>
                        {loading ? <ClipLoader/> :'Create Account'} 
                    </button>

                    <p className='flex gap-[10px] '>
                       Do you have any account? 
                       <span className='text-[17px] text-[#5555f6cf] font-semibold cursor-pointer' onClick={()=>navigate('/login')}>
                           Login
                       </span>
                    </p>
                </div>
           </form>
       </div>

    </div>
  )
}

export default Signup