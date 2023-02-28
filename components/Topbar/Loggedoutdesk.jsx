import Image from 'next/image'
import styles from '@/styles/Topbar.module.css'
import { useState, useEffect, useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { motion } from "framer-motion"
import { Context } from '../Context'


export default function Loggedoutdesk () {

   const { sidebarmodal, setSideBarModal } = useContext(Context)
  

  return (
    <>
       <nav className={styles.csx} > 
           <img className={styles.logo} src="/assets/paypallogo.png" alt='' />
           <MenuIcon className={styles.menu} onClick={ () => { setSideBarModal(!sidebarmodal) } } />
       </nav>
    </>
  )
}
