import React from 'react'

function NewLetterBox() {
    const submitHandler = (e) => {
        e.preventDefault()
    }
  return (
    <div className='w-[100%] h-[40vh] flex flex-col items-center justify-center bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[10px] '>

        <p className='text-[20px] px-[20px] md:text-[30px] font-semibold text-[#a5faf7]'>
            Subscribe now & get 20% off
        </p>

        <p className='text-[14px] px-[20px] md:text-[18px] text-center font-semibold text-blue-100'>
            Subscribe now & get exclusive savings, special deals and early access to our latest collections.
        </p>

        <form className='w-full sm:w-1/2 h-[30%] md:h-[50%] flex sm:flex-row items-center justify-center gap-[10px] mt-[20px] px-[20px]'
         onSubmit={submitHandler}>
          <input 
          type="email" 
          required
          placeholder='Enter email' 
          className='w-[600px] max:w-[60%] h-[45px] px-[20px] rounded-md placeholder:text-[black] bg-slate-300 shadow-sm shadow-black '/>
          
          <button type='submit'
          className='text-[15px] md:text-[16px] px-[10px] md:px-[30px] py-[12px] md:py-[10px] gap-[20px] flex items-center justify-center cursor-pointer rounded-md bg-teal-900 hover:bg-teal-600 text-white shadow-sm shadow-black '>
            SUBSCRIBE
          </button>
       </form>

    </div>
  )
}

export default NewLetterBox
