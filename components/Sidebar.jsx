import Image from 'next/image'
import styles from '@/styles/Sidebar.module.css'
import { useState, useEffect, useContext } from 'react'
import { Context } from './Context'
import CancelIcon from '@mui/icons-material/Cancel'
import {useRouter} from 'next/router'

export default function Sidebar () {
  const router = useRouter()
    const { sidebarmodal, setSideBarModal, isloggedin, removeCookie } = useContext(Context)


    const [ user, setUser ] = useState({})

    useEffect(() => {
      const firstName = JSON.parse(localStorage.getItem('userf') )
      const role = JSON.parse(localStorage.getItem('urole') )
      setUser({...user, firstName, role })
     }, []);
  
   

  return (
    <>
    {  sidebarmodal && 
     <>
      <div className={styles.darkbox}  >
      </div>
      <div className={styles.sidebarbox} >
         <div className={styles.sidebarnav}  >
            <CancelIcon className={styles.sidebarcancel} onClick={ () => { setSideBarModal(!sidebarmodal) } }  />
         </div>
         <ul className={styles.sidebaroption} >
         { isloggedin && <li className={styles.sidebartext}  onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/home') } } > Home </li> }
         { !isloggedin && <li className={styles.sidebartext}  onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/') } } > Home </li> }
          { isloggedin &&  <li className={styles.sidebartext} onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/profile') } } > Profile </li>  }
    
            { isloggedin && Object.keys(user).length > 0 &&  user.role === "advocate" &&
             <li className={styles.sidebartext}  onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/start_a_cause') } } > Start A Cause </li>
            }
            { isloggedin && Object.keys(user).length > 0 &&  user.role === "giver" &&
             <li className={styles.sidebartext}  onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/charities_following') } } > Charities following </li>
            } 
              <li className={styles.sidebartext} onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/mission') } } > Mission </li>
            <li className={styles.sidebartext} onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/vision') } } > Vision </li>
            <li className={styles.sidebartext} onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/our_heroes') } } > Our Heroes </li>
             { isloggedin && <li className={styles.sidebartext3} onClick={ removeCookie } > Log Out </li> } 
           {  !isloggedin && <li className={styles.sidebartext2} onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/signup') } } > Sign Up </li> }
           { !isloggedin  && <li className={styles.sidebartext3} onClick={ () => { setSideBarModal(!sidebarmodal); router.push('/login') } } > Log In </li> }
         </ul>
      </div>
      </> }
    </>
  )
}
