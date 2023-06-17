import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Carousel.module.css'
import baseUrl from '@/components/Baseurl/baseUrl'
import { useState, useEffect, useContext } from 'react'
import { Context } from '@/components/Context'


export default function Carousel () {
    const { setGenLoading } = useContext(Context)
    useEffect( () => {    
       setGenLoading(false)
      },[] )

      const [slideIndex, setSlideIndex] = useState(0);

      function nextSlide() {
        setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
      
      }
    
      function prevSlide() {
        setSlideIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
      }
     console.log(slideIndex)

  return (
    <>
      <Head>
        <title> Carousel </title>
      </Head>

       <div className={styles.slider} >
           <figure className={styles.figure} style={{ transform: `translateX(-${slideIndex * 33.33}%)` }} >
               <img className={styles.img} src="/assets/education1.jpg" alt="" />
               <img className={styles.img} src="/assets/education2.jpg" alt="" />
               <img className={styles.img} src="/assets/education3.jpg" alt="" />
           </figure>
           <div className={styles.butt} >
              <button className={styles.prev} onClick={prevSlide}>Prev</button>
           </div>  
           <div className={styles.butt2} >
              <button className={styles.next} onClick={nextSlide}>Next</button>
           </div>  
       </div>

    </>
  )
}

