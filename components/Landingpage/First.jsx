import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect, useContext } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function First () {

   const router = useRouter()

  return (
    <>
       <div className={styles.slider} >
           <figure className={styles.figure} >
               <div className={styles.img} >
                  <p className={styles.imgtext}  > Make a change today </p>
                  <img className={styles.img2} src="/assets/makeachange.jpg" alt="" />
                  <div className={styles.butt} >
                     <button className={styles.buttp} onClick={ () => { router.push(`/signup`) } } > Lend a hand </button>
                  </div>
               </div>
               <div className={styles.img} >
                  <p className={styles.imgtext}  > Everyone needs a helping hand </p>
                  <img className={styles.img2} src="/assets/lendinghand.jpg" alt="" />
                  <div className={styles.butt} >
                     <button className={styles.buttp}  onClick={ () => { router.push(`/signup`) } } > Lend a hand </button>
                  </div>
               </div>
               <div className={styles.img} >
                  <p className={styles.imgtext}  > Put a smile on someones face </p>
                  <img className={styles.img2} src="/assets/lesspriv1.jpg" alt="" />
                  <div className={styles.butt} >
                     <button className={styles.buttp}  onClick={ () => { router.push(`/signup`) } } > Lend a hand </button>
                  </div>
               </div>
               {/* <div className={styles.butt} >
                  <button className={styles.buttp} > Lend a hand </button>
               </div> */}
               
           </figure>
       </div>
    </>
  )
}
