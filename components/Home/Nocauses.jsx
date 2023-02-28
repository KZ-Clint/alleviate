import Image from 'next/image'
import styles from '@/styles/Homepage.module.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Nocauses () {
  return (
    <>
       <div className={styles.topmain3} >
            <Link href={"/start_a_cause"} >
               <AddCircleIcon className={styles.topmain3icon} />
            </Link>
           <p className={styles.topmain3text} > Start a cause </p>
       </div>
    </>
  )
}