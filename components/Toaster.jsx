import Image from 'next/image'
import styles from '@/styles/Toaster.module.css'
import { useState, useEffect, useContext } from 'react'
import { Context } from './Context'
import CancelIcon from '@mui/icons-material/Cancel'

export default function Toaster () {

    const { error1, setError1 } = useContext(Context)

    useEffect( () => {
        setTimeout( () => {
          setError1(null)
        },2000 )
      },[error1] )

  return (
    <>
       { error1 && 
        <div className={styles.toasterbox} >
            <p className={styles.toastererrorp} > {error1} </p>
        </div>
     }
    </>
  )
}
