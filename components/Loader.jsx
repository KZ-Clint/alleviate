import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Loader.module.css'
import Link from 'next/link'
import { Context } from './Context'

export default function Loader () {
 
  const { genloading, setGenLoading } = useContext(Context)

  if(!genloading) {
     return
  }

  return (
    <>
       <div className={styles.loadermain} >
          <div className={styles.ldscircle}><div className={styles.div} ></div></div>
       </div>
    </>
  )
}