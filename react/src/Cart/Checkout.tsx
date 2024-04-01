import { loadScript } from "@paypal/paypal-js";
import { postWithAuth } from "../helpers/http";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

export default () => {
  const nav = useNavigate();

  loadScript({ "clientId": "AURWX4TkJxcXn5Qb89wBMg4xrxasNJ0NsEWcZ046C5kdFxyznu4SnVZrggRrkxVVNkR4mpLvXWKlgpWx" })
    .then(async (paypal: any) => {
      if (!paypal) return;

      let total = 0;

      (await postWithAuth('/cart/get/by/user', {})).works.forEach((work: any) => {
        total += work.artwork.price;
      })

      const uuid = uuidv4();

      paypal.Buttons({
        // Set up the transaction
        createOrder: async function (_: any, actions: any) {
          await postWithAuth('/order/place', {
            transactionId: uuid
          })

          return actions.order.create({
            purchase_units: [{
              amount: {
                value: parseInt(`${(total / 18)}`)
              }
            }]
          });
        },
        

        // Finalize the transaction
        onApprove: function (_: any, actions: any) {
          return actions?.order?.capture().then(async function (_: any) {

            // Successful capture! For demo purposes:
            // var transaction = orderData.purchase_units[0].payments.captures[0];
            // alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

            // Replace the above to show a success message within this page, e.g.
            // const element = document.getElementById('paypal-button-container');
            // element.innerHTML = '';
            // element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  actions.redirect('thank_you.html');

            await postWithAuth('/order/finish', {
              transactionId: uuid
            })

            await postWithAuth('/user/credit/acc', {
              credit: parseInt(`${(total / 18)}`)
            })

            nav('/checkout/success')
          });
        }


      }).render('#paypal-button-container');
    })
    .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
    });

  return (
    <div className="btn-container" style={{ width: '40rem', margin: '15rem auto 0' }}>
      <h1>Cart checkout</h1>
      <p style={{ marginBottom: '2rem' }}>Buy artwork in your cart.</p>
      <div id="paypal-button-container"></div>
    </div>
  )
}