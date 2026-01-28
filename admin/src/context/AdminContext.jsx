import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'

export const adminDataContext = createContext()

function AdminContext({children}) {

    let [adminData,setAdminData] = useState(null)

    const getAdmin = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/getadmin",{withCredentials:true})
        setAdminData(result.data)
        console.log(result.data)
      } catch (error) {
        setAdminData(null)
        console.log(error)
      }
    }

    useEffect(()=>{getAdmin()},[])

    const value = {adminData,setAdminData,getAdmin}

    return (
    <div>
        <adminDataContext.Provider value={value}>
          {children}
        </adminDataContext.Provider>     
    </div>
  )
}

export default AdminContext