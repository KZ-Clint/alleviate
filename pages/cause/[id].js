import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Causeid.module.css'
import Slider from '@mui/material/Slider';
import Link from 'next/link'
import PersonIcon from '@mui/icons-material/Person';
import Rating  from '@mui/material/Rating';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Hint from '@/components/Causeid/Hint';
import Donate from '@/components/Causeid/Donate';
import { Coins } from '@/components/Causeid/Cryptodata';
import Rate from '@/components/Causeid/Rate';
import Donors from '@/components/Causeid/Donors';
import axios from 'axios'
import { Context } from '@/components/Context'
import baseUrl from '@/components/Baseurl/baseUrl';
import { useRouter } from 'next/router';
import "react-quill/dist/quill.snow.css"

export default function Causeid ({ user, token }) {
  
    const { setGenLoading, setError1 } = useContext(Context)

  const [ hint, setHint ] = useState(false)
  const [ donateclick, setDonateClick ] = useState(false)
  const [ iscryptoselect, setIsCryptoSelect ] = useState(false)
  const [ rateClick, setRateClick ] = useState(false)
  const [ successMsg, setSuccessMsg ] = useState(false)
  const [ isdonors, setIsDonors ] = useState(false)
  const [ cryptoindex, setCryptoIndex ] = useState(0)
  const [ donateselect, setDonateSelect ] = useState("paywithpaypal")
  const initialState = {  amount: '', address: '' }
  const [ donatedata, setDonateData ] = useState(initialState)
  const { amount, address } = donatedata
  const [ value, setValue ] = useState(2)
  const router = useRouter()
  const labels = { 0.5: 'Useless', 1: 'Useless+', 1.5: 'Poor', 2: 'Poor+', 2.5: 'Ok', 3: 'Ok+', 3.5: 'Good',4: 'Good+', 4.5: 'Excellent', 5: 'Excellent+'};
  const [ cause, setCause ] = useState({})
  const [ isfollowing, setIsFollowing ] = useState(false)
  const [ ispaypal, setIsPaypal ] = useState(false)
  const [ price, setPrice ] = useState(0)
  

  const handleChangeInput = (e) => {
    const {name, value} = e.target
    setDonateData({...donatedata, [name] : value })
   
  }
  
  useEffect( () => {
    if (router.isReady) { 
   const getSpecificCause = async() => {
    try {
        const res = await axios.get(`${baseUrl}/causes/specific/${router.query.id}`, {  headers: {
            'Authorization': `Bearer ${token} `
          }} )
        setCause(res.data.cause)
       if(res.data.cause.followers.includes(user.user._id) ){
           setIsFollowing(true)
       }
        setGenLoading(false)
        document.title =  `${res.data.cause.cause_title}`;
    } catch (error) {
        console.log({error})
        setGenLoading(false)
    } }  
   getSpecificCause() 

}  
 },[router.isReady] )

  const hintClick = () => {
    setHint(!hint)
    setTimeout( () => {
        setHint(false)
      },2000 )
  }

  const getDate = (createdAt) => {
    var created = createdAt
    var date = new Date(created)
   return (date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear())
}
const getRating = (rating) => {
    const res = rating.reduce( (prev, rate) => {
        return prev + rate.rating
      },0)
   return res/rating.length 
}
const followCause = async () => {
  try {  
    if(!isfollowing){ 
     
    const res = await axios.put(`${baseUrl}/causes/update/${router.query.id}/${user.user._id}`, null, {  headers: {
        'Authorization': `Bearer ${token} `
      }} )
      setIsFollowing(!isfollowing)
      setCause(res.data.newcauses)
    } else {
      const res = await axios.put(`${baseUrl}/causes/pull/${router.query.id}/${user.user._id}`, null, {  headers: {
        'Authorization': `Bearer ${token} `
      }} )
      setIsFollowing(!isfollowing)
      setCause(res.data.newcauses)
    }
  } catch (error) {
    console.log(error)
  }
  }
  
  const rateCause = async () => {
     try { 
    const res = await axios.put(`${baseUrl}/causes/rate/${cause._id}/${user.user._id}`, { rating: value }, {  headers: {
      'Authorization': `Bearer ${token} `
    }} )
    setCause(res.data.newcauses)
    setRateClick(!rateClick)
   } catch (error) {
    setError1(error.response.data.error)
    console.log(error)
   }
  }

  const cryptoDonate = async () => {
    const data = { firstName:user.user.firstName, lastName: user.user.lastName, user_id:user.user._id, amount:amount, cause_title:cause.cause_title, cause_id:cause._id }
    try { 
   const res = await axios.post(`${baseUrl}/api/coinbase/pay`, data )
   console.log(res.data)
   router.push(res.data.data.hosted_url)
  } catch (error) {
   console.log(error)
  }
 }

 const stripePay = async () => {
  const data = { firstName:user.user.firstName, lastName: user.user.lastName, email:user.user.email, user_id:user.user._id, amount:amount, cause_title:cause.cause_title, cause_id:cause._id }
  try { 
 const res = await axios.post(`${baseUrl}/create-checkout-session`, data )
 console.log(res.data)
 router.push(res.data.url)
 } catch (error) {
 console.log(error)
 }
}

  useEffect( () => {
   const getPrice = async() => {
    try {
        const res = await axios.get(`${baseUrl}/api/coin/${Coins[cryptoindex].coin}`)
       
        setPrice(res.data.rates[Coins[cryptoindex].coin])
    } catch (error) {
        console.log({error})
    } }  
   getPrice() 
 },[amount, cryptoindex] )
  

  return (
    <>
   
     { isdonors &&  <Donors isdonors={isdonors} setIsDonors={setIsDonors} cause={cause} getRating={getRating} />  }

     { rateClick &&  <Rate rateClick={rateClick} setRateClick={setRateClick} value={value} setValue={setValue} labels={labels} rateCause={rateCause} /> }
    
     { donateclick && <Donate donateclick={donateclick} setDonateClick={setDonateClick} donateselect={donateselect} setDonateSelect={setDonateSelect} donatedata={donatedata} handleChangeInput={handleChangeInput}
     iscryptoselect={iscryptoselect} setIsCryptoSelect={setIsCryptoSelect} cryptoindex={cryptoindex} setCryptoIndex={setCryptoIndex} Coins={Coins} successMsg={successMsg} setSuccessMsg={setSuccessMsg} cause={cause}
     user={user} token={token} ispaypal={ispaypal} setIsPaypal={setIsPaypal} setCause={setCause} price={price} cryptoDonate={cryptoDonate} stripePay={stripePay} /> }
     
       { Object.keys(cause).length > 0 &&
       <div className={styles.iov} > 
           <div className={styles.mainb1}  >
             {  cause.cover_photo.length === 1 && <img className={styles.oneimg} src={cause.cover_photo[0].url} alt="" /> }

             { cause.cover_photo.length > 1 &&  
              <div className={styles.slider} >
                <figure className={ cause.cover_photo.length === 2 && cause.cover_photo.length !== 1   ? styles.figure2 : styles.figure  } >
                    { cause.cover_photo.map( (c, index) => (
                    <div className={  cause.cover_photo.length === 2 && cause.cover_photo.length !== 1   ? styles.secimg :  styles.img} key={index} >
                        <img className={styles.img2} src={c.url} alt="" />
                    </div>
                     ) ) }
                </figure>
              </div> }

              <div className={styles.idbox1} >
                  <div className={styles.idbox2} >
                      <h2 className={styles.idbox2h2} > { cause.cause_title } </h2>
                      <div className={styles.sliderbox} >
                        <Slider 
                                size="medium"                      
                                aria-label="Medium"
                                defaultValue={cause.amount_received}
                                min={0}
                                max={cause.target_amount}                        
                            />
                             {/* <Slider className={styles.muislider2}  
                                size="small"                      
                                aria-label="Small"
                                defaultValue={cause.amount_received}
                                min={0}
                                max={cause.target_amount}                        
                            /> */}
                        </div> 
                        <div className={styles.idbox3} >
                            <div className={styles.idbox4} >
                                <p className={styles.idbox4p} > Category: <span className={styles.idbox4span} > {cause.category.charAt(0).toUpperCase()+cause.category.slice(1)} </span> </p>
                                <p className={styles.idbox4p} > Founder: <Link className={styles.idbox4spanb} href={`/profile/${cause.founderString_id}`} > {cause.founderName} </Link> </p>
                                <p className={styles.idbox4p} > Amount Received: <span className={styles.idbox4spanmoney} > ${cause.amount_received.toLocaleString()} </span> </p>
                                <p className={styles.idbox4p} > Target Amount: <span className={styles.idbox4spanmoney} > ${cause.target_amount.toLocaleString()} </span> </p>
                                <div className={styles.helpdiv} >
                                   <p className={styles.idbox4p} > Authenticity: <span className={  cause.authenticity === "excellent" ? styles.idbox4spanexcell : cause.authenticity === "good" ? styles.idbox4spangood : cause.authenticity === "poor" ? styles.idbox4spanpoor : styles.idbox4spanaverage } > 
                                   { cause.authenticity.charAt(0).toUpperCase()+cause.authenticity.slice(1)} </span>  </p>
                                  { cause.authenticity === "poor" && <HelpOutlineIcon className={styles.quest} onClick={hintClick} /> }
                                  { hint && <Hint/> }
                                </div>
                                <p className={styles.idbox4pd} > Date Started: <span className={styles.idbox4pdspan} > {getDate(cause.createdAt)} </span>  </p>
                                <p className={styles.idbox4pd} > Deadline: <span className={styles.idbox4pdspan} >  {getDate(cause.deadline)} </span>  </p>
                                <p className={styles.idbox4link} onClick={ () => { setIsDonors(!isdonors) } } >
                                    See Donors
                                </p>
                            </div>
                            <div className={styles.idbox5} >
                                <button className={ user.user.role === "advocate" ? styles.idbox5buttdisabled : styles.idbox5butt} onClick={ () => { setDonateClick(!donateclick) } } disabled={ user.user.role === "advocate" ? true : false } > Donate </button>
                                <button className={ user.user.role === "advocate" ? styles.idbox5buttdisabled : styles.idbox5butt} onClick={followCause} disabled={ user.user.role === "advocate" ? true : false }  > { isfollowing ? "Unfollow" : "Follow" } </button>
                                <div className={styles.idbox5iconwrapper} > {cause.followers.length} <PersonIcon className={styles.idbox5icon} /> </div>
                                <div className={styles.idbox5ratingwrapper} >
                                    <Rating className={styles.idbox5rating}  name="half-rating-read" defaultValue={getRating(cause.rating)} precision={0.5} readOnly />
                                    <p className={styles.idbox5ratingnumb} > {cause.rating.length} { cause.rating.length > 1 ? "People" : "Person" } </p>
                                </div>                       
                                {  user.user.role !== "advocate" && <p className={styles.idbox5ratenow} onClick={ () => { setRateClick(!rateClick) } } > Rate Now </p> }
                            </div>
                        </div>

                        <div className={styles.idbox6} >
                            {/* <p className={styles.idbox6p} > {cause.story} </p> */}
                            <div dangerouslySetInnerHTML={{ __html: cause.story }} className="ql-editor" />
                            {/* <div className={styles.idboxdiv1} >
                                <h2 className={styles.idbox6div1h2} > Solution </h2>
                                <p className={styles.idbox6p}> {cause.solution} </p>
                            </div>
                            <div className={styles.idbox6div2} >
                                <h2 className={styles.idbox6div2h2} > Links to website, Social media or Blog </h2>
                                { cause.links.map( (link, index) => (   
                                    <Link className={styles.idbox6div2link} href={link} key={index} >
                                      { index === 0 ? "Link to website" : "Link to socials " }
                                    </Link>
                                  ) ) }
                            </div> */}
                        </div>
                        <div className={styles.idbox7} >
                            <button className={  user.user.role === "advocate" ? styles.idbox7buttdisabled :  styles.idbox7butt} onClick={ () => { setDonateClick(!donateclick) } } disabled={ user.user.role === "advocate" ? true : false } > Donate </button>
                           {  user.user.role === "advocate" && <button className={styles.idbox7buttwith} > Request Withdrawal </button> }
                        </div>

                  </div>
              </div>

           </div>
       </div> }
    </>
  )
}

Causeid.getLayout = function PageLayout(page) {
    return (
      <>
       {page}
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
  
  
