import Image from 'next/image'
import styles from '@/styles/Donors.module.css'
import { useState, useEffect, useContext } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import  Rating  from '@mui/material/Rating';
import Slider from '@mui/material/Slider';


export default function Donors ({ isdonors, setIsDonors, cause, getRating }) {

    const getDate = (createdAt) => {
        var created = createdAt
        var date = new Date(created)
       return (date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear())
    }
    const getHour = (createdAt) => {
        var created = createdAt
        var date = new Date(created)
       return (date.getHours() +  ":" + date.getMinutes() + ":" + date.getSeconds())
    }


  return (
    <>
    
            <div className={styles.loaderbox} onClick={ () => { setIsDonors(!isdonors) } }  >
            </div>  
        <div className={styles.genbox} >
           <div className={styles.divbox1} >
               <ArrowBackIosNewIcon  className={styles.arrowback} onClick={ () => { setIsDonors(!isdonors) } }  /> 
               <h2 className={styles.divboxh} > {cause.cause_title} </h2>
           </div>
           <div className={styles.divbox2} >
               <div className={styles.divbox2metricbox} >
                   <div className={styles.metricbox} >
                      <h4 className={styles.metricboxh} > Target  </h4>
                      <p className={styles.metricboxp} > ${cause.target_amount.toLocaleString()} </p>
                   </div>
                   <div className={styles.metricbox}  >
                      <h4 className={styles.metricboxh}  > Amount Raised </h4>
                      <p className={styles.metricboxp} > ${cause.amount_received.toLocaleString()} </p>
                   </div>
                   <div className={styles.metricbox} >
                      <h4 className={styles.metricboxh} > Rating </h4>
                      <Rating className={styles.idbox5rating}  name="half-rating-read" defaultValue={getRating(cause.rating)} precision={0.5} readOnly />
                   </div>
               </div>
               <div className={styles.sliderbox}  >
                    <Slider className={styles.muislider2}  
                                        size="small"                      
                                        aria-label="Small"
                                        defaultValue={cause.amount_received}
                                        min={0}
                                        max={cause.target_amount}               
                        />
               </div>
               <div className={styles.donorgenbox} > 
                   { cause.donations_received.map( (donation, index) => (
                    <div className={styles.donorbox} key={donation._id} >
                        <div className={styles.datebox}  >
                           <p className={styles.dateboxp}  > {getDate(donation.dateCreated)} </p>
                           <p className={styles.dateboxp} > {getHour(donation.dateCreated)} </p>
                        </div>
                        <p className={styles.dateboxpname} > {donation.donor_name} </p>
                        <p className={styles.dateboxamount} > ${donation.amount.toLocaleString()} </p>
                    </div>
                        ) ) }
               </div>
           </div>    
        </div>   
        
    </>
  )
}