import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Homepage.module.css'
import Topprojects from '@/components/Home/Topprojects'
import Causesstarted from '@/components/Home/Causesstarted'
import Nocauses from '@/components/Home/Nocauses'
import Browsecategory from '@/components/Home/Browsecategory'
import baseUrl from '@/components/Baseurl/baseUrl'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Context } from '@/components/Context'


export default function Homepage ({user, token}) {

  const [ topprojects, setTopProjects ] = useState([])
  const [ advcause, setAdvCause ] = useState([])
  const { setGenLoading } = useContext(Context)

  useEffect( () => {    
    const getTopProjects = async () => { 

       try {
          const res = await axios.get( `${baseUrl}/causes/special` )
          setTopProjects(res.data.cause)
          setGenLoading(false)
       } 
       catch (error) {
         console.log(error)
         setGenLoading(false)
       } 
    }
    getTopProjects()
  },[] )

  useEffect( () => {    
    if( user.user.role === "advocate" ) { 
    const getAdvocateCreatedCause = async () => { 
   
       try {
          const res = await axios.get( `${baseUrl}/causes/cause/advocate`, {  headers: {
            'Authorization': `Bearer ${token} `
          }}  )
          setAdvCause(res.data.cause)
          setGenLoading(false)
       } 
       catch (error) {
         console.log(error)
         setGenLoading(false)
       } 
    } 
    getAdvocateCreatedCause()
  }
  },[] )
  
  return (
    <>
      <Head>
        <title> Home </title>
      </Head>

       <div className={styles.agh} > 
           <div className={styles.mainb1}  >
               { topprojects.length > 0 &&  <Topprojects topprojects={topprojects} /> }
               { advcause.length > 0 && user.user.role === "advocate"  &&   <Causesstarted advcause={advcause} />  }
               {  advcause.length < 1 && user.user.role === "advocate" &&  <Nocauses/> }
               {  user.user.role === "giver" && <Browsecategory/> }
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


  return {
      props: {
        token: tokenReq ,
        user: userData
      }
  }

}

