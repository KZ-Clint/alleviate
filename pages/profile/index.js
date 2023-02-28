import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Profile.module.css'
import EditIcon from '@mui/icons-material/Edit';
import Giverprofile from '@/components/Profile/Giverprofile';
import Advocateprofile from '@/components/Profile/Advocateprofile';
import { useState, useEffect, useContext } from 'react'
import Updateprofile from '@/components/Profile/Updateprofile';
import axios from 'axios'
import baseUrl from '@/components/Baseurl/baseUrl';
import { Context } from '@/components/Context';
import { ImageUpload } from '@/components/Imageupload/imageUpload';


export default function Profile ({ user, token, CUP, CN, CA }) {
  
   const { setGenLoading, setError1 } = useContext(Context)
   const [ select, setSelect ] = useState("causesstarted")
   const [ select2, setSelect2 ] = useState("following")
   const [ isupdate, setIsUpdate ] = useState(false)
   const [ advcause, setAdvcause ] = useState([])

   const initialState = { bio: user.user.bio, passionate_cause: user.user.passionate_cause, experience:user.user.experience }
   const initialState2 = { bio: "", passionate_cause: "", experience:"" }
   const [ userdata, setUserData ] = useState(initialState)
   const { bio, passionate_cause, experience } = userdata
   const [ file, setFile ] = useState(null)

   const handleChangeInput = (e) => {
      const {name, value} = e.target
      setUserData({...userdata, [name] : value })   
   }
   const getAmountDonated = (amount) => {
      const res = amount.reduce( (prev, amt) => {
          return prev + amt.amount
        },0)
     return res
  }
  useEffect( () => {    
   if( user.user.role === "advocate" ) { 
   const getAdvocateCreatedCause = async () => { 
      try {
         const res = await axios.get( `${baseUrl}/causes/cause/advocate`, {  headers: {
           'Authorization': `Bearer ${token} `
         }}  )
         setAdvcause(res.data.cause)
         setGenLoading(false)
      } 
      catch (error) {
        console.log(error)
        setGenLoading(false)
      } 
   } 
   getAdvocateCreatedCause()
 }
 setGenLoading(false)
 },[] )

 const handleUpdateProfile = async (e) => {
  e.preventDefault()
   
    if( !experience && user.user.role === "advocate" ){
       setError1("No field must be left empty!!")
       return
    } 
    if( !passionate_cause && user.user.role === "giver" ){
      setError1("No field must be left empty!!")
      return
    } 
    if( user.user.role === "advocate" ) {
      if(  !file || file.size > 1024 * 1024  ) {          
        setError1('The largest image size is 1mb or there is no image') 
        return
      }
    }
    
    let media;
    if(file) {
       media = await ImageUpload([file], CUP, CN, CA)
     }
    setGenLoading(true)
     try {
        const res = await axios.patch( `${baseUrl}/users/update`, { ...userdata, profile_picture: media ? media[0].url : "" }, {  headers: {
          'Authorization': `Bearer ${token} `
        }}  )
        setUserData(initialState2)
        if(res.data.user.role === "advocate"){
          localStorage.setItem('upics', JSON.stringify(res.data.user.profile_picture))
        }
        setFile(null) 
        setGenLoading(false)
     } 
     catch (error) {
       console.log(error)
       setGenLoading(false)
     } 
}
   

  return (
    <>
      <Head>
        <title> Profile </title>
      </Head>

     { isupdate &&  <Updateprofile isupdate={isupdate} setIsUpdate={setIsUpdate} userdata={userdata} file={file} setFile={setFile} handleChangeInput={handleChangeInput} handleUpdateProfile={handleUpdateProfile} user={user} /> }

       <div className={styles.dbe} > 
           <div className={styles.mainb1} >
              <img className={styles.oneimg} src="/assets/ashwhitebackground.jpg" alt="" />
              <div className={styles.secdiv} >
                { user.user.role === "advocate" && <img className={styles.profileimg} src={user.user.profile_picture} alt="" /> }
                {  user.user.role === "giver" &&  <div className={styles.profileimg2}> {user.user.firstName.charAt(0).toUpperCase()} </div>  }
                 <p className={styles.profilename} > {user.user.firstName} {user.user.lastName} </p>
                 <EditIcon className={styles.editicon} onClick={ () => { setIsUpdate(!isupdate) } } />
              </div>
              <div className={styles.thirddiv} >
                 <p className={styles.thirddivp} > {user.user.bio} </p>
                 { user.user.role === "advocate" && <p className={styles.thirddivp2} > Experience: <span className={styles.thirddivp2span} > {user.user.experience}  </span> </p> }
                 { user.user.role === "giver" && <p className={styles.thirddivp2} > Passionate cause: <span className={styles.thirddivp2span} > {user.user.passionate_cause} </span> </p> }
              </div>
              <div className={styles.fourthdiv} >
                 <p className={styles.fourthdivp} > Email: <span className={styles.fourthdivspan} > {user.user.email} </span> </p>
                 <p className={styles.fourthdivp} > Mobile No: <span className={styles.fourthdivspan} > +{user.user.countryCode} {user.user.mobileNo} </span> </p>
                 { user.user.role === "advocate" && <p className={styles.fourthdivp} > Causes Started: <span className={styles.fourthdivspan} > {user.user.cause_started.length} </span> </p> }
                 { user.user.role === "giver" &&
                 <>
                   <p className={styles.fourthdivp} > Amount Donated: <span className={styles.fourthdivspan} > ${getAmountDonated(user.user.donations_made).toLocaleString()} </span> </p>
                   <p className={styles.fourthdivp} > Following: <span className={styles.fourthdivspan} > {user.user.cause_following.length} </span> </p>   
                 </>   }              
                 <p className={styles.fourthdivp} > Authenticity: <span className={  user.user.authenticity === "excellent" ? styles.fourthdivspanexcell : user.user.authenticity === "good" ? styles.fourthdivspangood : user.user.authenticity === "poor" ? styles.fourthdivspanpoor : styles.fourthdivspan  } > 
                 { user.user.authenticity.charAt(0).toUpperCase()+user.user.authenticity.slice(1)} </span> </p>
              </div>
             { user.user.role === "giver" && <Giverprofile select2={select2} setSelect2={setSelect2} user={user} />  }
             {  user.user.role === "advocate" &&  <Advocateprofile select={select} setSelect={setSelect} advcause={advcause} /> }
           </div>
       </div>
    </>
  )
}


export async function getServerSideProps ({req,res}) {
   let CLOUD_UPDATE_PRESET = process.env.CLOUD_UPDATE_PRESET
   let CLOUD_NAME  = process.env.CLOUD_NAME
   let CLOUD_API = process.env.CLOUD_API
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
         user: userData,
         CUP : CLOUD_UPDATE_PRESET,
         CN :  CLOUD_NAME,
         CA : CLOUD_API
       }
   } 
 }
 
