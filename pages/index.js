import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import First from '@/components/Landingpage/First'
import Second from '@/components/Landingpage/Second'
import Third from '@/components/Landingpage/Third'
import Fourth from '@/components/Landingpage/Fourth'
import Fifth from '@/components/Landingpage/Fifth'
import Sixth from '@/components/Landingpage/Sixth'
import axios from 'axios'
import baseUrl from '@/components/Baseurl/baseUrl'
import { useState, useEffect, useContext } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { Context } from '@/components/Context'

export default function Home() {

  const [ topprojects, setTopProjects ] = useState([])
  const [ skeleton1, setSkeleton1 ] = useState(false)
  const { setGenLoading } = useContext(Context)

  useEffect( () => {    
    const getTopProjects = async () => { 
      setSkeleton1(true)
      setGenLoading(false)
       try {
          const res = await axios.get( `${baseUrl}/causes/special` )
          setTopProjects(res.data.cause)      
          setSkeleton1(false)
          setGenLoading(false)
       } 
       catch (error) {
         console.log(error)
         setSkeleton1(false)
         setGenLoading(false)
       } 
    }
    getTopProjects()
  },[] )

  return (
    <>
      <Head>
        <title> Landing Page </title>
      </Head>

       {/* <div className={styles.slider} >
           <figure className={styles.figure} >
               <img className={styles.img} src="/assets/alleviate1.jpg" alt="" />
               <img className={styles.img} src="/assets/alleviate2.jpg" alt="" />
               <img className={styles.img} src="/assets/alleviate3.jpg" alt="" />
           </figure>
       </div> */}
       <div className={styles.agh} > 
           <First/>
           <Second/>
           <Third/>
           <Fourth/>
           <Fifth skeleton1={skeleton1} topprojects={topprojects} />
           <Sixth/>
       </div>
    </>
  )
}


export function getServerSideProps ({req,res}) {
  let tokenReq= {}
  if(req.cookies.token){
      tokenReq=JSON.parse(req.cookies.token)
      return {
        redirect:{
          permanent:false,
          destination:"/home"
        }
      }
  } 
  return {
      props: { token: tokenReq }
  }
}