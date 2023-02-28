import Image from 'next/image'
import styles from '@/styles/Categoryid.module.css'
import { useState, useEffect, useContext } from 'react'
import Slider from '@mui/material/Slider';
import Link from 'next/link'

export default function Causecategory ({causes, handleLoadMore}) {
  return (
    <>
        <div className={styles.columndiv} >
            { causes.map( (cause) => ( 

                <Link href={`/cause/${cause.cause_title}`} className={styles.fifthmainb3cs} key={cause._id} >
                    <img className={styles.fifthmainimg} src={cause.cover_photo[0].url} alt="" />
                    <div className={styles.fifthmainb4} >
                        <h4 className={styles.fifthmainh} > {cause.cause_title} </h4>
                        <p className={styles.fifthmaintext} > Founder: <span className={styles.fifthmainspan} > {cause.founderName} </span> </p>
                        <div className={styles.fifthmainb5} >
                        <p className={styles.fifthmaintext} > Amount Donated: <span className={styles.fifthmainspan} > ${cause.amount_received} </span> </p>
                        <Slider className={styles.slider2}  
                                size="small"                      
                                aria-label="Small"
                                defaultValue={cause.amount_received}
                                min={0}
                                max={cause.target_amount}                        
                            />
                        </div>
                        <p className={styles.fifthmaintext} > Authenticity: <span className={  cause.authenticity === "excellent" ? styles.fifthmainspanexcell : cause.authenticity === "good" ? styles.fifthmainspangood : cause.authenticity === "poor" ? styles.fifthmainspanpoor : styles.fifthmainspan} > 
                        {cause.authenticity.charAt(0).toUpperCase()+cause.authenticity.slice(1)} </span> </p>
                     
                    </div>
                 </Link>   ) ) }
              
        </div>
    </>
  )
}
