import { useEffect, useRef, useContext } from "react"
import baseUrl from "@/components/Baseurl/baseUrl";
import axios from 'axios'

export default function PaypalBtn ({ amount, cause, user, token, setSuccessMsg, successMsg, ispaypal, setIsPaypal, setCause }) {
  
    const refPaypalBtn = useRef()

    useEffect( () => {
        paypal.Buttons({
            // Sets up the transaction when a payment button is clicked
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: amount // Can also reference a variable or function
                  }
                }]
              });
            },
            // Finalize the transaction after payer approval
            onApprove: (data, actions) => {
              return actions.order.capture().then(function(orderData) {
                console.log(orderData)
                axios.put( `${baseUrl}/causes/donate/cause/${cause._id}/${user.user._id}`,  { amount, cause:cause.cause_title } ,{  headers: {
                  'Authorization': `Bearer ${token} `
                }} )
                 .then( (response) => {
                  console.log(response.data)
                  setCause(response.data.newcause)
                  setSuccessMsg(!successMsg)
                  setIsPaypal(!ispaypal)
                 } )
                 .catch( (error) => {
                    console.log(error)
                 } )
                // Successful capture! For dev/demo purposes:
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                const transaction = orderData.purchase_units[0].payments.captures[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
               
                // When ready to go live, remove the alert and show a success message within this page. For example:
                // const element = document.getElementById('paypal-button-container');
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
              });
            }
          }).render(refPaypalBtn.current);
    },[] )

    return (
        <>
          <div ref={refPaypalBtn} >
              
          </div>
        </>
    )
}