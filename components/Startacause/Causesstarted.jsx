import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Startacause.module.css'
import Link from 'next/link'


export default function Causesstarted2 ({advcauses}) {


  return (
    <>
           
              <div className={styles.startgenbox} >
                { advcauses.length < 1  ? 
                <p className={styles.nocause} > No causes started!! </p> :   
                 advcauses.map( (cause) => (                
                    <Link href={`/cause/${cause.cause_title}`} className={styles.startbox} key={cause._id} >           
                        <img className={styles.img} src={cause.cover_photo[0].url} alt="" /> 
                        <p className={styles.startboxpname} > {cause.cause_title} </p>
                        <div className={styles.startamtbox}  >
                           <p className={styles.startamtboxp} > Target amount </p> 
                           <p className={styles.startboxamount} > ${cause.target_amount.toLocaleString()} </p>
                        </div>
                    </Link>   ) ) 
                }
              </div>
    </>
  )
}