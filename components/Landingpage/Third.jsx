import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect, useContext } from 'react'


export default function Third () {
  return (
    <>
      <div className={styles.thirdmainb} >
          <p className={styles.thirdmainhead} > What does Alleviate do? </p>
          <p className={styles.thirdmaintext} > Alleviate offers a platform that connects pasionate givers and passionate causes </p>
      </div> 
    </>
  )
}
