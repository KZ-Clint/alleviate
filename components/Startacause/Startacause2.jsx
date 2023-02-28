import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Startacause2.module.css'
import Link from 'next/link'
import CancelIcon from '@mui/icons-material/Cancel'
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function Startacause2 ({ handleUploadInput, file, deleteImage, Category, iscategory, setIsCategory, catindex, setCatIndex, deadline, setDeadline, causedata, handleChangeInput, handleCreateCause }) {
    const { cause_title, target_amount, story, solution, acc_number, bank, social_link, web_link } = causedata

  return (
    <>
      { iscategory && 
                      <>
                      <div className={styles.loaderbox} onClick={ () => { setIsCategory(!iscategory) } } >
                      </div>  
                      <div className={styles.categorybox2} >
                                  { Category.map( (c, index) => (
                                    <p className={ index === catindex ? styles.categorypabled : styles.categoryp}  key={c.category} onClick={ () => { setCatIndex(index); setIsCategory(!iscategory) } } > {c.category} </p>
                                    ) ) }            
                      </div>  
                      </>
                }
        <form className={styles.startformbox} onSubmit={handleCreateCause} >                    
            <label className={ styles.imglabel } htmlFor="cover_picture" >
                 <p className={ styles.labelp} > Add pictures</p>
                { file.length < 1 && <img className={styles.imgpic}  src="/assets/nopics.jpg" alt="" /> }      
                <input className={styles.imginp} style={{display:"none"}} type="file" id="cover_picture" accept=".png,.jpeg,.jpg" multiple onChange={handleUploadInput}  />
            </label> 
            <div className={styles.filebox} >
              { file.length > 0 &&
                  <div className={styles.formdiv1} >
                    { file.map( (f, index) => (
                        <div className={styles.formdiv2}  key={index} >
                          <img className={styles.imgpics}  src={  URL.createObjectURL(f)  } alt="" />
                          <CancelIcon className={styles.iconcancel} onClick={ () => { deleteImage(index) } } />                 
                        </div>      
                    ) ) }
                  </div>
                }
              </div>
              <input className={styles.forminput} type="text" name="cause_title" placeholder='Title...' maxLength="70" value={cause_title} onChange={handleChangeInput} />
              <div className={styles.breakbox} >
                  <div className={styles.categorybox} onClick={ () => { setIsCategory(!iscategory) } } > { catindex ? Category[catindex].category : "Select category..."  } { catindex && <span className={styles.spanicon} > <DoneAllIcon className={styles.iconspan} /> </span> }  </div>
              
                <input className={styles.forminput} type="number" name="target_amount" placeholder='Target...' value={target_amount} onChange={handleChangeInput} />
             </div>
             <textarea className={styles.formtextarea} name="story"  maxLength="1500" placeholder='Story...' value={story} onChange={handleChangeInput} /> 
             <textarea className={styles.formtextarea} name="solution"  maxLength="1500" placeholder='Solution...' value={solution} onChange={handleChangeInput} />  
             <div className={styles.deadlinebox}  >
                <label className={styles.datelabel} htmlFor="deadline" > Deadline  </label> 
                <input className={styles.forminput} type="date" id="deadline" name="deadline"  value={deadline} onChange={ (e) => { setDeadline(e.target.value) } } />
             </div>
             <input className={styles.forminput} type="number" name="acc_number" placeholder='Acc Number...' value={acc_number} onChange={handleChangeInput} />
             <input className={styles.forminput} type="text" name="bank" placeholder='Bank...' value={bank} onChange={handleChangeInput} />
             <input className={styles.forminputlink} type="text" name="social_link" placeholder='Social media link...' value={social_link} onChange={handleChangeInput} />
             <input className={styles.forminputlink} type="text" name="web_link" placeholder='Website link...' value={web_link} onChange={handleChangeInput} />
             <div className={styles.buttdiv} >
                 <button className={styles.butt} type="submit" > Create </button>
             </div>
        </form>

    </>
  )
}