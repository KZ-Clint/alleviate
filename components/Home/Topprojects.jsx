import Image from 'next/image'
import styles from '@/styles/Homepage.module.css'
import { useState, useEffect, useContext } from 'react'
import Slider from '@mui/material/Slider';
import Link from 'next/link';

export default function Topprojects ({topprojects}) {
  return (
    <>
    <div className={styles.topmain} >
       <p className={styles.topp} > Top Projects </p>
       <div className={styles.slider} >
           <figure className={styles.figure} >
               <div className={styles.divtp} >
                    <div className={styles.fifthmainb3} >
                        <img className={styles.fifthmainimg} src={topprojects[0].cover_photo[0].url } alt="" />
                        <div className={styles.fifthmainb4} >
                            <h4 className={styles.fifthmainh} > {topprojects[0].cause_title }  </h4>
                            <p className={styles.fifthmaintext} > Founder: <span className={styles.fifthmainspan} > {topprojects[0].founderName } </span> </p>
                            <div className={styles.fifthmainb5} >
                            <p className={styles.fifthmaintext} > Amount Donated: <span className={styles.fifthmainspan} >  ${topprojects[0].amount_received.toLocaleString() } </span> </p>
                            <Slider className={styles.slider2}  
                                    size="small"                      
                                    aria-label="Small"
                                    defaultValue={topprojects[0].amount_received}
                                    min={0}
                                    max={topprojects[0].target_amount}                        
                                />
                            </div>
                            <p className={styles.fifthmaintext} > Authenticity: <span className={  topprojects[0].authenticity === "excellent" ? styles.fifthmainspanexc : topprojects[0].authenticity === "good" ? styles.fifthmainspangood : topprojects[0].authenticity === "poor" ? styles.fifthmainspanpoor : styles.fifthmainspan } > 
                            {topprojects[0].authenticity.charAt(0).toUpperCase()+topprojects[0].authenticity.slice(1)} </span> </p>
                            <Link href={`/cause/${topprojects[0].cause_title}`} className={styles.fifthmainrm} > 
                              Read More 
                            </Link>
                        </div>
                    </div>
               </div>

               <div className={styles.divtp} >
                    <div className={styles.fifthmainb3} >
                        <img className={styles.fifthmainimg} src={topprojects[1].cover_photo[0].url } alt="" />
                        <div className={styles.fifthmainb4} >
                            <h4 className={styles.fifthmainh} > {topprojects[1].cause_title }  </h4>
                            <p className={styles.fifthmaintext} > Founder: <span className={styles.fifthmainspan} > {topprojects[1].founderName } </span> </p>
                            <div className={styles.fifthmainb5} >
                            <p className={styles.fifthmaintext} > Amount Donated: <span className={styles.fifthmainspan} >  ${topprojects[1].amount_received.toLocaleString() } </span> </p>
                            <Slider className={styles.slider2}  
                                    size="small"                      
                                    aria-label="Small"
                                    defaultValue={topprojects[1].amount_received}
                                    min={0}
                                    max={topprojects[1].target_amount}                        
                                />
                            </div>
                            <p className={styles.fifthmaintext} > Authenticity: <span className={  topprojects[1].authenticity === "excellent" ? styles.fifthmainspanexc : topprojects[1].authenticity === "good" ? styles.fifthmainspangood : topprojects[1].authenticity === "poor" ? styles.fifthmainspanpoor : styles.fifthmainspan } > 
                            {topprojects[1].authenticity.charAt(0).toUpperCase()+topprojects[1].authenticity.slice(1)} </span> </p>
                            <Link href={`/cause/${topprojects[1].cause_title}`} className={styles.fifthmainrm} > 
                              Read More 
                            </Link>
                        </div>
                    </div>
               </div>

               <div className={styles.divtp} >
                    <div className={styles.fifthmainb3} >
                        <img className={styles.fifthmainimg} src={topprojects[2].cover_photo[0].url } alt="" />
                        <div className={styles.fifthmainb4} >
                            <h4 className={styles.fifthmainh} > {topprojects[2].cause_title }  </h4>
                            <p className={styles.fifthmaintext} > Founder: <span className={styles.fifthmainspan} > {topprojects[2].founderName } </span> </p>
                            <div className={styles.fifthmainb5} >
                            <p className={styles.fifthmaintext} > Amount Donated: <span className={styles.fifthmainspan} >  ${topprojects[2].amount_received.toLocaleString() } </span> </p>
                            <Slider className={styles.slider2}  
                                    size="small"                      
                                    aria-label="Small"
                                    defaultValue={topprojects[2].amount_received}
                                    min={0}
                                    max={topprojects[2].target_amount}                        
                                />
                            </div>
                            <p className={styles.fifthmaintext} > Authenticity: <span className={  topprojects[2].authenticity === "excellent" ? styles.fifthmainspanexc : topprojects[2].authenticity === "good" ? styles.fifthmainspangood : topprojects[2].authenticity === "poor" ? styles.fifthmainspanpoor : styles.fifthmainspan } > 
                            {topprojects[2].authenticity.charAt(0).toUpperCase()+topprojects[2].authenticity.slice(1)} </span> </p>
                            <Link href={`/cause/${topprojects[2].cause_title}`} className={styles.fifthmainrm} > 
                              Read More 
                            </Link>
                        </div>
                    </div>
               </div> 
               
           </figure>
        </div>
       </div>
    </>
  )
}
