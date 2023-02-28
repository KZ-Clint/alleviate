import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Startacause.module.css'
import Link from 'next/link'
import axios from 'axios'
import baseUrl from '@/components/Baseurl/baseUrl';
import Causesstarted2 from '@/components/Startacause/Causesstarted'
import { Context } from '@/components/Context'
import Startacause2 from '@/components/Startacause/Startacause2'
import { Category } from '@/components/Home/Categorydata'
import { ImageUpload } from '@/components/Imageupload/imageUpload'


export default function Startacause ({user, token, CUP, CN, CA }) {

   const { error1, setError1, setGenLoading } = useContext(Context)

   const [ iscategory, setIsCategory ] = useState(false)
   const [ catindex, setCatIndex ] = useState(null)
   const [ isSelect, setIsSelect ] = useState("startacause")
   const [ file, setFile ] = useState([])
   const initialState = { cause_title: '', target_amount: '', story: '', solution: '', acc_number: '', bank: '', social_link:'', web_link:'' }
   const [ causedata, setCauseData ] = useState(initialState)
   const { cause_title, target_amount, story, solution, acc_number, bank, social_link, web_link } = causedata
   const [ deadline, setDeadline ] = useState("")
   const [ advcauses, setAdvCauses ] = useState([])

   const handleUploadInput = (e) => {
      let newImages = []
      let num = 0;
      const files = [...e.target.files]
      if(files.length === 0 ) {
         setError1("Image is empty")
          return
      }
      files.forEach( (file) => {
          if( file.size > 1024 * 1024 ) {          
             setError1('The largest image size is 1mb') 
                 return
          }
          num += 1;
              if(num <= 3) {
                  newImages.push(file)
                  return newImages
              }
      } )
      const imgCount = file.length
      
      if( imgCount + newImages.length > 3 ) {
          setError1('Select up to 3 images')
            return
      }
      setFile([...file, ...newImages])
  }
  const deleteImage = (index) => { 
   const newArr = [...file]
   newArr.splice(index, 1)
   setFile(newArr)
}

const handleChangeInput = (e) => {
   const {name, value} = e.target
   setCauseData({...causedata, [name] : value }) 
}

useEffect( () => {    
   const getAdvocateCreatedCause = async () => { 
      try {
         const res = await axios.get( `${baseUrl}/causes/cause/advocate`, {  headers: {
           'Authorization': `Bearer ${token} `
         }}  )
         setAdvCauses(res.data.cause)
         setGenLoading(false)
         setDeadline("")
         setFile([])
      } 
      catch (error) {
        console.log(error)
        setGenLoading(false)
      } 
   } 
   getAdvocateCreatedCause()
 },[] )

 const handleCreateCause = async (e) => {
   e.preventDefault()
     if( !cause_title || !target_amount ||!story || !solution || !acc_number || !bank || !social_link || !web_link || !catindex || file.length <1 || !deadline ){
        setError1("No field must be left empty!!")
        return
     } 
     if( story.length < 300 || solution.length < 300 ) {
        setError1("Your approach must be detailed!!")
        return
     }
     const d1 = new Date(deadline)
     const d2 = new Date()
     if( d1.getTime() < d2.getTime() ) {
      setError1("Cmon you are smarter than this!!")
      return
     }
     let media;
     if(file) {
        media = await ImageUpload(file, CUP, CN, CA)
      }
     setGenLoading(true)
      try {
         const res = await axios.post( `${baseUrl}/causes/create`, { ...causedata, deadline, cover_photo: media ? media : "", category:Category[catindex].category }, {  headers: {
           'Authorization': `Bearer ${token} `
         }}  )
         setAdvCauses([...advcauses, res.data.cause])
         setCauseData(initialState)
         setFile('') 
         setGenLoading(false)
      } 
      catch (error) {
        console.log(error)
        setError1(error.response.data.error)
        setGenLoading(false)
      } 
 }


  return (
    <>
      <Head>
        <title> Start a cause  </title>
      </Head>
       <div className={styles.jdi} >
          <div className={styles.gendiv1} >
              <div className={styles.topdiv} >
                 <img className={styles.oneimg} src="/assets/makeachange.jpg" alt="" />
                 <div className={styles.headingbox} >
                    <h2 className={styles.htext} > Start a cause </h2>
                 </div>         
              </div>
              <div className={styles.selectbox} >
                 <p className={ isSelect === "startacause" ? styles.selectboxabled : styles.selectboxdisabled  } onClick={ () => { setIsSelect("startacause") } } > Start a cause </p>
                 <p className={ isSelect === "causesstarted" ? styles.selectboxabled2 : styles.selectboxdisabled} onClick={ () => { setIsSelect("causesstarted") } } > Causes started </p>
              </div>

             { isSelect === "causesstarted" && <Causesstarted2 advcauses={advcauses} /> }
             { isSelect === "startacause" &&  <Startacause2 handleUploadInput={handleUploadInput} file={file} deleteImage={deleteImage} Category={Category} iscategory={iscategory} setIsCategory={setIsCategory} catindex={catindex} setCatIndex={setCatIndex}
              deadline={deadline} setDeadline={setDeadline} causedata={causedata} handleChangeInput={handleChangeInput} handleCreateCause={handleCreateCause} /> }
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
  
   if ( Object.keys(userData).length > 0 &&  userData.user.role === 'giver' ) {
  return {
    redirect:{
      permanent:false,
      destination:"charities_following"
    }}
 }
 
   return {
       props: {
         token: tokenReq ,
         user: userData,
         CUP : CLOUD_UPDATE_PRESET,
         CN :  CLOUD_NAME,
         CA : CLOUD_API
       }
   } }

