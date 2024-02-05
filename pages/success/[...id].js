import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Success.module.css'
import Link from 'next/link'
import axios from 'axios'
import { Context } from '@/components/Context'
import baseUrl from '@/components/Baseurl/baseUrl';
import { useRouter } from 'next/router';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Success () {

  const { setGenLoading, setError1 } = useContext(Context)
  const router = useRouter()
  console.log(router)

  useEffect( () => {
   setGenLoading(true)
    if (router.isReady) { 
      const stripeValidateDonation = async() => {
      try {
         const res = await axios.put( `${baseUrl}/causes/stripe/donate/cause/${router.query.id[0]}/${router.query.id[1]}/${router.query.id[2]}`, null )
         console.log(res)
         setGenLoading(false)
      } catch (error) {
         console.log({error})
         setGenLoading(false)
      } }  
      stripeValidateDonation() 
   }  
 },[router.isReady] )

  return (
    <>
       <div className={styles.success_box} >
            <div className={styles.genbox} >
               <FavoriteIcon className={styles.favricon} style={{ width:'170px', height:'170px' }}  />
               <p className={styles.posttext} > Thank you, you just made the world to a million lives  </p>
               <button className={styles.butt} onClick={ () => {  router.push('/home') } } > Home </button> 
            </div>
       </div>
    </>
  )
}

Success.getLayout = function PageLayout(page) {
    return (
      <>
       {page}
      </>
    )
 }


//  export async function getServerSideProps ({req,res}) {
  
//    let tokenReq;

//    if(req.cookies.token){
//        tokenReq=JSON.parse(req.cookies.token)     
//    } else {
//      return {
//        redirect:{
//          permanent:false,
//          destination:"/"
//        }
//      }
//    }

//    return {
//        props: {
//          token: tokenReq 
//        }
//    } 
//  }
