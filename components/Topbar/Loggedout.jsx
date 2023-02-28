import Image from 'next/image'
import styles from '@/styles/Topbar.module.css'
import { useState, useEffect, useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { motion } from "framer-motion"
import { Context } from '../Context'
import Link from 'next/link'

export default function Loggedout () {

   const { sidebarmodal, setSideBarModal, disabled } = useContext(Context)
  

  return (
    <>
       <nav className={styles.csx} > 
           <img className={styles.logo} src="/assets/alleviate4.png" alt='' />
           <MenuIcon className={styles.menu} onClick={ () => { setSideBarModal(!sidebarmodal) } } />
       </nav>

       <nav className={styles.csxdesk} > 
           <ul className={styles.tbdiv1} >
              <Link href={`/mission`} >
                <motion.li className={styles.tbtext1} animate={{ opacity:1 }} initial={{opacity:0}} transition={{duration:1}}  > Mission </motion.li>
              </Link>
              <Link href={`/vision`} >
                <motion.li className={styles.tbtext1} animate={{ opacity:1 }} initial={{opacity:0}} transition={{duration:1}}  > Vision </motion.li>
              </Link>
              <Link href={`/our_heroes`} >
                <motion.li className={styles.tbtext1} animate={{ opacity:1 }} initial={{opacity:0}} transition={{duration:1}}  > Our Heroes </motion.li>
              </Link>
           </ul> 
           <img className={styles.logodesk} src="/assets/alleviate4.png" alt='' />
       {  !disabled && <ul className={styles.tbdiv2} >
              <Link href={`/login`} >
                 <li className={styles.tbtext2} > Log In </li>
              </Link>
              <Link href={`/signup`} >
                <li className={styles.tbtext3} > Sign Up </li>
              </Link>
           </ul> }
       </nav>
    </>
  )
}
