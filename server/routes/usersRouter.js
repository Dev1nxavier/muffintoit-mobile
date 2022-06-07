const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const BASE_URL = process.env.BASE_URL;

router.get('/', async (req, res, next) => {
    await res.end(`Inside users router with url:${BASE_URL}`);
})

router.post('/authenticate', async (req, res) => {

    try {
        const { mode, email, password } = req.body;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.GOOGLE_API}`;

        const googleResponse = await axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true,
        })

        const { localId } = googleResponse.data;

        if(mode ==='signUp'){
        //create user in db with googleAuth id;
        await axios.put(`https://muffintoit-a5c0a-default-rtdb.firebaseio.com/users/${localId}.json`, {
            email: email
        })}

        console.log("Google response:" ,googleResponse.data);
        return res.send(googleResponse.data)

    } catch (error) {
        console.error("Error authenticating user:", error);
    }

})


router.post(`/login`, async (req, res,) => {

    try {
        console.log("Inside /login")

        const response = await axios.post(`${BASE_URL}/customers/${req.body.customerId}/issue-token`, {

        }, {
            headers: {
                "X-Authorization": `${process.env.COMMERCE_SECRET}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })

        console.log("retrieved token:", response.data)
        res.send({ data: response.data });


    } catch (error) {
        console.error("Error logging in user:", error);
    }

})

router.get('/login/order-history/:cusomterId', async (req, res) => {
    try {
        console.log('Inside /login/order-history/customerID')
        const jwt = req.body.jwt;

        const response = await axios.get(`customers/${req.params.customerId}/orders`, {}, {
            headers: {
                "X-Authorization": `${jwt}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
    } catch (error) {
        console.error("Error retrieving customer orders:", error);
    }
})

router.post('/email_login', async (req, res) => {
    console.log("router: email login. email:", req.body.email);

    try {
        const emailLogin = await axios.post(`${BASE_URL}/customers/email-token`, {
            email: req.body.email,
            base_url: req.body.url
        }, {
            headers: {
                "X-Authorization": `${process.env.COMMERCE_SECRET}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        console.log("SUCCESS! from usersRouter /email_login:")
        res.send({ data: emailLogin });

    } catch (error) {
        console.error("Error sending login email:", error)
    }

})

router.post(`/:localId/order-history`, async (req, res) => {
    const localId = req.params.localId;
    const order = req.body.order;

    try {
        const response = await axios.post(`https://muffintoit-a5c0a-default-rtdb.firebaseio.com/users/${localId}/order.json`, {
            order,
        })

        return res.send(response.data);

    } catch (error) {
        console.error("error saving order:", error);
    }
})

router.get(`/order-history/:localId`, async(req, res)=>{

    const localId = req.params.localId;
    console.log("Inside router /order-history with local ID: ", localId);

    const response = await axios.get(`https://muffintoit-a5c0a-default-rtdb.firebaseio.com/users/${localId}/order.json`)

    console.log("retrieved orders:", response.data)
    return res.send(response.data);
})


module.exports = router;