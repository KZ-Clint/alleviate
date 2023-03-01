import Image from 'next/image'
import styles from '@/styles/Donate.module.css'
import { useState, useEffect, useContext } from 'react'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaypalBtn from '../Paypalbtn';



export default function Donate ({ donateclick, setDonateClick, donateselect, setDonateSelect, donatedata, handleChangeInput, iscryptoselect, setIsCryptoSelect, cryptoindex,setCryptoIndex, Coins, successMsg, setSuccessMsg,
     cause, user, token, ispaypal, setIsPaypal, setCause, price, cryptoDonate }) {

   const { amount, address } = donatedata


  return (
    <>
    
        <div className={styles.loaderbox} onClick={ () => { setDonateClick(!donateclick); setSuccessMsg(false) } } >
        </div>
        { !successMsg && donateclick ?
      <div className={styles.genbox} >
            <p className={styles.targetamount} > Target Amount: ${cause.target_amount.toLocaleString()} </p> 
            <div className={styles.nav} >
                <p className={ donateselect === "paywithpaypal" ? styles.navabled : styles.navdisabled } onClick={ () => { setDonateSelect("paywithpaypal") } } > Pay with PayPal </p>
                <p className={ donateselect === "paywithcrypto" ? styles.navabled2: styles.navdisabled} onClick={ () => { setDonateSelect("paywithcrypto") } } > Pay with Crypto </p>
            </div>
    {  donateselect === "paywithpaypal"  && 
            <div className={styles.div1} >
                <div className={styles.formbox} >
                    <input className={styles.inputbox} type="text" id="address" name="address" placeholder="Address..." value={address} onChange={handleChangeInput}  />
                    <input className={styles.inputbox} type="number" id="amount" name="amount" placeholder="Amount..." value={amount} onChange={handleChangeInput}   />
                   { !ispaypal && <button className={styles.butt} disabled={!amount || !address ? true : false } onClick={ () => {  setIsPaypal(!ispaypal);  } } > Donate </button> }
                </div>
                { ispaypal && <PaypalBtn amount={amount} cause={cause} user={user} token={token} setSuccessMsg={setSuccessMsg} successMsg={successMsg} ispaypal={ispaypal} setIsPaypal={setIsPaypal} setCause={setCause} />  }
    
               {  !ispaypal &&  <div className={styles.footer} >
                    <p className={styles.footerp} > Powered By </p>
                    <img className={styles.footerimg} src="/assets/paypallogo.png" alt="" />
                </div> }

            </div>  }
      { donateselect === "paywithcrypto" && 
            <div className={styles.cdiv1} >
                <div className={styles.rowswap} >
                    <div className={styles.rowswap1} onClick={ () => { setIsCryptoSelect(!iscryptoselect) } } > 
                        <img className={styles.rowswapimg} src={  Coins[cryptoindex].cover_picture } alt="" />
                        <p className={styles.rowswapcur} > {  Coins[cryptoindex].coin } </p>
                        { iscryptoselect &&
                            <div className={styles.selectdiv2} >
                            {  Coins.map(  (c, index) => (
                                    <div className={styles.group}  key={c.coin} onClick={ () => { setCryptoIndex(index); setIsCryptoSelect(!iscryptoselect) } } >
                                        <img className={styles.rowswapimg} src={c.cover_picture} alt="" />
                                        <p className={styles.selectcoin}  > {c.coin} </p>
                                    </div>
                                ) ) }
                            </div> }
                    </div>
                        <SwapHorizIcon className={styles.swapicon} />  
                    <div className={styles.rowswap1} >                       
                        <p className={styles.rowswapcur} > $USD </p>
                    </div>
                    
                </div>

                <div className={styles.rowswap2} >  
                    <div className={styles.rowswapresult} >  {amount/price } </div>             
                    <input className={styles.inputboxcrypt} type="number" id="amount" name="amount" placeholder="Amount..." value={amount} onChange={handleChangeInput}   />
                           
                </div>
                
                <div className={styles.selectdiv} onClick={cryptoDonate} >
                    <p className={styles.coinbtext} > Pay with </p>
                    <img className={styles.coinblogo} src="/assets/coinbaselogo.svg" alt="" />
                </div>
            </div> }
      </div> : 
       <div className={styles.genbox} >
           <FavoriteIcon className={styles.favricon} />
           <p className={styles.posttext} > Thank you, you just made the world to a million lives  </p>
       </div>
      }

    </>
  )
}
