import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'

export const Context = createContext()

export const ContextProvider = ({children}) => {

    const router = useRouter()

    const [sidebarmodal, setSideBarModal ] = useState(false)
    const [error1, setError1 ] = useState(null)
    const [ genloading, setGenLoading ] = useState(true)
    const [ isloggedin, setIsLoggedIn ] = useState(false)
    const [ disabled, setDisabled ] = useState(true)

    useEffect(() => {
        const handleGet = async () => {
          const toke =  await axios.get("/api/getuser",) 
       
           setDisabled(false)
          if ( Object.keys(toke.data).length > 0 ) {
            setDisabled(true)
            setIsLoggedIn(true)
          }
         } 
         handleGet()
      }, []);
  
      const removeCookie = () => {
        fetch( '/api/logout', {
            method: "post",
            headers: {
               "content-type": "application/json"
            },
            body: JSON.stringify( {} )
        } )
        setSideBarModal(false)
        setIsLoggedIn(false)
        setDisabled(false)
        localStorage.removeItem('userf')
        localStorage.removeItem('userl')
        localStorage.removeItem('urole')
        localStorage.removeItem('upics')
         router.push("/")
         router.push("/")
     }


    return (
        <Context.Provider value={ { sidebarmodal, setSideBarModal, error1, setError1, genloading, setGenLoading, isloggedin, setIsLoggedIn, removeCookie, disabled, setDisabled }} >
            {children}
        </Context.Provider>
 )
}