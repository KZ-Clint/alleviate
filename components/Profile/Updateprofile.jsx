import Image from 'next/image'
import styles from '@/styles/Update.module.css'
import { useState, useEffect, useContext } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export default function Updateprofile ({ isupdate, setIsUpdate, userdata, file, setFile, handleChangeInput, handleUpdateProfile, user }) {
  const { bio, passionate_cause, experience } = userdata


  return (
    <>
    
            <div className={styles.loaderbox} onClick={ () => { setIsUpdate(!isupdate) } } >
            </div>  
        <div className={styles.genbox} >
            <div className={styles.genbox2} >
                <ArrowBackIosNewIcon className={styles.icon} onClick={ () => { setIsUpdate(!isupdate) } } />
                <p className={styles.genbox2h} > Update Profile</p>
            </div>
            <form className={styles.formbox} onSubmit={handleUpdateProfile} >
                  { user.user.role === "advocate" && 
                    <label className={styles.imglabel} htmlFor="profile_picture" >
                       <img className={styles.imgpics}  src={ file ? URL.createObjectURL(file) : user.user.profile_picture } alt="" />
                       <input style={{display:"none"}} type="file" id="profile_picture" accept=".png,.jpeg,.jpg" onChange={ (e) => setFile(e.target.files[0]) }  />
                    </label>  }
                    {  user.user.role === "advocate" &&  <textarea className={styles.formtextarea} name="experience" maxLength="201" placeholder='Experience as an advocate...' value={experience} onChange={handleChangeInput} />  }
                   {  user.user.role === "giver" &&  <textarea className={styles.formtextarea} name="passionate_cause" maxLength="201" placeholder='Passionate Cause...' value={passionate_cause} onChange={handleChangeInput} />  }
                    <textarea className={styles.formtextarea2} name="bio" maxLength="240" placeholder='Bio...' value={bio} onChange={handleChangeInput} />

                <div className={styles.buttonbox} >
                    <button className={styles.butt} type="submit" > Update </button>
                </div>
                
            </form>
        </div>   
        
    </>
  )
}