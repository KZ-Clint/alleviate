import Image from 'next/image'
import styles from '@/styles/Donate.module.css'
import { useState, useEffect, useContext } from 'react'
import  Rating  from '@mui/material/Rating';

export default function Rate ({ rateClick, setRateClick, value,setValue, labels, rateCause }) {

  return (
    <>
    
        <div className={styles.loaderbox} onClick={ () => { setRateClick(!rateClick) } } >
        </div>
         
         <div className={styles.genbox} >
         <Rating  className={styles.ratingbox}
            name="simple-controlled"
            size="big"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            />
           <p className={ labels[value] == "Excellent+" || labels[value] == "Excellent" || labels[value] == "Good+" ? styles.ratetextgreen : 
           labels[value] == "Good" || labels[value] == "Ok+" || labels[value] == "Ok" ?  styles.ratetextyellow : styles.ratetextred } 
           > {labels[value]} </p>
           <div className={styles.ratediv} >
              <button className={ styles.ratebutt} onClick={rateCause} > Rate </button>
           </div>
         </div>
    </>
  )
}
