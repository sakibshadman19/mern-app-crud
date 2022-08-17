import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const adddata= createContext("")

const ContextProvider = ({children}) => {
    const [udata,setUdata] = useState({
        newdata : "",
        updatedata: false,
        deleteData: false
    })

  return (
    <adddata.Provider value={{udata,setUdata}}>
   {children}
    </adddata.Provider>
  )
}

export default ContextProvider