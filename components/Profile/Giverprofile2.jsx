import Image from 'next/image'
import styles from '@/styles/Profile2.module.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'

export default function Giverprofile2 ({ select2, setSelect2, user }) {

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
               <p className={ select2 === "following" ? styles.topmaindivabled : styles.topmaindivdisabled  } onClick={ () => { setSelect2("following") } } > Following </p>
               <p className={  select2 === "donationsmade" ? styles.topmaindivabled : styles.topmaindivdisabled  } onClick={ () => { setSelect2("donationsmade") } }  > Donations made </p>
            </div>

            { select2 === "following" &&  
            <div className={styles.columndiv} >
                 { user.cause_following.map( (cf) => (
                <Link className={styles.fifthmainb3cs} href={`/cause/${cf.cause}`} key={cf._id} >
                    <img className={styles.fifthmainimg} src={cf.cover_picture} alt="" />
                    <div className={styles.fifthmainb4} >
                        <h4 className={styles.fifthmainh} > {cf.cause} </h4>                
                    </div>
                </Link>     ) ) }  
            </div> }

            { select2 === "donationsmade" &&  
            <div className={styles.donorgenbox} > 
                     { user.donations_made.map( (d) => ( 
                    <div className={styles.donorbox} key={d._id} >
                        <div className={styles.datebox}  >
                           <p className={styles.dateboxp}  > {getDate(d.dateCreated)} </p>
                           <p className={styles.dateboxp} > {getHour(d.dateCreated)} </p>
                        </div>
                        <p className={styles.dateboxpname} > {d.cause} </p>
                        <p className={styles.dateboxamount} > ${d.amount.toLocaleString()} </p>
                    </div>    ) ) }      
               </div> }

       </div>
    </>
  )
}