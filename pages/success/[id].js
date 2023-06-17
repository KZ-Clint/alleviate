import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Causeid.module.css'
import Link from 'next/link'
import axios from 'axios'
import { Context } from '@/components/Context'
import baseUrl from '@/components/Baseurl/baseUrl';
import { useRouter } from 'next/router';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Success () {

  return (
    <>
        <div className={styles.genbox} >
           <FavoriteIcon className={styles.favricon} />
           <p className={styles.posttext} > Thank you, you just made the world to a million lives  </p>
       </div>
    </>
  )
}

Success.getLayout = function PageLayout(page) {
    return (
      <>
       {page}
      </>
    )
 }



