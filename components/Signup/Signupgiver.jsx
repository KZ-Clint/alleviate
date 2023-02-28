import Image from 'next/image'
import styles from '@/styles/Signup.module.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'


export default function Signupgiver ( {  isCc, setIsCc, countryCode, ind, setInd, userdata, termsAndConditions, setTermsAndConditions, handleChangeInput, role, file, setFile, handleSubmit, success } ) {

  const { firstName, lastName, email, mobileNo, bio, passionate_cause, password, cf_password, experience } = userdata

  return (
    <>
      <form className={styles.formbox} onSubmit={handleSubmit} >
          <input className={styles.forminput} type="text" id="firstName" name="firstName" placeholder="First Name..." value={firstName} onChange={handleChangeInput} />
          <input className={styles.forminput} type="text" id="lastName" name="lastName" placeholder="Last Name..." value={lastName} onChange={handleChangeInput} />
          <input className={styles.forminput} type="email" id="email" name="email" placeholder="Email..." value={email} onChange={handleChangeInput} />
          <div  className={styles.formdiv1} >
             <div className={styles.formdiv1div1} onClick={ () => { setIsCc(!isCc) } } >  +{ ind  ? countryCode[ind].code : countryCode[0].code } </div>
             
             { isCc &&
             <div className={styles.formdiv1div2} >
               {  countryCode.map(  (cc, index) => (
                    <div className={styles.group}  key={cc.code} onClick={ () => { setInd(index); setIsCc(!isCc) } } >
                      <div className={styles.formdiv1div2div1} key={cc.code} > +{cc.code}  </div>
                      <p className={styles.formccspan}  > {cc.country} </p>
                    </div>
                ) ) }
             </div> }
             <input className={styles.forminput} type="number" id="mobileNo" name="mobileNo" placeholder="Mobile No..." value={mobileNo} onChange={handleChangeInput} />
           </div>
            { role === "advocate"  &&  <textarea className={styles.formtextarea} name="experience" maxLength="201" placeholder='Experience as an advocate...' value={experience} onChange={handleChangeInput} /> }
            {  role === "giver" && <textarea className={styles.formtextarea} name="passionate_cause" maxLength="201" placeholder='Passionate Cause...' value={passionate_cause} onChange={handleChangeInput} />  }
           <textarea className={styles.formtextarea2} name="bio" maxLength="300" placeholder='Bio...' value={bio} onChange={handleChangeInput} />
          
           { role === "advocate" && 
           <label className={styles.imglabel} htmlFor="profile_picture" >
               <img className={styles.imgpics}  src={ file ? URL.createObjectURL(file) : "assets/nopics.jpg" } alt="" />
               <input style={{display:"none"}} type="file" id="profile_picture" accept=".png,.jpeg,.jpg" onChange={ (e) => setFile(e.target.files[0]) }  />
           </label> }

           <input className={styles.forminput} type="password" id="password" name="password" placeholder="Password..." value={password} onChange={handleChangeInput} />
           <input className={styles.forminput} type="password" id="cf_password" name="cf_password" placeholder="Confirm Password..." value={cf_password} onChange={handleChangeInput} />
           { success && success }
           <div className={styles.formdiv2} >
               <input className={styles.formdiv2check} type='checkbox' checked={termsAndConditions} onChange={ (e) => { setTermsAndConditions(!termsAndConditions) } } /> 
               <div className={styles.formdiv2checkdiv} > I agree to Alleviate 
                    <Link href={"/terms_and_conditions"}
                         target="_blank" className={styles.checkboxtp}> Terms and Conditions
                    </Link>
                    &nbsp;  and 
                    <Link href={"/privacy_policy"}
                         target="_blank" className={styles.checkboxtp}> Privacy Policy
                    </Link>
                </div>
           </div>
           <div className={styles.buttonbox} >
              <button className={styles.butt} type="submit" > Sign Up </button>
           </div>
           <p className={styles.captionp} > Already have an account?
              <Link href={"/login"}> 
                 <span className={styles.captionpblue} > Login </span> 
              </Link>
            </p>
      </form>
    </> 
  )
}
