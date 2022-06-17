import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native'
import { handlePaymentIntent } from '../util/Stripe';

export default function CollectPayment(props) {

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [isLoading, setIsLoading] = useState(false);

    // const fetchPaymentSheet = async () => handlePaymentIntent();


    const initializePaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer } = await handlePaymentIntent();

        const { error, paymentOption } = await initPaymentSheet({
            merchantDisplayName:"Muffin To It!",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: false,
            customFlow: true,
        });

        if (!error) {
            setIsLoading(true);
        }
    };

    const options = async()=>{
        const {error, paymentOption} = await presentPaymentSheet({
            confirmPayment: false,
        });
    }

    const openPaymentSheet = async () => {
        //TODO: add code
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    }


    useEffect(() => {
        //initialize payment sheet on page load
        initializePaymentSheet();
    }, [])

    return (
        <View>
            <Text>
                Checkout Screen
            </Text>
            <Button title='Submit Payment' disabled={!isLoading} onPress={() => { openPaymentSheet() }} />
        </View>
    )
}