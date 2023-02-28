import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Vision.module.css'


export default function Vision () {
  return (
    <>
      <Head>
        <title> Vision </title>
      </Head>

       <div className={styles.ifj} > 
           <div className={styles.mainbox} >
               <div className={styles.box1} >
                  <img className={styles.box1img} src="/assets/lesspriv1.jpg" alt="" />
                  <div className={styles.box1div}  >
                     <p className={styles.box1p} > Every child deserves to dream </p>
                  </div>   
               </div>
               <div className={styles.box2} >
                   <h3 className={styles.box2h} > Our Vision </h3>
                   <h1 className={styles.box2h2} > “To inspire a generation to look towards selflessness a a discipline” </h1>
               </div>
            
           </div>
       </div>
    </>
  )
}
