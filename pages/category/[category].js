import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from '@/styles/Categoryid.module.css'
import Causecategory from '@/components/Categoryid/Causecategory';
import axios from 'axios'
import baseUrl from '@/components/Baseurl/baseUrl';
import { useRouter } from 'next/router';
import { Context } from '@/components/Context';
import { filterSearch } from '@/components/filterSearch';
import { Category } from '@/components/Home/Categorydata';

export default function Categoryid ({ cause, token, categ }) {
   
   const {setGenLoading} = useContext(Context)
   const [ search, setSearch ] = useState("")
   const [ page, setPage ] = useState(1)
   const [ causes, setCauses ] = useState(cause)
   const router = useRouter()

   useEffect( () => { 
      setCauses(cause)

   },[cause] )

   useEffect( () => {   
      filterSearch({router, page:1, search:"all" })
      setGenLoading(false)
    },[] )

    useEffect( () => {  
      if( !search )  {
         filterSearch({router, page:page, search:"all" })
      }
    },[search] )
    
    useEffect( () => {
      document.title =  `Category/${categ}`;
      if(Object.keys(router.query).length < 1 ){
        setPage(1)
        setSearch("")
      }
    },[router.query] )

    const handleLoadMore = () => {
      setPage(page + 1)
      filterSearch({router, page: page + 1, search })
    }
    const categoryImg = Category.filter( (c) => {
      return c.category == categ
    } )


  return (
    <>

       <div className={styles.jdi} >
          <div className={styles.gendiv1} >
              <div className={styles.topdiv} >
                 <img className={styles.oneimg} src={categoryImg[0].cover_picture} alt="" />
                 <div className={styles.headingbox} >
                    <ArrowBackIosNewIcon className={styles.arrowicon} onClick={ () => { router.push('/home') } } /> 
                    <h2 className={styles.htext} > { Object.keys(router.query).length > 0 && router.query.category.charAt(0).toUpperCase()+router.query.category.slice(1)  }  </h2>
                 </div>
                 <div className={styles.inputdiv} >
                    <input className={styles.searchinput} type="text" id="search" name="search" placeholder="Search..." value={search} onChange={ (e) => { setSearch(e.target.value); filterSearch({router, page, search:e.target.value }) } } />
                 </div>              
              </div>
              <Causecategory causes={causes} handleLoadMore={handleLoadMore} />
              <button className={styles.loadbutt} onClick={handleLoadMore} > Load More </button>
          </div>
       </div>
    </>
  )
}

// Categoryid.getLayout = function PageLayout(page) {
//     return (
//       <>
//        {page}
//       </>
//     )
//  }


export async function getServerSideProps ({req,res, query}) {
  let tokenReq= {}
  let resp=[]
  const page = query.page || 1
  const search = query.search || 'all' 

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
 
     resp = await axios.get(`${baseUrl}/causes/category/${query.category}?limit=${page * 8}&title=${search}`, {  headers: {
      'Authorization': `Bearer ${tokenReq} `
    }} )
  


  return {
      props: {
        token: tokenReq ,
        cause: resp.data.cause,
        categ: query.category
      }
  }

}

