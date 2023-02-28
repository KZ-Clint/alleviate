import Image from 'next/image'
import styles from '@/styles/Footer.module.css'
import { useState, useEffect, useContext } from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer () {
  return (
    <>
      <footer className={styles.footerbox} >
          <div className={styles.footerdiv1} >
              <TwitterIcon className={styles.icon1} />
              <FacebookIcon className={styles.icon1} />
              <InstagramIcon className={styles.icon1} />
              <LinkedInIcon className={styles.icon1} />
          </div>
          <div className={styles.footerdiv2} >
              <div className={styles.footerdiv2i} >
                 <CopyrightIcon className={styles.icon1} />
                  2022-2023 
              </div>
              <p className={styles.footertext} > About Us </p>
              <p className={styles.footertext} > Mission </p>
              <p className={styles.footertext} > Vision </p>
              <p className={styles.footertext} > Careers </p>
          </div>
          <div className={styles.footerdiv3} >
              <p className={styles.footertext} > Terms and Conditions </p>
              <p className={styles.footertext} > Privacy Policy </p>
              <p className={styles.footertext} > Contact Us </p>
              <p className={styles.footertext} > Our Heroes </p>
          </div>
      </footer>
    </>
  )
}
