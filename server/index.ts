
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 3000;
const stripePublishableKey = process.env.STRIPE_PUBLIC_KEY || '';
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const usersRouter = require('./routes/usersRouter');

// parse application/json
app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.send("You rang?")
})

app.get('/config', (req, res)=>{
    const message={stripePublishableKey: stripePublishableKey }
    res.send(JSON.stringify(message));
})

app.post('/create-payment-intent',async (req, res)=>{

    console.log("/create-payment-intent: total:", req.body.amount);
    try {
        //check for payment method and currency
        if(req.body.paymentMethodType && req.body.currency){
            const {currency, amount} = req.body;
            const customer = await stripe.customers.create();

            const ephemeralKey = await stripe.ephemeralKeys.create(
                {customer: customer.id},
                {apiVersion: '2020-08-27'}
            );
            

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: currency,
                customer: customer.id,
                automatic_payment_methods: {
                    enabled: true,
                  },
            })
            
            return res.send({
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customer.id,
            })

        }else{
            console.error("Error: no payment method or currency set");
        }
    } catch (error) {
        console.error("error retrieving secret key:", error);
    }
})

app.use('/users', usersRouter);

app.listen(PORT, ()=>console.log("Im listening on port:", PORT));

module.exports={router};
