import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Charitiesfollowing.module.css'
import Link from 'next/link'
import axios from 'axios'
import baseUrl from '@/components/Baseurl/baseUrl';
import { Context } from '@/components/Context'

export default function Charitiesfollowing ({ token, user }) {

   const { setGenLoading } = useContext(Context)
   const [ causes, setCauses ] = useState([])
   useEffect( () => {
     const getCauseFollowing = async() => {
      try {
          const res = await axios.get(`${baseUrl}/causes/getcause/following/${user.user._id}`, {  headers: {
              'Authorization': `Bearer ${token} `
            }} )
          setCauses(res.data.cause)
          setGenLoading(false)
      } catch (error) {
          console.log({error})
          setGenLoading(false)
      } }  
     getCauseFollowing() 
   },[] )


  return (
    <>
      <Head>
        <title> Charities following  </title>
      </Head>
       <div className={styles.jdi} >
          <div className={styles.gendiv1} >
              <div className={styles.topdiv} >
                 <img className={styles.oneimg} src="/assets/makeachange.jpg" alt="" />
                 <div className={styles.headingbox} >
                    <h2 className={styles.htext} > Charities following </h2>
                 </div>         
              </div>
              <div className={styles.followgenbox} > 
                    { causes.map( (cause) => (
                    <Link href={`/cause/${cause.cause_title}`} className={styles.followbox} key={cause._id}  >           
                        <img className={styles.img} src={cause.cover_photo[0].url} alt="" /> 
                        <p className={styles.followboxpname} > {cause.cause_title} </p>
                        <div className={styles.followamtbox} >
                           <p className={styles.followamtboxp} > Target amount </p> 
                           <p className={styles.followboxamount} > ${cause.target_amount.toLocaleString()} </p>
                        </div>
                    </Link>  ) ) }           
              </div>
          </div>
       </div>
    </>
  )
}

export async function getServerSideProps ({req,res}) {
   let tokenReq= {}
   let userData ={}
   if(req.cookies.token){
       tokenReq=JSON.parse(req.cookies.token)     
   } else {
     return {
       redirect:{
         permanent:false,
         destination:"/"
       }
     }
   }
  if (Object.keys(tokenReq).length > 0 ) {
   const response = await fetch( `${baseUrl}/users/loggeduser`, {  headers: {
     'Authorization': `Bearer ${tokenReq} `
   }})
    userData = await response.json()
  }  
  
   if ( Object.keys(userData).length > 0 &&  userData.user.role === 'advocate' ) {
  return {
    redirect:{
      permanent:false,
      destination:"start_a_cause"
    }}
 }
 
   return {
       props: {
         token: tokenReq ,
         user: userData
       }
   } 
 }

