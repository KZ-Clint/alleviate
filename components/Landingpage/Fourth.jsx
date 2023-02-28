import Image from 'next/image'
import styles from '@/styles/Fourth.module.css'
import { useState, useEffect, useContext } from 'react'


export default function Fourth () {
  return (
    <>
      <div className={styles.fourthmainb}  >
         <h2 className={styles.fourthmainhead} > How does it do that? </h2>
         <div className={styles.fourthmainb2} >
             <div className={styles.iconwrapper} >
                 <img className={styles.imgicon2} src="/assets/wallet.jpg" alt="" />
                 <p className={styles.imgicontext2} > After lending, the money goes to alleviate </p>
             </div>
             <div className={styles.iconwrapper} >
                 <img className={styles.imgicon2} src="/assets/fingerprint.png" alt="" />
                 <p className={styles.imgicontext2i} > Alleviate then ensures that the cause being donated to is authentic and meets all satisfactory requirements through conducting its own research </p>
             </div>
             <div className={styles.iconwrapper} >
                 <img className={styles.imgicon2} src="/assets/verify1.jpg" alt="" />
                 <p className={styles.imgicontext2} > If it does then the amount donated goes straight to the cause </p>
             </div>
             <div className={styles.iconwrapper} >
                 <img className={styles.imgicon2} src="/assets/cancel1.png" alt="" />
                 <p className={styles.imgicontext2} > If it doesnt, alleviate returns the money back to the giver </p>
             </div>
         </div>
      </div>
    </>
  )
}
