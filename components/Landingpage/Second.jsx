import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect, useContext } from 'react'


export default function Second () {
  return (
    <>
      <div className={styles.secondmainb}  >
         <h2 className={styles.secondmainhead} > How it works </h2>
         <div className={styles.secondmainb2} >
             <div className={styles.iconwrapper} >
                 <img className={styles.imgicon} src="/assets/signintoalleviate.jpg" alt="" />
                 <p className={styles.imgicontext} > Sign Up to Alleviate </p>
             </div>
             <div className={styles.iconwrapper} >
                 <img className={styles.imgicon} src="/assets/search1.jpg" alt="" />
                 <p className={styles.imgicontext} > Search or filter through any cause you are most passionate about </p>
             </div>
             <div className={styles.iconwrapper} >
                 <img className={styles.imgicon} src="/assets/lendahand2.jpg" alt="" />
                 <p className={styles.imgicontext} > Lend a hend </p>
             </div>
         </div>
      </div>
    </>
  )
}
