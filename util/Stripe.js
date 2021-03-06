import axios from "axios";
// import {API_URL} from '../Config'
const API_URL = process.env.SERVER_DOMAIN;

async function handlePaymentIntent(products=[], total){
    console.log("eCommerce: Inside handlePaymentIntent");

    try {
        const response = await axios.post(`${API_URL}create-payment-intent`,{
            products,
            paymentMethodType: 'card',
            currency: 'usd',
            amount: total,
        },{
            headers:{
                'Content-Type': "application/json",
            }
        })
        console.log("eCommerce: resolving payment intent");
        const {paymentIntent, ephemeralKey, customer} = await response.data;

        return({
            paymentIntent, 
            ephemeralKey,
            customer
        })
        

    } catch (error) {
        console.log(error)
    }
}

export {handlePaymentIntent}