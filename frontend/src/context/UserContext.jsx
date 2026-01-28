import React, { createContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'

export const userDataContext = createContext()

function UserContext({children}) {
    const [userData, setUserData] = useState(null)

    const getCurrentUser = async() =>{
        try {
            const result = await axios.get(serverUrl + '/api/user/current',{withCredentials:true})
            setUserData(result.data)
            console.log(result.data)

        } catch (error) { 
           console.log(error.message)
        }
    }

    useEffect(() => {
      getCurrentUser()
    }, [])
    

    let value = {
       userData,setUserData,getCurrentUser
    }

  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext