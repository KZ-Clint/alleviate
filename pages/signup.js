import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Signup.module.css'
import Signupbox from '@/components/Signup/Signupbox'
import { useSignup } from '@/components/Signup/useSignuphook'
import Link from 'next/link'
import { Context } from '@/components/Context'

export default function Signup ({ CUP, CN, CA }) {

  const { setGenLoading } = useContext(Context)
    const [ isCc, setIsCc ] = useState(false)
    const [ countryCode, setCountryCode ] = useState([ { code: "91", country: "India" }, { code: "39", country: "Italy" }, { code: "33", country: "France" }, { code: "234", country: "Nigeria" }, { code: "27", country: "South Africa" }, { code: "380", country: "Ukraine" }, { code: "1", country: "US" } ])
    const [ ind, setInd ] = useState(0)
     const initialState = { firstName: '', lastName: '', email: '', mobileNo: '', bio: '', passionate_cause: '', password: '', cf_password: '', experience:'' }
    const [ userdata, setUserData ] = useState(initialState)
    const [ termsAndConditions, setTermsAndConditions ] = useState(false)
    const [ file, setFile ] = useState(null)
    const [ role, setRole ] = useState("giver")
    const [ success, setSuccess ] = useState(null)

    const { signUp } = useSignup()

    const handleChangeInput = (e) => {
      const {name, value} = e.target
      setUserData({...userdata, [name] : value }) 
    }

    useEffect( () => {    
      setGenLoading(false)
    },[] )

    const handleSubmit = (e) => {
      e.preventDefault()
       signUp( userdata, termsAndConditions, setUserData, initialState, role, file, ind,countryCode, success, setSuccess, CUP, CN, CA )

   }

  return (
    <>
      <Head>
        <title> Sign Up </title>
      </Head>
     
       <div className={styles.ldx} > 
            <div className={styles.box1} > 
                <div className={styles.box1div1} >
                    <Link href={'/'} >
                       <img className={styles.box1div1img} src="/assets/alleviate4.png" alt="" />
                    </Link>
                    <img className={styles.box1div1img2} src="/assets/handsshakeart.png" alt="" />
                </div>
                <Signupbox isCc={isCc} setIsCc={setIsCc} countryCode={countryCode} ind={ind} setInd={setInd} userdata={userdata} termsAndConditions={termsAndConditions} setTermsAndConditions={setTermsAndConditions}
                handleChangeInput={handleChangeInput} role={role} setRole={setRole} file={file} setFile={setFile} handleSubmit={handleSubmit} success={success} />
            </div>
        </div> 
    </>
  )
}

Signup.getLayout = function PageLayout(page) {
    return (
      <>
       {page}
      </>
    )
 }


export function getServerSideProps ({req,res}) {

  let CLOUD_UPDATE_PRESET = process.env.CLOUD_UPDATE_PRESET
  let CLOUD_NAME  = process.env.CLOUD_NAME
  let CLOUD_API = process.env.CLOUD_API


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
      props: { 
        token: tokenReq, 
        CUP : CLOUD_UPDATE_PRESET,
        CN :  CLOUD_NAME,
        CA : CLOUD_API
      }
  }

}