import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { serverUrl } from '../App'

function Order() {
    let [orderData,setOrderData] = useState([])
    let {currency} = useContext(shopDataContext)

    const loadOrderData = async () => {
       try {
       const result = await axios.get(serverUrl + '/api/order/userorder',{withCredentials:true})
       if(result.data){
         let allOrdersItem = []
         result.data.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
     } catch (error) {
       console.log(error)
     }
    }

   useEffect(()=>{loadOrderData()},[])


  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] pb-[150px]  overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] '>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'MY '} text2={'ORDERS'} />
      </div>
      <div className=' w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
        {
         orderData.map((item,index)=>(
            <div key={index} className='w-[100%] h-[10%] border-t border-b '>
                <div className='w-[100%] h-[80%] flex items-start md:gap-6 gap-4 bg-gray-800 py-[10px] px-[20px] rounded-2xl relative '>
                    <img src={item.image1} alt="" className='w-[100px] h-[130px] md:w-[130px] md:h-[130px] rounded-md '/>
                    <div className='flex items-start justify-center flex-col gap-[5px]'>
                    <p className='md:text-[25px] text-[18px] py-[5px] text-white'>{item.name}</p>
                    <div className='flex items-center gap-[8px]   md:gap-[20px]'>
                        <p className='md:text-[18px] text-[12px] text-white'>{currency} {item.price}</p>
                      <p className='md:text-[18px] text-[12px] text-white'>Quantity: {item.quantity}</p>
                      <p className='md:text-[18px] text-[12px] text-white'>Size: {item.size}</p>
                    </div>
                    <div className='flex items-center'>
                     <p className='md:text-[18px] text-[12px] md:block hidden text-[white]'>Date:<span className='text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px]'>{new Date(item.date).toDateString()}</span></p>
                    </div>
                    <div className='flex items-center'>
                      <p className='md:text-[16px] text-[12px] text-white'>Payment Method : {item.paymentMethod}</p>
                    </div>
                    <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]'>
                        <div className='flex items-center gap-[5px]'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p> 
                      <p className='md:text-[17px] text-[11px] text-[#f3f9fc]'>{item.status}</p>

                    </div>

                    </div>
                     <div className='absolute md:right-[5%] right-[2%] md:top-[40%] top-[77%]'>
                             <button className='md:px-[15px] px-[5px] md:py-[7px] py-[3px] rounded-md bg-black texxt-white text-white
                             text-[12px] md:text-[16px] cursor-pointer active:bg-slate-500' onClick={loadOrderData}>
                                    Track Order
                             </button>
                         </div>
                    </div>
                </div>
               
            </div>
         ))
        }
      </div>
    </div>
  )
}

export default Order

{/*
  <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
          {
            orderData.map((item,index)=>(
              <div key={index} className='border-t border-b w-[100%] h-[10%]'>

                <div className='w-[100%] h-[80%] bg-slate-700 flex items-start gap-6 py-[10px] px-[20px] rounded-xl relative'>
                    <img src={item.image1} alt="" className='rounded-md h-[130px] w-[130px]'/>
                    
                    <div className='flex flex-col items-center justify-center gap-[5px]'>
                        <p className='text-[20px] md:text-[25px] text-blue-100'>
                            {item.name}
                        </p>

                        <div className='flex items-center md:gap-[20px] gap-[8px]'>
                            <p className='text-[9px] md:text-[14px] text-blue-100'>
                              ₹ {item.price}/-
                            </p>
                            <p className='text-[9px] md:text-[14px] text-blue-100'>
                               Quantity: {item.quantity}
                            </p>
                            <p className='text-[9px] md:text-[14px] text-blue-100'>
                               Size: {item.size}
                            </p>
                        </div>
                        <div className='flex items-center'>
                            <p className='md:text-[15px] text-[9px] text-blue-100'>
                                Date:<span className='text-white pl-[10px] md:text-[16px] text-[11px]'>
                                  {new Date(item.date).toDateString()}
                                </span>
                            </p>
                        </div>
                        <div className='flex items-center'>
                            <p className='md:text-[15px] text-[12px] text-blue-100'>
                                PaymentMethod:  {item.paymentMethod}
                            </p>
                        </div>
                         <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]'>
                              <div className='flex items-center gap-[5px]'>
                                 <p className='min-w-2 h-2 rounded-full bg-green-500'>
                                   
                                </p>
                                <p className='md:text-[15px] text-[8px] text-white'>
                                    {item.status}
                                </p>
                              </div>
                         </div>
                         <div className='absolute md:right-[5%] right-[5%] md:top-[40%] top-[75%]'>
                             <button className='md:px-[15px] px-[5px] md:py-[7px] py-[3px] rounded-md bg-gray-800 texxt-white text-white
                             text-[12px] md:text-[16px] cursor-pointer active:bg-slate-500' onClick={loadOrderData}>
                                    Track Order
                             </button>
                         </div>
                    </div>
                </div>

              </div>
            )) 
          }
        </div>
  */}
