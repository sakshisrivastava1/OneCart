import React from 'react'
import Title from '../components/Title'
import contact from "../assets/contact_img.png"
import NewLetterBox from '../components/NewLetterBox'


function Contact() {
  return (
    <div className='w-[99vw] min-h-[100vh] flex items-center justify-center flex-col  bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>
      <Title  text1={'CONTACT '} text2={'US'}/>
      <div className='w-[100%]  flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[40%] w-[80%] flex items-center justify-center '>
          <img src={contact} alt=""  className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm'/>
        </div>
        <div className='w-[80%] lg:w-[50%] flex items-center justify-center flex-col gap-[20px] mt-[20px] lg:mt-[0px]'>
              <p className='lg:w-[80%] w-[100%] text-white font-bold lg:text-[18px] text-[15px]'>
                 Our Store
              </p>
              <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
                 <p>123, Green Valley Road,</p>
                 <p>Near City Park,
                  Munnar, Idukki District,
                   Kerala – 685612, India</p>
              </p>
              <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
                 <p>tel: +91 8541236974</p>
                 <p>email: admin@onecart.com</p>
              </p>
              <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] font-bold text-[13px]'>
                Careers at OneCart
              </p>
              <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
                  Learn more about our teams and job openings.
              </p>
              <button className='px-[20px] py-[20px] text-white flex items-start justify-center 
                border bg-teal-900 hover:bg-slate-600 rounded-md'>
                 Explore Jobs
              </button>
          </div>       
      </div>
      
      <NewLetterBox/>
    </div>
  )
}

export default Contact
