import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Signup.module.css'
import Loginbox from '@/components/Login/Loginbox'
import Link from 'next/link'
import axios from 'axios'
import {useRouter} from 'next/router'
import { Context } from '@/components/Context'
import baseUrl from '@/components/Baseurl/baseUrl'

export default function Login () {
  
     const { error1, setError1, setGenLoading, setIsLoggedIn } = useContext(Context)
     const router = useRouter()
     const initialState = {  email: '', password: '' }
     const [ userdata, setUserData ] = useState(initialState)

    const handleChangeInput = (e) => {
      const {name, value} = e.target
      setUserData({...userdata, [name] : value })  
    }

    useEffect( () => {    
      setGenLoading(false)
    },[] )

    const handleSubmit = async (e) => {
      setGenLoading(true)
      e.preventDefault()
     try{
      const res = await axios.post( `${baseUrl}/users/login`, userdata )
      localStorage.setItem('userf', JSON.stringify(res.data.user.firstName))
      localStorage.setItem('userl', JSON.stringify(res.data.user.lastName))
      localStorage.setItem('urole', JSON.stringify(res.data.user.role))
      if(res.data.user.role === "advocate"){
        localStorage.setItem('upics', JSON.stringify(res.data.user.profile_picture))
      }
    
      const toke =  await axios.post("/api/login",{
          token: res.data.access_token   
      }) 
      router.push("/home")
      setIsLoggedIn(true)
      setGenLoading(false)
      }
     catch (error) {
      setGenLoading(false)
      console.log({error})     
      setError1(error.response.data.error)
     }
  }

  return (
    <>
      <Head>
        <title> Login </title>
      </Head>
     
       <div className={styles.ldx} > 
            <div className={styles.box1} > 
                <div className={styles.box1div1} >
                  <Link href={'/'} >
                    <img className={styles.box1div1img} src="/assets/alleviate4.png" alt="" />
                  </Link>  
                    <img className={styles.box1div1img2} src="/assets/handsshakeart.png" alt="" />
                </div>
                <Loginbox userdata={userdata} handleChangeInput={handleChangeInput} handleSubmit={handleSubmit} />
            </div>
        </div> 
    </>
  )
}

Login.getLayout = function PageLayout(page) {
    return (
      <>
       {page}
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
          destination:"/"
        }
      }
  } 
  return {
      props: { token: tokenReq }
  }

}