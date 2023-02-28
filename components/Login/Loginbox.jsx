import Image from 'next/image'
import styles from '@/styles/Signup.module.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'


export default function Loginbox ( {  userdata, handleChangeInput, handleSubmit} ) {

   const { email, password } = userdata

  return (
    <>
      <div className={styles.box2} >
          <div className={styles.box2div1} >
             <p className={styles.box2div1login} > Login </p>
          </div>
          <form className={styles.formbox} onSubmit={handleSubmit} >
         
          <input className={styles.forminput} type="email" id="email" name="email" placeholder="Email..." value={email} onChange={handleChangeInput} />
         

           <input className={styles.forminput} type="password" id="password" name="password" placeholder="Password..." value={password} onChange={handleChangeInput} />
          
           <div className={styles.buttonbox} >
              <button className={styles.butt} type="submit" > Login </button>
           </div>
           <p className={styles.captionp} > Do not have an account?
              <Link href={"/signup"}> 
                 <span className={styles.captionpblue} > Sign Up </span> 
              </Link>
            </p>
      </form>
      </div>
    </>
  )
}
