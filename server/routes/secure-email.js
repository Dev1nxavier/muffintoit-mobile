const express = require('express');
const router = express.Router();
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());



router.post('/email-login', async (req, res) => {

    const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
        auth: {
            user: 'sg648511@gmail.com',
            pass: 'homestead508283',
        },
        secure: true,
    });

    const mailData = {
        from: 'sg648511@gmail.com',
        to: 'seangreenebrandeis@gmail.com',
        subject: "Please login to your muffinToIt! account",
        text: "Confirm this was received",
        html: <br>First message with Nodemailer!</br>
    };

    transporter.sendMail(mailData, function (error, info) {
        if (err)
            console.error(err)
        else
            console.log(info);
    })
})

