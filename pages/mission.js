import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Mission.module.css'



export default function Mission () {
  return (
    <>
      <Head>
        <title> Mission </title>
      </Head>

       <div className={styles.ifj} > 
           <div className={styles.mainbox} >
               <div className={styles.box1} >
                  <img className={styles.box1img} src="/assets/lesspriv1.jpg" alt="" />
                  <div className={styles.box1div}  >
                     <p className={styles.box1p} > Every child deserves a level playing field </p>
                  </div>   
               </div>

               <div className={styles.box2} >
                   <h2 className={styles.box2h} > Our Mission </h2>
                   <p className={styles.box2p} >  To help ensure that everyone, regardless of age, race, gender, religion e.t.c deserves equal oportunity by bridging the gap in inequality.  </p>

               <div className={styles.box3} >
                   <h3 className={styles.box3h} > How do we aim to achieve that? </h3>
                   <p className={styles.box3p} > Our brand name “Alleviate” stands for  </p>
                   <div className={styles.box3div} >
                       <p className={styles.box3divp} > A - Alleviate </p>
                       <p className={styles.box3divp} > L - Level Up </p>
                       <p className={styles.box3divp} > L - Leadership </p>
                       <p className={styles.box3divp} > E - Enlightment </p>
                       <p className={styles.box3divp} > V - Values </p>
                       <p className={styles.box3divp} > I - Initiative </p>
                       <p className={styles.box3divp} > A - Authenticity </p>
                       <p className={styles.box3divp} > T - Team Work </p>
                       <p className={styles.box3divp} > E - Evaluation </p>
                   </div>
                   <div className={styles.box3div2} >
                        <p className={styles.missmainp} > <span className={styles.missmainspan} > Alleviate: </span>Alleviate is the key symbol of our brand, we aim to, in general, improve the welfare of our society through our philantropic initiative of facilitating the  giving to altruistic causes.  </p>
                        <p className={styles.missmainp} > <span className={styles.missmainspan} > Level Up: </span>We do not only want to facilitate giving but also want to ensure that we take genuine causes to a higher level to ensure that the playing field is being leveled for the beneficiaries of their causes.  </p>
                        <p className={styles.missmainp} > <span className={styles.missmainspan} > Leadership: </span>Leadership is the backbone of any structure, we aim to solidify our leadership position by appointing altruistic, intelligent individuals for leadership roles. </p>
                        <p className={styles.missmainp} > <span className={styles.missmainspan} > Enlightment: </span>Information is key to growth and success same as for philantropic causes. we believe that poor enlightment and awareness is deep rooted in certain systems which makes it dysfunctional. Alleviate aims to eliminate that with its occassional enlightenment programmes. </p>
                        <p className={styles.missmainp} > <span className={styles.missmainspan} > Values: </span>We have certain values we stand by and uphold and we expect the same from our partners and customers, we would consider projects with certain key values. </p>
                        <p className={styles.missmainp} > <span className={styles.missmainspan} > Initiatives: </span>Our deep minds at alleviate would deliberate on initiatives which would aim to be a long term success. </p>
                        <p className={styles.missmainp} > <span className={styles.missmainspan} > Authenticity: </span>Credibility is key to trust and trust is key to relations. Alleviate prioritises authenticity and would conduct continuous and due research to ensure that givers give to the right causes. </p>
                        <p className={styles.missmainp} > <span className={styles.missmainspan} > Teamwork: </span>Synergy is an important factor in every success story and to make our story a successful ome we would prefer the we over the I. </p>
                        <p className={styles.missmainp} > <span className={styles.missmainspan} > Evaluation: </span>Every decision making needs evaluation, we would constantly evaluate the best services to offer our clients to help ensure there satisfaction. </p>
                   </div>
               </div>
               </div>
           </div>
       </div>
    </>
  )
}
