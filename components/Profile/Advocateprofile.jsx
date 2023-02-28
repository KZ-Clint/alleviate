import Image from 'next/image'
import styles from '@/styles/Profile2.module.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'

export default function Advocateprofile ( { select, setSelect, advcause } ) {

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
     <div className={styles.topmain2} >
            <div className={styles.topmaindiv} >
               <p className={ select === "causesstarted" ? styles.topmaindivabled : styles.topmaindivdisabled } onClick={ () => { setSelect("causesstarted") } } > Causes started </p>
               <p className={ select === "donationsgotten" ?  styles.topmaindivabled : styles.topmaindivdisabled} onClick={ () => { setSelect("donationsgotten") } } > Donations gotten </p>
            </div>
          
          { select === "causesstarted" &&  
            <div className={styles.columndiv} >
                { advcause.length > 0 && advcause.map( (cause) => (
                    <Link className={styles.fifthmainb3cs}  href={`/cause/${cause.cause_title}`} key={cause._id} >
                        <img className={styles.fifthmainimg} src={cause.cover_photo[0].url} alt="" />
                        <div className={styles.fifthmainb4} >
                            <h4 className={styles.fifthmainh} > {cause.cause_title} </h4>                
                        </div>
                    </Link>
                ) ) }

            </div>  }

           {  select === "donationsgotten" &&
            <div className={styles.donorgenbox} > 
                   { advcause.map( (cause) => ( 
                    <div className={styles.key} key={cause._id} >
                   {  cause.donations_received.map( (donor) => (
                    <div className={styles.donorbox} key={donor._id} >
                        <div className={styles.datebox}  >
                           <p className={styles.dateboxp}  > {getDate(donor.dateCreated)} </p>
                           <p className={styles.dateboxp} > {getHour(donor.dateCreated)} </p>
                        </div>
                        <p className={styles.dateboxpname} >{cause.cause_title} </p>
                        <p className={styles.dateboxamount} > ${donor.amount.toLocaleString()} </p>
                    </div>  ) ) }
                    </div>
                   ) ) }
             
               </div> }


 
       </div>
    </>
  )
}