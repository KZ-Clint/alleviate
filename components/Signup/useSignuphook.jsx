import {useState, useContext} from 'react'
import axios from 'axios'
import { Context } from '@/components/Context'
import { ImageUpload } from '@/components/Imageupload/imageUpload'
import baseUrl from '@/components/Baseurl/baseUrl'
import {useRouter} from 'next/router'


export const useSignup = () => {

    const { error1, setError1, genloading, setGenLoading } = useContext(Context)

    const router = useRouter()
    const signUp = async (userdata, termsAndConditions, setUserData, initialState, role, file, ind, countryCode, success, setSuccess, CUP, CN,CA ) => {
       
        let errorObj =  validate(userdata, termsAndConditions, countryCode, ind, role, setSuccess, file)

        let media;
        if(file) {
           media = await ImageUpload([file], CUP, CN, CA)
         }
      
        const newData = { ...userdata, profile_picture: media || file ? media[0].url : "", termsAndConditions, role, countryCode:countryCode[ind].code,
        }
        
        if ( Object.keys(errorObj).length === 0  && termsAndConditions !== false  ){
            // console.log( "success", userdata, termsAndConditions, newData) 
            setGenLoading(true)    
          try {
             const res = await axios.post( `${baseUrl}/users/signup`, newData )
             setSuccess("You have signed up succesfully")
             setGenLoading(false)    
             setUserData(initialState)
             router.push("/login")
          } 
          catch (error) {
            console.log(error)
            setGenLoading(false)    
            setError1("Something went wrong") 
          }
      } else {
       
      }
    }

    const validate = (values, termsAndConditions, countryCode, ind, role, setSuccess, file) => {
        let error = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const rege = /[^a-z]/i;
    
        if(!values.firstName) {
            error.firstName = " Name is required!"
            setError1(" Name is required!")
             return error
        }else if (values.firstName.length > 15 ) {
            error.firstName = "Name must not be more than 15 letters!"
            setError1("Name must not be more than 15 letters")
            return error
        }else if (values.firstName.length < 2 ) {
            error.firstName = "Name must not be less than 2 letters"
            setError1("Name must not be less than 2 letters")
            return error
        }
        else if ( values.firstName.match(rege) ) {
            error.firstName = "Invalid name"
            setError1("Invalid name")
            return error
        }
        if(!values.lastName) {
            error.lastName = "Name is required!"
            setError1("Name is required!")
            return error
        }else if (values.lastName.length > 15 ) {
            error.lastName = " Name must not be more than 15 letters"
            setError1(" Name must not be more than 15 letters")
            return error
        }else if (values.lastName.length < 2 ) {
             error.lastName = "Name must not be less than 2 letters"
             setError1(" Name must not be less than 2 letters")
             return error
        }
        else if ( values.lastName.match(rege) ) {
             error.lastName = "Invalid name"
             setError1("Invalid name")
             return error
        }
        if(!values.mobileNo) {
            error.mobileNo = "Mobile no is required!"
            setError1(" Mobile no is required!")
            return error
        }else if ( ind ? countryCode[ind].code === "91" : countryCode[0].code === "91" && values.mobileNo.length !== 10 ) {
            error.mobileNo = "Incorrect number!"
            setError1("Incorrect number!!")
            return error
        }
        else if (  countryCode[ind].code === "234"  && values.mobileNo.length !== 10 ) {
            error.mobileNo = `${countryCode[ind].code} `
            setError1("Incorrect number!!")
            return error
        }
        if(!values.bio) {
            error.mobileNo = "Error!"
            setError1("Bio is required")
            return error
        }
        if(!file && role === "advocate" ) {
            error.file = "No image!"
            setError1("Profile picture is required")
            return error
        } else if ( file && file.size > 1024 * 1024 && role === "advocate" ) {
            error.file = "File size to large!"
            setError1(" file size to large")
            return error
        }
        if(!values.passionate_cause && role === "giver" ) {
            error.mobileNo = "Error!"
            setError1("Passionate cause required!")
            return error
        }
        if(!values.experience && role === "advocate" ) {
            error.experience = "Error!"
            setError1("Experience is required!")
            return error
        }
        if(!values.email ) {
            error.mobileNo = "Error!"
            setError1("Email is required!")
            return error
        } else if (!regex.test(values.email)) {
            error.mobileNo = "Error!"
            setError1(" This is not  a valid email!")
            return error
        } else if (!values.email.includes('com') || !values.email.includes('gmail')  ) {
            error.mobileNo = "Error!"
           setError1("Not a valid email!")
           return error
        }
        if(!values.password) {
            error.mobileNo = "Error!"
            setError1("Password is required!")
            return error
        } else if ( values.password.length < 9 ) {
            error.mobileNo = "Error!"
            setError1(" Password must be more than 8 letters!")
            return error
        }
        else if(values.cf_password !== values.password ) {
            error.mobileNo = "Error!"
            setError1("Password does not match!") 
            return error
         }
         if(!termsAndConditions) {
            error.mobileNo = "Error!"
            setError1("To use the app you must accept terms and conditions!!")
            return error
         }
          return error
      }

      return { signUp }
}