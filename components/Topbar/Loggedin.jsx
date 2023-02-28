import Image from 'next/image'
import styles from '@/styles/Topbar.module.css'
import { useState, useEffect, useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { motion } from "framer-motion"
import { Context } from '../Context'
import Link from 'next/link'

export default function Loggedin () {

  const { sidebarmodal, setSideBarModal, removeCookie } = useContext(Context)
  const [ user, setUser ] = useState({})

  useEffect(() => {
    const firstName = JSON.parse(localStorage.getItem('userf') )
    const role = JSON.parse(localStorage.getItem('urole') )
    const pics = JSON.parse(localStorage.getItem('upics') )
    setUser({...user, firstName, role, pics })
   }, []);

 
  return (
    <>
       <nav className={styles.csx} > 
         { Object.keys(user).length > 0 &&  user.role === "giver" &&  <p className={styles.nametag} > {user.firstName.charAt(0).toUpperCase()} </p> }
         { Object.keys(user).length > 0 &&  user.role === "advocate" &&  <img className={styles.nametag2} src={user.pics} alt="" /> }
           <img className={styles.logo} src="/assets/alleviate4.png" alt='' />
           <MenuIcon className={styles.menu} onClick={ () => { setSideBarModal(!sidebarmodal) } } />
       </nav>

       <nav className={styles.csxdesk} > 
          { Object.keys(user).length > 0 &&  user.role === "giver" &&  <p className={styles.nametag} > {user.firstName.charAt(0).toUpperCase()} </p> }
          { Object.keys(user).length > 0 &&  user.role === "advocate" &&  <img className={styles.nametag2} src={user.pics} /> }
           <ul className={styles.tbdiv1} >
              <Link href={`/mission`} >
                <motion.li className={styles.tbtext1} animate={{ opacity:1 }} initial={{opacity:0}} transition={{duration:1}}  > Mission </motion.li>
              </Link>
              <Link href={`/vision`} >
                <motion.li className={styles.tbtext1} animate={{ opacity:1 }} initial={{opacity:0}} transition={{duration:1}}  > Vision </motion.li>
              </Link>
              <Link href={`/home`} >
                <motion.li className={styles.tbtext1} animate={{ opacity:1 }} initial={{opacity:0}} transition={{duration:1}}  > Home </motion.li>
              </Link>
           </ul> 
           <img className={styles.logodesk} src="/assets/alleviate4.png" alt='' />
           <ul className={styles.tbdiv2i} >
               <Link href={`/profile`} >
                  <motion.li className={styles.tbtext4} animate={{ opacity:1 }} initial={{opacity:0}} transition={{delay:1.1}} > Profile </motion.li>
               </Link>
               { Object.keys(user).length > 0 &&  user.role === "advocate" && 
               <Link href={`/start_a_cause`} >
                  <motion.li className={styles.tbtext4} animate={{ opacity:1 }} initial={{opacity:0}} transition={{delay:1.1}}  > Start A Cause </motion.li>
               </Link> }
               { Object.keys(user).length > 0 &&  user.role === "giver" && 
              <Link href={`/charities_following`} >
                <motion.li className={styles.tbtext4} animate={{ opacity:1 }} initial={{opacity:0}} transition={{delay:1.1}}  > Charities following </motion.li>
              </Link> }
              
              <motion.li className={styles.tbtext3} animate={{ opacity:1 }} initial={{opacity:0}} transition={{delay:1.1}} onClick={removeCookie} > Log Out </motion.li>
           </ul> 
       </nav>
    </>
  )
}
