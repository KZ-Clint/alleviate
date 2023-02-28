import Image from 'next/image'
import styles from '@/styles/Topbar.module.css'
import { useState, useEffect, useContext } from 'react'
import Loggedout from './Topbar/Loggedout'
import Loggedin from './Topbar/Loggedin'
import MenuIcon from '@mui/icons-material/Menu'
import { Context } from './Context'

export default function Topbar () {

  const { isloggedin, setIsLoggedIn } = useContext(Context)

  return (
    <>
       
     { !isloggedin &&  <Loggedout/> }
     {  isloggedin && <Loggedin/>  }
    </>
  )
}
