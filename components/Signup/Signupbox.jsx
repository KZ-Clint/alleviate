import Image from 'next/image'
import styles from '@/styles/Signup.module.css'
import { useState, useEffect, useContext } from 'react'
import Signupgiver from './Signupgiver'


export default function Signupbox ( { isCc, setIsCc, countryCode, ind, setInd, userdata, termsAndConditions, setTermsAndConditions, handleChangeInput, role, setRole, file, setFile, handleSubmit, success } ) {
  return (
    <>
      <div className={styles.box2} >
          <div className={styles.box2div1} >
              <p className={ role === "giver" ? styles.boxabled : styles.boxdisabled } onClick={ () => { setRole("giver") } } > Sign up as a giver </p>
              <p className={ role === "advocate" ? styles.boxabled2 : styles.boxdisabled} onClick={ () => { setRole("advocate") } } > Sign up as advocate </p>
          </div>
          <Signupgiver isCc={isCc} setIsCc={setIsCc} countryCode={countryCode} ind={ind} setInd={setInd} userdata={userdata} termsAndConditions={termsAndConditions} setTermsAndConditions={setTermsAndConditions} handleChangeInput={handleChangeInput} role={role}
          file={file} setFile={setFile} handleSubmit={handleSubmit} success={success} />
      </div>
    </>
  )
}
