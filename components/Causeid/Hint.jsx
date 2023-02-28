import Image from 'next/image'
import styles from '@/styles/Hint.module.css'
import { useState, useEffect, useContext } from 'react'


export default function Hint () {
  return (
    <>
      <div className={styles.div1} >
          <p className={styles.divp} > There is lack of clarity and uncertainty regarding this cause!! </p>
      </div> 
    </>
  )
}
