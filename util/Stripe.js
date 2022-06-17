import axios from "axios";
import {API_URL} from '../Config'

async function handlePaymentIntent(products=[]){

    console.log("Attempting to submit payment");

    try {
        const response = await axios.post(`${API_URL}/create-payment-intent`,{
            products,
            paymentMethodType: 'card',
            currency: 'usd',
        },{
            headers:{
                'Content-Type': "application/json",
            }
        })

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