import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Profile.module.css'
import Advocateprofile2 from '@/components/Profile/Advocateprofile2';
import { useState, useEffect, useContext } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import axios from 'axios'
import baseUrl from '@/components/Baseurl/baseUrl';
import { useRouter } from 'next/router';
import { Context } from '@/components/Context';
import Giverprofile2 from '@/components/Profile/Giverprofile2';

export default function Profileid ({user2, token}) {

   const router = useRouter()
   const [ select, setSelect ] = useState("causesstarted")
   const [ select2, setSelect2 ] = useState("following")
   const [ isupdate, setIsUpdate ] = useState(false)
   const { setGenLoading, setError1 } = useContext(Context)
   const [ advcause, setAdvcause ] = useState([])
   const [ user, setUser ] = useState({})


   useEffect( () => {
      if (router.isReady) { 
     const getSpecificUser = async() => {
      try {
          const res = await axios.get(`${baseUrl}/users/get/${router.query.id}`, {  headers: {
              'Authorization': `Bearer ${token} `
            }} )
          setUser(res.data.user, "user")
          setGenLoading(false)
          document.title =  `Profile/${router.query.id}`;
      } catch (error) {
          console.log({error})
          setGenLoading(false)
      } }  
     getSpecificUser() 
  }  
   },[router.isReady] )

   const getAmountDonated = (amount) => {
      const res = amount.reduce( (prev, amt) => {
          return prev + amt.amount
        },0)
     return res
  }

useEffect( () => {    
   if (router.isReady) { 
   const getAdvocateCreatedCause = async () => { 
      try {
         const res = await axios.get( `${baseUrl}/causes/get/advocate/${router.query.id}`, {  headers: {
           'Authorization': `Bearer ${token} `
         }}  )
         setAdvcause(res.data.cause, "advocate cause")
         setGenLoading(false)
      } 
      catch (error) {
        console.log(error)
        setGenLoading(false)
      } 
   } 
   getAdvocateCreatedCause()
}
 },[router.isReady] )
 


  return (
    <>
    {  Object.keys(user).length > 0 && 
      <div className={styles.dbe} > 
           <div className={styles.mainb1} >
              <img className={styles.oneimg} src="/assets/ashwhitebackground.jpg" alt="" />
              <div className={styles.secdiv} >
                { user.role === "advocate" && <img className={styles.profileimg} src={user.profile_picture} alt="" /> }
                {  user.role === "giver" &&  <div className={styles.profileimg2}> {user.firstName.charAt(0).toUpperCase()} </div>  }
                 <p className={styles.profilename} > {user.firstName} {user.lastName} </p>
              </div>
              <div className={styles.thirddiv} >
                 <p className={styles.thirddivp} > {user.bio} </p>
                 { user.role === "advocate" && <p className={styles.thirddivp2} > Experience: <span className={styles.thirddivp2span} > {user.experience}  </span> </p> }
                 { user.role === "giver" && <p className={styles.thirddivp2} > Passionate cause: <span className={styles.thirddivp2span} > {user.passionate_cause} </span> </p> }
              </div>
              <div className={styles.fourthdiv} >
                 <p className={styles.fourthdivp} > Email: <span className={styles.fourthdivspan} > { user2.user.email === user.email ? user.email : "*********"  } </span> </p>
                 <p className={styles.fourthdivp} > Mobile No: <span className={styles.fourthdivspan} > { user2.user._id === user._id ? `+${user.countryCode} ${user.mobileNo}`: "*********"  } </span> </p>
                 { user.role === "advocate" && <p className={styles.fourthdivp} > Causes Started: <span className={styles.fourthdivspan} > {user.cause_started.length} </span> </p> }
                 { user.role === "giver" &&
                 <>
                   <p className={styles.fourthdivp} > Amount Donated: <span className={styles.fourthdivspan} > ${getAmountDonated(user.donations_made).toLocaleString()} </span> </p>
                   <p className={styles.fourthdivp} > Following: <span className={styles.fourthdivspan} > {user.cause_following.length} </span> </p>   
                 </>   }              
                 <p className={styles.fourthdivp} > Authenticity: <span className={  user.authenticity === "excellent" ? styles.fourthdivspanexcell : user.authenticity === "good" ? styles.fourthdivspangood : user.authenticity === "poor" ? styles.fourthdivspanpoor : styles.fourthdivspan  } > 
                 { user.authenticity.charAt(0).toUpperCase()+user.authenticity.slice(1)} </span> </p>
              </div>
             { user.role === "giver" && <Giverprofile2 select2={select2} setSelect2={setSelect2} user={user} />  }
             {  user.role === "advocate" &&  <Advocateprofile2 select={select} setSelect={setSelect} advcause={advcause} /> }
           </div>
       </div> }
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
         user2: userData
       }
   } 
 }
 
 
